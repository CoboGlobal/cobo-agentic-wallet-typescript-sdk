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

### 1. Install the `caw` CLI

```bash
curl -fsSL https://raw.githubusercontent.com/CoboGlobal/cobo-agentic-wallet/master/install.sh | bash
```

Then add `caw` to your PATH:

```bash
export PATH="$HOME/.cobo-agentic-wallet/bin:$PATH"
```

Verify the installation:

```bash
caw --version
```

### 2. Onboard and pair with the wallet owner

Run the interactive onboarding wizard. You will need an invitation code from the wallet owner.

```bash
caw onboard --wait --invitation-code <invitation-code>
```

The wizard runs through several phases until wallet `status` becomes `active`.

Once the wallet is active, generate a pairing token for the wallet owner:

```bash
caw wallet pair --code-only
```

The wallet owner enters the token in the Cobo Agentic Wallet app to complete ownership pairing.

### 3. Claim testnet tokens from the faucet

```bash
# List addresses for the wallet
caw address list

# Request native Sepolia ETH
caw faucet deposit --token-id SETH --address <your-seth-address>
```

Check the balance with `caw wallet balance`.

### 4. Get credentials

```bash
caw wallet current --show-api-key
```

Set the output values as environment variables:

```bash
export AGENT_WALLET_API_URL=https://api.agenticwallet.cobo.com
export AGENT_WALLET_API_KEY=your-agent-api-key
export AGENT_WALLET_WALLET_ID=your-wallet-uuid
```

### 5. Install the SDK

```bash
npm install @cobo/agentic-wallet
```

### 6. Submit a pact and run a transfer

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

## API Endpoints

All URIs are relative to the `basePath` set in `Configuration`.

| Class | Method | HTTP request | Description |
|---|---|---|---|
| `AuditApi` | `listAuditLogs` | GET /api/v1/audit-logs | List audit logs |
| `BalanceApi` | `listBalances` | GET /api/v1/wallets/balances | List token balances |
| `CoinPriceApi` | `getAssetCoinPrices` | GET /api/v1/coin-price | Get coin prices |
| `FaucetApi` | `deposit` | POST /api/v1/faucet/deposit | Request faucet deposit |
| `FaucetApi` | `listTokens` | GET /api/v1/faucet/tokens | List faucet tokens |
| `HealthApi` | `healthCheck` | GET /health | Health check |
| `IdentityApi` | `createApiKey` | POST /api/v1/api-keys | Create API key |
| `IdentityApi` | `createPrincipal` | POST /api/v1/principals | Create principal |
| `IdentityApi` | `provisionAgent` | POST /api/v1/principals/provision | Provision agent |
| `IdentityApi` | `updatePrincipal` | PATCH /api/v1/principals/{principal_id} | Update principal |
| `MetadataApi` | `listChains` | GET /api/v1/metadata/chains | List supported chains |
| `MetadataApi` | `listAssets` | GET /api/v1/metadata/assets | List supported assets |
| `MetadataApi` | `searchTokens` | GET /api/v1/metadata/tokens/search | Search tokens by symbol |
| `PactsApi` | `submitPact` | POST /api/v1/pacts/submit | Submit pact for approval |
| `PactsApi` | `getPact` | GET /api/v1/pacts/{pact_id} | Get pact detail |
| `PactsApi` | `listPacts` | GET /api/v1/pacts | List pacts |
| `PactsApi` | `revokePact` | POST /api/v1/pacts/{pact_id}/revoke | Revoke an active pact |
| `PactsApi` | `updatePolicies` | PATCH /api/v1/pacts/{pact_id}/policies | Update pact policies |
| `PactsApi` | `updateCompletionConditions` | PATCH /api/v1/pacts/{pact_id}/completion-conditions | Update completion conditions |
| `PactsApi` | `listPactEvents` | GET /api/v1/pacts/{pact_id}/events | Get pact event history |
| `PactsApi` | `getWalletPactHistory` | GET /api/v1/wallets/{wallet_id}/pacts/history | Get wallet pact history |
| `PendingOperationsApi` | `listPendingOperations` | GET /api/v1/pending-operations | List pending operations |
| `PendingOperationsApi` | `getPendingOperation` | GET /api/v1/pending-operations/{id} | Get pending operation |
| `PendingOperationsApi` | `approvePendingOperation` | POST /api/v1/pending-operations/{id}/approve | Approve pending operation |
| `PendingOperationsApi` | `rejectPendingOperation` | POST /api/v1/pending-operations/{id}/reject | Reject pending operation |
| `RecipesApi` | `createRecipe` | POST /api/v1/recipes/library | Create recipe |
| `RecipesApi` | `searchRecipes` | POST /api/v1/recipes/search | Search recipes |
| `RecipesApi` | `submitRecipe` | POST /api/v1/recipes/library/submit | Submit community recipe |
| `RecipesApi` | `updateRecipe` | PATCH /api/v1/recipes/library/{recipe_id} | Update recipe |
| `RecipesApi` | `reviewRecipeSubmission` | PATCH /api/v1/recipes/library/submissions/{recipe_id}/review | Review submitted recipe |
| `TransactionRecordsApi` | `listTransactionRecords` | GET /api/v1/wallets/transactions | List transaction records |
| `TransactionRecordsApi` | `getTransactionRecord` | GET /api/v1/wallets/{wallet_uuid}/transactions/{record_uuid} | Get transaction record |
| `TransactionRecordsApi` | `getTransactionRecordByRequestId` | GET /api/v1/wallets/{wallet_uuid}/transactions/by-request-id/{request_id} | Get transaction record by request ID |
| `TransactionsApi` | `transferTokens` | POST /api/v1/wallets/{wallet_uuid}/transfer | Transfer tokens |
| `TransactionsApi` | `contractCall` | POST /api/v1/wallets/{wallet_uuid}/contract-call | Call contract |
| `TransactionsApi` | `messageSign` | POST /api/v1/wallets/{wallet_uuid}/message-sign | Sign a message |
| `TransactionsApi` | `payment` | POST /api/v1/wallets/{wallet_uuid}/payment | Create payment |
| `TransactionsApi` | `estimateTransferFee` | POST /api/v1/wallets/{wallet_uuid}/estimate-transfer-fee | Estimate transfer fee |
| `TransactionsApi` | `estimateContractCallFee` | POST /api/v1/wallets/{wallet_uuid}/estimate-contract-call-fee | Estimate contract call fee |
| `TransactionsApi` | `dropTransaction` | POST /api/v1/wallets/{wallet_uuid}/transactions/{tx_uuid}/drop | Drop transaction |
| `TransactionsApi` | `speedupTransaction` | POST /api/v1/wallets/{wallet_uuid}/transactions/{tx_uuid}/speedup | Speed up transaction |
| `WalletsApi` | `listWallets` | GET /api/v1/wallets | List all wallets |
| `WalletsApi` | `createWallet` | POST /api/v1/wallets | Create wallet |
| `WalletsApi` | `getWallet` | GET /api/v1/wallets/{wallet_uuid} | Get wallet |
| `WalletsApi` | `updateWallet` | PATCH /api/v1/wallets/{wallet_uuid} | Update wallet |
| `WalletsApi` | `listWalletAddresses` | GET /api/v1/wallets/{wallet_uuid}/addresses | List wallet addresses |
| `WalletsApi` | `createWalletAddress` | POST /api/v1/wallets/{wallet_uuid}/addresses | Create wallet address |
| `WalletsApi` | `initiateWalletPair` | POST /api/v1/wallets/pairs/initiate | Initiate wallet pairing |
| `WalletsApi` | `confirmWalletPair` | POST /api/v1/wallets/pairs/confirm | Confirm wallet pairing |
| `WalletsApi` | `walletReshare` | POST /api/v1/wallets/{wallet_uuid}/reshare | Initiate wallet reshare |

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