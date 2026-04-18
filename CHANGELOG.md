# Changelog

## 0.1.2

- Initial release of the TypeScript SDK
- Typed axios-based HTTP client auto-generated from the OpenAPI spec
- `Configuration` class — `apiKey`, `basePath`, `baseOptions`, `serverIndex` support; `X-API-Key` header injection
- API classes: `WalletsApi`, `PactsApi`, `TransactionsApi`, `BalanceApi`, `TransactionRecordsApi`, `PendingOperationsApi`, `AuditApi`, `IdentityApi`, `FaucetApi`, `MetadataApi`, `RecipesApi`, `CoinPriceApi`, `TelemetryApi`, `HealthApi`
- Key operations: `submitPact`, `getPact`, `listPacts`, `revokePact`, `updatePolicies`, `updateCompletionConditions`, `transferTokens`, `contractCall`, `messageSign`, `payment`, `estimateTransferFee`, `estimateContractCallFee`, `dropTransaction`, `speedupTransaction`, `listBalances`, `listTransactionRecords`, `getTransactionRecordByRequestId`, `listPendingOperations`, `approvePendingOperation`, `rejectPendingOperation`, `provisionAgent`, `listAuditLogs`
- Full TypeScript types for all request and response models
- Error classes: `ApiError`, `BadRequestError`, `UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ServerError`