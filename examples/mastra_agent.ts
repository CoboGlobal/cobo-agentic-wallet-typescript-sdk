import { openai } from '@ai-sdk/openai';
import { Agent } from '@mastra/core/agent';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import {
  Configuration,
  PactsApi,
  TransactionRecordsApi,
  TransactionsApi,
} from '@cobo/agentic-wallet';

const CHAIN_ID = 'SETH';
const TOKEN_ID = 'SETH';

const basePath = process.env.AGENT_WALLET_API_URL!;
const ownerKey = process.env.AGENT_WALLET_API_KEY!;
const ownerConfig = new Configuration({ apiKey: ownerKey, basePath });

const pactsApi = new PactsApi(ownerConfig);
const txApi = new TransactionsApi(ownerConfig);
const recordsApi = new TransactionRecordsApi(ownerConfig);

// pact_id -> pact-scoped api_key, populated by submit_pact / get_pact tool calls
const pactSessions = new Map<string, string>();
const pactTxApiCache = new Map<string, TransactionsApi>();

function capturePactSession(response: unknown): void {
  if (!response || typeof response !== 'object') return;
  const r = response as Record<string, unknown>;
  const pactId = (r.pact_id ?? r.id) as string | undefined;
  const apiKey = r.api_key as string | undefined;
  if (typeof pactId === 'string' && typeof apiKey === 'string' && apiKey) {
    pactSessions.set(pactId, apiKey);
  }
}

function txApiFor(pactId?: string): TransactionsApi {
  if (!pactId) return txApi;
  const cached = pactTxApiCache.get(pactId);
  if (cached) return cached;
  const apiKey = pactSessions.get(pactId);
  if (!apiKey) {
    throw new Error(
      `Unknown pact_id ${pactId}. Call submit_pact or get_pact first so the pact-scoped api_key can be cached, then retry.`,
    );
  }
  const scoped = new TransactionsApi(new Configuration({ apiKey, basePath }));
  pactTxApiCache.set(pactId, scoped);
  return scoped;
}

async function returnPolicyDenial<T>(work: () => Promise<T>): Promise<T | Record<string, unknown>> {
  try {
    return await work();
  } catch (error) {
    return (error as { response?: { data?: { error?: Record<string, unknown> } } }).response?.data
      ?.error ?? { error: 'UNKNOWN_ERROR' };
  }
}

const submitPactTool = createTool({
  id: 'submit-pact',
  description: 'Submit a pact and return the pact id.',
  inputSchema: z.object({
    wallet_id: z.string(),
    intent: z.string(),
  }),
  execute: async (inputData) => {
    const response = await pactsApi.submitPact({
      wallet_id: inputData.wallet_id,
      intent: inputData.intent,
      spec: {
        policies: [
          {
            name: 'max-tx-limit',
            type: 'transfer',
            rules: {
              effect: 'allow',
              when: {
                chain_in: [CHAIN_ID],
                token_in: [{ chain_id: CHAIN_ID, token_id: TOKEN_ID }],
              },
              deny_if: { amount_gt: '0.002' },
            },
          },
        ],
        completion_conditions: [{ type: 'time_elapsed', threshold: '86400' }],
      },
    });
    const result = response.data.result;
    capturePactSession(result);
    if (result && typeof result === 'object') {
      const r = result as unknown as Record<string, unknown>;
      const id = (r.pact_id ?? r.id) as string | undefined;
      if (r.status === 'active' && typeof id === 'string' && !pactSessions.has(id)) {
        try {
          const full = (await pactsApi.getPact(id)).data.result;
          capturePactSession(full);
        } catch {
          // Best-effort capture; agent can call get_pact explicitly to retry.
        }
      }
    }
    return result;
  },
});

const transferTool = createTool({
  id: 'transfer-tokens',
  description: 'Execute a policy-enforced transfer.',
  inputSchema: z.object({
    wallet_uuid: z.string(),
    dst_addr: z.string(),
    token_id: z.string(),
    amount: z.string(),
    request_id: z.string(),
    pact_id: z
      .string()
      .optional()
      .describe(
        'Pact id from submit_pact. REQUIRED to invoke under pact-scoped policy permissions.',
      ),
  }),
  execute: async (inputData) => {
    return await returnPolicyDenial(async () => {
      const api = txApiFor(inputData.pact_id);
      const response = await api.transferTokens(inputData.wallet_uuid, {
        chain_id: CHAIN_ID,
        dst_addr: inputData.dst_addr,
        token_id: inputData.token_id,
        amount: inputData.amount,
        request_id: inputData.request_id,
      });
      return response.data.result;
    });
  },
});

const recordTool = createTool({
  id: 'get-transaction-record-by-request-id',
  description: 'Look up a transaction record by request id.',
  inputSchema: z.object({
    wallet_uuid: z.string(),
    request_id: z.string(),
  }),
  execute: async (inputData) => {
    const response = await recordsApi.getUserTransactionByRequestId(
      inputData.wallet_uuid,
      inputData.request_id,
    );
    return response.data.result;
  },
});

const agent = new Agent({
  id: 'cobo-operator',
  name: 'cobo-operator',
  model: openai('gpt-4.1-mini'),
  instructions:
    'Submit a pact before execution, wait until it is active, execute compliant blockchain actions, and retry only inside policy guidance.',
  tools: { submitPactTool, transferTool, recordTool },
});

console.log(agent);
