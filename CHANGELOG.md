# Changelog

## 0.1.6

OpenAPI spec upgraded from 1.1.0 to 1.2.4.

### New features

- **`WalletPairTokenPurpose` enum** — new model distinguishing `pair` (initial claim flow) from `restore` (post-completion recovery code).
- **`WalletPairStatus.paired`** — new intermediate status value between `pending` and `completed`.

### API changes

- **`TransactionsApi.listRecentAddresses`** — added optional `token_id` parameter to filter by token (e.g. `SETH`, `SETH_USDC`).
- **`TransactionsApi.listRecentAddressesByUser`** — added optional `token_id` parameter (same filter).
- **`WalletsApi.getPairInfo`** — added optional `X_API_Key` header parameter; `restore` tokens now require the caller to be the bound owner.
- **`WalletsApi.initiateWalletPairing`** — updated to return either a `pair` or `restore` token depending on whether the wallet's first pair claim is already completed.
- **`WalletsApi.confirmWalletPairing`** — added optional `wallet_id` field; now handles both `pair` (ownership transfer + agent provisioning) and `restore` (ownership unchanged, signals a follow-up reshare).
- **`WalletsApi.initiateWalletReshare`** — added optional `token` field to pass a `pair` or `restore` code that the backend resolves for authorization.

### Model field updates

- **`Eip1559FeeRequest.gas_limit`** — changed from required to optional; the backend now estimates gas when omitted.
- **`WalletPairInitiateRead`** — added `token_purpose: WalletPairTokenPurpose`, optional `agent: WalletPairAgentInfo`, optional `wallet: WalletPairWalletInfo`.
- **`WalletPairRead`** — same additions as `WalletPairInitiateRead`.
- **`AgentStatusResponse`** — `temporary` status value is deprecated; kept for backward compatibility and will be removed in a future major release.

### Documentation

- README: added *AI coding agent support* section with `npx skills add` instructions for Claude Code, Cursor, and Windsurf.

## 0.1.2

- Initial release of the TypeScript SDK
- Typed axios-based HTTP client auto-generated from the OpenAPI spec
- `Configuration` class — `apiKey`, `basePath`, `baseOptions`, `serverIndex` support; `X-API-Key` header injection
- API classes: `WalletsApi`, `PactsApi`, `TransactionsApi`, `BalanceApi`, `TransactionRecordsApi`, `PendingOperationsApi`, `AuditApi`, `IdentityApi`, `FaucetApi`, `MetadataApi`, `RecipesApi`, `CoinPriceApi`, `TelemetryApi`, `HealthApi`
- Key operations: `submitPact`, `getPact`, `listPacts`, `revokePact`, `updatePolicies`, `updateCompletionConditions`, `transferTokens`, `contractCall`, `messageSign`, `payment`, `estimateTransferFee`, `estimateContractCallFee`, `dropTransaction`, `speedupTransaction`, `listBalances`, `listTransactionRecords`, `getTransactionRecordByRequestId`, `listPendingOperations`, `approvePendingOperation`, `rejectPendingOperation`, `provisionAgent`, `listAuditLogs`
- Full TypeScript types for all request and response models
- Error classes: `ApiError`, `BadRequestError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ServerError`