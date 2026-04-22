# Cobo Agentic Wallet TypeScript SDK

TypeScript/Node.js SDK for Cobo Agentic Wallet.

This SDK is for developers building AI agents, bots, and automations that:

- move funds
- make payments
- sign messages
- interact with smart contracts
- need scoped authorization instead of raw wallet custody

Instead of giving an agent a private key, Cobo Agentic Wallet gives it a controlled runtime surface:

- pair once with the wallet owner
- submit a pact to define what the agent is allowed to do
- operate within owner-approved boundaries
- receive structured denial feedback when a request is blocked
- keep signing and key management outside the agent runtime

[![npm version](https://img.shields.io/npm/v/@cobo/agentic-wallet)](https://www.npmjs.com/package/@cobo/agentic-wallet)
[![License](https://img.shields.io/github/license/CoboGlobal/cobo-agentic-wallet-typescript-sdk)](https://github.com/CoboGlobal/cobo-agentic-wallet-typescript-sdk/blob/master/LICENSE)

## Related repositories

- [CAW Python SDK](https://github.com/CoboGlobal/cobo-agentic-wallet-python-sdk)
- [CAW CLI](https://github.com/CoboGlobal/cobo-agentic-wallet-cli)

## What this repo includes

- **TypeScript SDK** — typed axios-based HTTP client for wallet, pact, transaction, balance, and audit operations
- Auto-generated from the OpenAPI spec with full TypeScript types for all request/response models

## Get Started

Before using this SDK, follow the [Get Started guide](https://github.com/CoboGlobal/cobo-agentic-wallet#get-started) in the main repo to install the `caw` CLI, onboard, and get your credentials.

### 1. Install the SDK

```bash
npm install @cobo/agentic-wallet
```

### 2. Submit a pact and run a transfer

```typescript
import { Configuration, PactsApi, TransactionsApi } from '@cobo/agentic-wallet';

const CHAIN_ID = 'SETH';
const TOKEN_ID = 'SETH';
const DESTINATION = '0x1111111111111111111111111111111111111111';
const ALLOWED_AMOUNT = '0.001';
const DENY_THRESHOLD = '0.002';

async function main() {
    const apiUrl = process.env.AGENT_WALLET_API_URL!;
    const apiKey = process.env.AGENT_WALLET_API_KEY!;
    const walletId = process.env.AGENT_WALLET_WALLET_ID!;

    const config = new Configuration({ basePath: apiUrl, apiKey });
    const pactsApi = new PactsApi(config);

    // Submit a pact requesting transfer permissions
    const pactResp = await pactsApi.submitPact({
        wallet_id: walletId,
        intent: 'Transfer tokens for testing',
        spec: {
            policies: [
                {
                    name: 'max-tx-limit',
                    type: 'transfer',
                    rules: {
                        effect: 'allow',
                        when: { chain_in: [CHAIN_ID] },
                        deny_if: { amount_gt: DENY_THRESHOLD },
                    },
                },
            ],
            completion_conditions: [{ type: 'time_elapsed', threshold: '86400' }],
        },
    } as any);
    const pactId = pactResp.data.pact_id;
    console.log(`Pact submitted: ${pactId}`);

    // Poll until the owner approves the pact
    while (true) {
        const pact = (await pactsApi.getPact(pactId)).data;
        if (pact.status === 'active') break;
        if (['rejected', 'expired', 'revoked', 'completed'].includes(pact.status as string)) {
            throw new Error(`Pact ended: ${pact.status}`);
        }
        await new Promise(r => setTimeout(r, 5000));
    }

    const pact = (await pactsApi.getPact(pactId)).data;

    // Execute a transfer using the pact-scoped API key
    const pactConfig = new Configuration({ basePath: apiUrl, apiKey: pact.api_key as string });
    const pactTxApi = new TransactionsApi(pactConfig);

    const tx = await pactTxApi.transferTokens({
        wallet_id: walletId,
        chain_id: CHAIN_ID,
        dst_addr: DESTINATION,
        token_id: TOKEN_ID,
        amount: ALLOWED_AMOUNT,
    } as any);
    console.log(`Transfer submitted: ${tx.data.id}`);
}

main().catch(console.error);
```

## Contributing

1. Fork the repository and create a branch from `master`.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Make your changes and run the tests:
   ```bash
   npm test
   ```
4. Open a pull request against `master` with a clear description of your change.

## License

Apache-2.0. See [LICENSE](LICENSE).