# @cobo/agentic-wallet@0.1.3

Unified wallet engine for human and agent principals

TypeScript/JavaScript client for the Cobo Agentic Wallet Service API.

## Installation

```bash
npm install @cobo/agentic-wallet
```

## Getting Started

```typescript
import { Configuration, AuditApi } from '@cobo/agentic-wallet';

const config = new Configuration({
    apiKey: 'YOUR_API_KEY',
});


const api = new AuditApi(config);

```

## Documentation for API Endpoints

All URIs are relative to *http://localhost*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*AuditApi* | **listAuditLogs** | **GET** /api/v1/audit-logs | List audit logs
*BalanceApi* | **listBalances** | **GET** /api/v1/wallets/balances | List token balances
*CoinPriceApi* | **getAssetCoinPrices** | **GET** /api/v1/coin-price | Get coin prices
*FaucetApi* | **deposit** | **POST** /api/v1/faucet/deposit | Request faucet deposit
*FaucetApi* | **listTokens** | **GET** /api/v1/faucet/tokens | List faucet tokens
*HealthApi* | **healthCheck** | **GET** /health | Health Check
*IdentityApi* | **createApiKey** | **POST** /api/v1/api-keys | Create API key
*IdentityApi* | **createPrincipal** | **POST** /api/v1/principals | Create principal
*IdentityApi* | **getAgentStatus** | **GET** /api/v1/principals/{agent_id}/status | Get agent status
*IdentityApi* | **listApiKeys** | **GET** /api/v1/api-keys | List API keys
*IdentityApi* | **listMyAgents** | **GET** /api/v1/principals/agents | List my agents
*IdentityApi* | **listPrincipals** | **GET** /api/v1/principals | List all principals
*IdentityApi* | **provisionAgent** | **POST** /api/v1/principals/provision | Provision agent
*IdentityApi* | **revokeApiKey** | **DELETE** /api/v1/api-keys/{api_key_id} | Revoke API key
*IdentityApi* | **updatePrincipal** | **PATCH** /api/v1/principals/{principal_id} | Update principal
*MetaApi* | **ping** | **GET** /api/v1/ping | Ping
*MetadataApi* | **ethCall** | **POST** /api/v1/metadata/eth-call | Call a view/pure function on an EVM contract
*MetadataApi* | **getChainInfoByChainId** | **GET** /api/v1/metadata/chains/{chain_id}/info | Get chain info
*MetadataApi* | **listAssets** | **GET** /api/v1/metadata/assets | List supported assets
*MetadataApi* | **listChains** | **GET** /api/v1/metadata/chains | List supported chains
*MetadataApi* | **searchTokens** | **GET** /api/v1/metadata/tokens/search | Search tokens by symbol
*PactsApi* | **getPact** | **GET** /api/v1/pacts/{pact_id} | Get pact detail
*PactsApi* | **getWalletPactHistory** | **GET** /api/v1/wallets/{wallet_id}/pacts/history | Get wallet pact history
*PactsApi* | **getWalletPactStats** | **GET** /api/v1/wallets/{wallet_id}/pacts/stats | Get wallet pact statistics
*PactsApi* | **listPactEvents** | **GET** /api/v1/pacts/{pact_id}/events | List pact events
*PactsApi* | **listPacts** | **GET** /api/v1/pacts | List pacts
*PactsApi* | **revokePact** | **POST** /api/v1/pacts/{pact_id}/revoke | Revoke active pact
*PactsApi* | **submitPact** | **POST** /api/v1/pacts/submit | Submit pact for approval
*PactsApi* | **updateCompletionConditions** | **PATCH** /api/v1/pacts/{pact_id}/completion-conditions | Update completion conditions
*PactsApi* | **updatePolicies** | **PATCH** /api/v1/pacts/{pact_id}/policies | Update pact policies
*PactsApi* | **withdrawPact** | **POST** /api/v1/pacts/{pact_id}/withdraw | Withdraw pending pact
*PendingOperationsApi* | **approvePendingOperation** | **POST** /api/v1/pending-operations/{pending_operation_id}/approve | Approve pending operation
*PendingOperationsApi* | **getPendingOperation** | **GET** /api/v1/pending-operations/{pending_operation_id} | Get pending operation
*PendingOperationsApi* | **listPendingOperations** | **GET** /api/v1/pending-operations | List pending operations
*PendingOperationsApi* | **rejectPendingOperation** | **POST** /api/v1/pending-operations/{pending_operation_id}/reject | Reject pending operation
*RecipesApi* | **archiveRecipe** | **DELETE** /api/v1/recipes/library/{recipe_id} | Archive recipe
*RecipesApi* | **createRecipe** | **POST** /api/v1/recipes/library | Create recipe
*RecipesApi* | **getRecipeBySlug** | **GET** /api/v1/recipes/library/by-slug/{slug} | Get recipe detail by slug
*RecipesApi* | **getRecipeDocument** | **GET** /api/v1/recipes/{document_id} | Get full recipe document by ID
*RecipesApi* | **getRecipeSearchCount** | **GET** /api/v1/recipes/library/{recipe_id}/search-count | Get recipe search count
*RecipesApi* | **listFeaturedRecipes** | **GET** /api/v1/recipes/library/featured | List featured recipes
*RecipesApi* | **listRecipeCategories** | **GET** /api/v1/recipes/library/categories | List recipe categories
*RecipesApi* | **listRecipeLibrary** | **GET** /api/v1/recipes/library | List recipes in the public library
*RecipesApi* | **reviewRecipeSubmission** | **PATCH** /api/v1/recipes/library/submissions/{recipe_id}/review | Review submitted recipe
*RecipesApi* | **searchRecipes** | **POST** /api/v1/recipes/search | Search recipes
*RecipesApi* | **submitRecipe** | **POST** /api/v1/recipes/library/submit | Submit community recipe
*RecipesApi* | **trackRecipeShare** | **POST** /api/v1/recipes/library/{recipe_id}/share | Increment recipe share count
*RecipesApi* | **trackRecipeUse** | **POST** /api/v1/recipes/library/{recipe_id}/use | Increment recipe use count
*RecipesApi* | **updateRecipe** | **PATCH** /api/v1/recipes/library/{recipe_id} | Update recipe
*SuggestionsApi* | **getSuggestion** | **GET** /api/v1/suggestions/{key} | Get suggestion by key
*TelemetryApi* | **getTelemetryConfig** | **GET** /api/v1/telemetry/config | Get telemetry config
*TelemetryApi* | **ingestSessionTelemetry** | **POST** /api/v1/telemetry/session | Ingest session telemetry
*TelemetryApi* | **ingestTelemetry** | **POST** /api/v1/telemetry | Ingest CLI telemetry record
*TelemetryApi* | **recordLangfuseRaw** | **POST** /api/v1/telemetry/raw | Ingest raw Langfuse record
*TransactionRecordsApi* | **getUserTransaction** | **GET** /api/v1/wallets/{wallet_uuid}/transactions/{record_uuid} | Get transaction record
*TransactionRecordsApi* | **getUserTransactionByRequestId** | **GET** /api/v1/wallets/{wallet_uuid}/transactions/by-request-id/{request_id} | Get transaction record by request id
*TransactionRecordsApi* | **getUserTransactionByUuid** | **GET** /api/v1/wallets/transactions/{record_uuid} | Get transaction record by record id
*TransactionRecordsApi* | **listUserTransactions** | **GET** /api/v1/wallets/transactions | List transaction records
*TransactionsApi* | **contractCall** | **POST** /api/v1/wallets/{wallet_uuid}/contract-call | Call contract
*TransactionsApi* | **dropTransaction** | **POST** /api/v1/wallets/{wallet_uuid}/transactions/{transaction_uuid}/drop | Drop transaction
*TransactionsApi* | **estimateContractCallFee** | **POST** /api/v1/wallets/{wallet_uuid}/estimate-contract-call-fee | Estimate contract call fee
*TransactionsApi* | **estimateTransferFee** | **POST** /api/v1/wallets/{wallet_uuid}/estimate-transfer-fee | Estimate transfer fee
*TransactionsApi* | **handleWaasWebhook** | **POST** /api/v1/wallets/webhook | Handle WaaS webhook
*TransactionsApi* | **listRecentAddresses** | **GET** /api/v1/wallets/{wallet_uuid}/recent-addresses | List recent addresses
*TransactionsApi* | **messageSign** | **POST** /api/v1/wallets/{wallet_uuid}/message-sign | Sign a message
*TransactionsApi* | **payment** | **POST** /api/v1/wallets/{wallet_uuid}/payment | Create payment
*TransactionsApi* | **speedupTransaction** | **POST** /api/v1/wallets/{wallet_uuid}/transactions/{transaction_uuid}/speedup | Speed up transaction
*TransactionsApi* | **transferTokens** | **POST** /api/v1/wallets/{wallet_uuid}/transfer | Transfer tokens
*WalletsApi* | **confirmWalletPair** | **POST** /api/v1/wallets/pairs/confirm | Confirm wallet pairing
*WalletsApi* | **createWallet** | **POST** /api/v1/wallets | Create wallet
*WalletsApi* | **createWalletAddress** | **POST** /api/v1/wallets/{wallet_uuid}/addresses | Create wallet address
*WalletsApi* | **getPairInfo** | **GET** /api/v1/wallets/pairs/{token} | Get pair info by token
*WalletsApi* | **getPairInfoByWallet** | **GET** /api/v1/wallets/pairs/info/{wallet_uuid} | Get pair info by wallet
*WalletsApi* | **getWallet** | **GET** /api/v1/wallets/{wallet_uuid} | Get wallet
*WalletsApi* | **getWalletNodeStatus** | **GET** /api/v1/wallets/{wallet_uuid}/node-status | Get node status
*WalletsApi* | **initiateWalletPair** | **POST** /api/v1/wallets/pairs/initiate | Initiate wallet pairing
*WalletsApi* | **listWalletAddresses** | **GET** /api/v1/wallets/{wallet_uuid}/addresses | List wallet addresses
*WalletsApi* | **listWallets** | **GET** /api/v1/wallets | List all wallets
*WalletsApi* | **updateWallet** | **PATCH** /api/v1/wallets/{wallet_uuid} | Update wallet
*WalletsApi* | **walletReshare** | **POST** /api/v1/wallets/{wallet_uuid}/reshare | Initiate wallet reshare
*WalletsApi* | **walletTssCallback** | **POST** /api/v1/wallets/{wallet_uuid}/tss/callback | Report TSS request callback


## Documentation for Models

 - [AgentStatusResponse](docs/AgentStatusResponse.md)
 - [ApiKeyCreate](docs/ApiKeyCreate.md)
 - [ApiKeyCreateResult](docs/ApiKeyCreateResult.md)
 - [ApiKeyRead](docs/ApiKeyRead.md)
 - [ApplicableLimitRead](docs/ApplicableLimitRead.md)
 - [AuditAction](docs/AuditAction.md)
 - [AuditLogPage](docs/AuditLogPage.md)
 - [AuditLogRead](docs/AuditLogRead.md)
 - [AuditResult](docs/AuditResult.md)
 - [BalanceRead](docs/BalanceRead.md)
 - [ChainInfo](docs/ChainInfo.md)
 - [ChainMetadata](docs/ChainMetadata.md)
 - [CompletionCondition](docs/CompletionCondition.md)
 - [CompletionConditionType](docs/CompletionConditionType.md)
 - [ContractCallCreate](docs/ContractCallCreate.md)
 - [ContractCallSubmitResult](docs/ContractCallSubmitResult.md)
 - [DelegationSpendSummary](docs/DelegationSpendSummary.md)
 - [DelegationUsageLimitSummary](docs/DelegationUsageLimitSummary.md)
 - [DropTransactionRequest](docs/DropTransactionRequest.md)
 - [EIP1559FeeRequest](docs/EIP1559FeeRequest.md)
 - [EVMLegacyFeeRequest](docs/EVMLegacyFeeRequest.md)
 - [EstimateContractCallFeeRequest](docs/EstimateContractCallFeeRequest.md)
 - [EstimateTransferFeeRead](docs/EstimateTransferFeeRead.md)
 - [EstimateTransferFeeRequest](docs/EstimateTransferFeeRequest.md)
 - [EthCallRequest](docs/EthCallRequest.md)
 - [EthCallResult](docs/EthCallResult.md)
 - [ExternalTransactionOperationType](docs/ExternalTransactionOperationType.md)
 - [ExternalTransactionRead](docs/ExternalTransactionRead.md)
 - [ExternalTransactionStage](docs/ExternalTransactionStage.md)
 - [FaucetDepositRequest](docs/FaucetDepositRequest.md)
 - [FaucetDepositResult](docs/FaucetDepositResult.md)
 - [FaucetTokenInfo](docs/FaucetTokenInfo.md)
 - [FaucetTokenItem](docs/FaucetTokenItem.md)
 - [FeeEstimateRead](docs/FeeEstimateRead.md)
 - [FeeRequest](docs/FeeRequest.md)
 - [InlinePolicyCreate](docs/InlinePolicyCreate.md)
 - [KeyShareHolderGroupStatus](docs/KeyShareHolderGroupStatus.md)
 - [KeyShareHolderGroupType](docs/KeyShareHolderGroupType.md)
 - [KeyShareHolderType](docs/KeyShareHolderType.md)
 - [KnowledgeSearchType](docs/KnowledgeSearchType.md)
 - [LangfuseRecord](docs/LangfuseRecord.md)
 - [MessageSignCreate](docs/MessageSignCreate.md)
 - [MessageSignDestType](docs/MessageSignDestType.md)
 - [MessageSignResult](docs/MessageSignResult.md)
 - [ModelError](docs/ModelError.md)
 - [MppChallenge](docs/MppChallenge.md)
 - [MppSessionAction](docs/MppSessionAction.md)
 - [MppSessionInfo](docs/MppSessionInfo.md)
 - [MppSessionParams](docs/MppSessionParams.md)
 - [NodeStatusRead](docs/NodeStatusRead.md)
 - [PactEventListResponse](docs/PactEventListResponse.md)
 - [PactEventRead](docs/PactEventRead.md)
 - [PactEventType](docs/PactEventType.md)
 - [PactListResponse](docs/PactListResponse.md)
 - [PactRead](docs/PactRead.md)
 - [PactSpecInput](docs/PactSpecInput.md)
 - [PactSpecOutput](docs/PactSpecOutput.md)
 - [PactStatsLanguage](docs/PactStatsLanguage.md)
 - [PactStatus](docs/PactStatus.md)
 - [PactSubmitRequest](docs/PactSubmitRequest.md)
 - [PactSubmitResponse](docs/PactSubmitResponse.md)
 - [PactSummary](docs/PactSummary.md)
 - [PactUpdateCompletionConditionsRequest](docs/PactUpdateCompletionConditionsRequest.md)
 - [PactUpdatePoliciesRequest](docs/PactUpdatePoliciesRequest.md)
 - [PaginationMeta](docs/PaginationMeta.md)
 - [PairTokenStatus](docs/PairTokenStatus.md)
 - [PaymentCreate](docs/PaymentCreate.md)
 - [PaymentProtocol](docs/PaymentProtocol.md)
 - [PaymentResult](docs/PaymentResult.md)
 - [PendingOperationActionResult](docs/PendingOperationActionResult.md)
 - [PendingOperationListResponse](docs/PendingOperationListResponse.md)
 - [PendingOperationRead](docs/PendingOperationRead.md)
 - [PendingOperationStatus](docs/PendingOperationStatus.md)
 - [PendingOperationType](docs/PendingOperationType.md)
 - [PolicyCreate](docs/PolicyCreate.md)
 - [PolicyDryRunRequest](docs/PolicyDryRunRequest.md)
 - [PolicyDryRunResult](docs/PolicyDryRunResult.md)
 - [PolicyRead](docs/PolicyRead.md)
 - [PolicyScope](docs/PolicyScope.md)
 - [PolicyType](docs/PolicyType.md)
 - [PolicyUpdate](docs/PolicyUpdate.md)
 - [PrincipalCreate](docs/PrincipalCreate.md)
 - [PrincipalCreateResult](docs/PrincipalCreateResult.md)
 - [PrincipalRead](docs/PrincipalRead.md)
 - [PrincipalType](docs/PrincipalType.md)
 - [PrincipalUpdate](docs/PrincipalUpdate.md)
 - [ProvisionRequest](docs/ProvisionRequest.md)
 - [ProvisionResponse](docs/ProvisionResponse.md)
 - [RecentAddressRead](docs/RecentAddressRead.md)
 - [RecipeCategoryRead](docs/RecipeCategoryRead.md)
 - [RecipeCounterResult](docs/RecipeCounterResult.md)
 - [RecipeCreate](docs/RecipeCreate.md)
 - [RecipeCreateResult](docs/RecipeCreateResult.md)
 - [RecipeDetailRead](docs/RecipeDetailRead.md)
 - [RecipeDocument](docs/RecipeDocument.md)
 - [RecipeLibrarySortBy](docs/RecipeLibrarySortBy.md)
 - [RecipeRead](docs/RecipeRead.md)
 - [RecipeReviewAction](docs/RecipeReviewAction.md)
 - [RecipeReviewRequest](docs/RecipeReviewRequest.md)
 - [RecipeSearchResponse](docs/RecipeSearchResponse.md)
 - [RecipeSearchSource](docs/RecipeSearchSource.md)
 - [RecipeStatus](docs/RecipeStatus.md)
 - [RecipeSubmissionCreate](docs/RecipeSubmissionCreate.md)
 - [RecipeUpdate](docs/RecipeUpdate.md)
 - [RejectPendingOperationRequest](docs/RejectPendingOperationRequest.md)
 - [SOLFeeRequest](docs/SOLFeeRequest.md)
 - [SearchRecipesRequest](docs/SearchRecipesRequest.md)
 - [SessionRecord](docs/SessionRecord.md)
 - [SessionSpan](docs/SessionSpan.md)
 - [SolAddressLookupTableAccount](docs/SolAddressLookupTableAccount.md)
 - [SolInstruction](docs/SolInstruction.md)
 - [SolInstructionAccount](docs/SolInstructionAccount.md)
 - [SpeedupTransactionRequest](docs/SpeedupTransactionRequest.md)
 - [StandardResponseAgentStatusResponse](docs/StandardResponseAgentStatusResponse.md)
 - [StandardResponseApiKeyCreateResult](docs/StandardResponseApiKeyCreateResult.md)
 - [StandardResponseAuditLogPage](docs/StandardResponseAuditLogPage.md)
 - [StandardResponseChainInfo](docs/StandardResponseChainInfo.md)
 - [StandardResponseContractCallSubmitResult](docs/StandardResponseContractCallSubmitResult.md)
 - [StandardResponseDictStrBool](docs/StandardResponseDictStrBool.md)
 - [StandardResponseDictStrStr](docs/StandardResponseDictStrStr.md)
 - [StandardResponseEstimateTransferFeeRead](docs/StandardResponseEstimateTransferFeeRead.md)
 - [StandardResponseEthCallResult](docs/StandardResponseEthCallResult.md)
 - [StandardResponseFaucetDepositResult](docs/StandardResponseFaucetDepositResult.md)
 - [StandardResponseListApiKeyRead](docs/StandardResponseListApiKeyRead.md)
 - [StandardResponseListBalanceRead](docs/StandardResponseListBalanceRead.md)
 - [StandardResponseListFaucetTokenItem](docs/StandardResponseListFaucetTokenItem.md)
 - [StandardResponseListPolicyRead](docs/StandardResponseListPolicyRead.md)
 - [StandardResponseListPrincipalRead](docs/StandardResponseListPrincipalRead.md)
 - [StandardResponseListRecentAddressRead](docs/StandardResponseListRecentAddressRead.md)
 - [StandardResponseListRecipeCategoryRead](docs/StandardResponseListRecipeCategoryRead.md)
 - [StandardResponseListRecipeRead](docs/StandardResponseListRecipeRead.md)
 - [StandardResponseListTokenCandidate](docs/StandardResponseListTokenCandidate.md)
 - [StandardResponseListUserTransactionRead](docs/StandardResponseListUserTransactionRead.md)
 - [StandardResponseListWalletAddressRead](docs/StandardResponseListWalletAddressRead.md)
 - [StandardResponseListWalletRead](docs/StandardResponseListWalletRead.md)
 - [StandardResponseMessageSignResult](docs/StandardResponseMessageSignResult.md)
 - [StandardResponseNodeStatusRead](docs/StandardResponseNodeStatusRead.md)
 - [StandardResponsePactEventListResponse](docs/StandardResponsePactEventListResponse.md)
 - [StandardResponsePactListResponse](docs/StandardResponsePactListResponse.md)
 - [StandardResponsePactRead](docs/StandardResponsePactRead.md)
 - [StandardResponsePactSubmitResponse](docs/StandardResponsePactSubmitResponse.md)
 - [StandardResponsePaymentResult](docs/StandardResponsePaymentResult.md)
 - [StandardResponsePendingOperationActionResult](docs/StandardResponsePendingOperationActionResult.md)
 - [StandardResponsePendingOperationListResponse](docs/StandardResponsePendingOperationListResponse.md)
 - [StandardResponsePendingOperationRead](docs/StandardResponsePendingOperationRead.md)
 - [StandardResponsePolicyDryRunResult](docs/StandardResponsePolicyDryRunResult.md)
 - [StandardResponsePolicyRead](docs/StandardResponsePolicyRead.md)
 - [StandardResponsePrincipalCreateResult](docs/StandardResponsePrincipalCreateResult.md)
 - [StandardResponsePrincipalRead](docs/StandardResponsePrincipalRead.md)
 - [StandardResponseProvisionResponse](docs/StandardResponseProvisionResponse.md)
 - [StandardResponseRecipeCounterResult](docs/StandardResponseRecipeCounterResult.md)
 - [StandardResponseRecipeCreateResult](docs/StandardResponseRecipeCreateResult.md)
 - [StandardResponseRecipeDetailRead](docs/StandardResponseRecipeDetailRead.md)
 - [StandardResponseRecipeDocument](docs/StandardResponseRecipeDocument.md)
 - [StandardResponseRecipeSearchResponse](docs/StandardResponseRecipeSearchResponse.md)
 - [StandardResponseSuggestionResponse](docs/StandardResponseSuggestionResponse.md)
 - [StandardResponseTelemetryConfigResponse](docs/StandardResponseTelemetryConfigResponse.md)
 - [StandardResponseTransactionRbfResult](docs/StandardResponseTransactionRbfResult.md)
 - [StandardResponseTransferSubmitResult](docs/StandardResponseTransferSubmitResult.md)
 - [StandardResponseUserTransactionRead](docs/StandardResponseUserTransactionRead.md)
 - [StandardResponseWaasPaginatedResponseChainMetadata](docs/StandardResponseWaasPaginatedResponseChainMetadata.md)
 - [StandardResponseWaasPaginatedResponseTokenMetadata](docs/StandardResponseWaasPaginatedResponseTokenMetadata.md)
 - [StandardResponseWalletAddressRead](docs/StandardResponseWalletAddressRead.md)
 - [StandardResponseWalletDetailRead](docs/StandardResponseWalletDetailRead.md)
 - [StandardResponseWalletPactHistoryRead](docs/StandardResponseWalletPactHistoryRead.md)
 - [StandardResponseWalletPactStatsRead](docs/StandardResponseWalletPactStatsRead.md)
 - [StandardResponseWalletPairInfoRead](docs/StandardResponseWalletPairInfoRead.md)
 - [StandardResponseWalletPairInitiateRead](docs/StandardResponseWalletPairInitiateRead.md)
 - [StandardResponseWalletPairRead](docs/StandardResponseWalletPairRead.md)
 - [StandardResponseWalletRead](docs/StandardResponseWalletRead.md)
 - [StandardResponseWalletReshareResponse](docs/StandardResponseWalletReshareResponse.md)
 - [StandardResponseWalletTssCallbackResponse](docs/StandardResponseWalletTssCallbackResponse.md)
 - [StandardResponseWebhookProcessResult](docs/StandardResponseWebhookProcessResult.md)
 - [SuggestionKey](docs/SuggestionKey.md)
 - [SuggestionResponse](docs/SuggestionResponse.md)
 - [TelemetryConfigResponse](docs/TelemetryConfigResponse.md)
 - [TierEvaluationRead](docs/TierEvaluationRead.md)
 - [TokenCandidate](docs/TokenCandidate.md)
 - [TokenMetadata](docs/TokenMetadata.md)
 - [TransactionProvider](docs/TransactionProvider.md)
 - [TransactionRbfResult](docs/TransactionRbfResult.md)
 - [TransferCreate](docs/TransferCreate.md)
 - [TransferSubmitResult](docs/TransferSubmitResult.md)
 - [UcwSharePublicDataCallback](docs/UcwSharePublicDataCallback.md)
 - [UcwTssKeyShareGroupCallback](docs/UcwTssKeyShareGroupCallback.md)
 - [UserTransactionData](docs/UserTransactionData.md)
 - [UserTransactionOperationType](docs/UserTransactionOperationType.md)
 - [UserTransactionRead](docs/UserTransactionRead.md)
 - [UserTransactionRequestType](docs/UserTransactionRequestType.md)
 - [ValidationError](docs/ValidationError.md)
 - [ValidationErrorLocInner](docs/ValidationErrorLocInner.md)
 - [VaultGroupType](docs/VaultGroupType.md)
 - [WaasPaginatedResponseChainMetadata](docs/WaasPaginatedResponseChainMetadata.md)
 - [WaasPaginatedResponseTokenMetadata](docs/WaasPaginatedResponseTokenMetadata.md)
 - [WaasPagination](docs/WaasPagination.md)
 - [WalletAddressCreate](docs/WalletAddressCreate.md)
 - [WalletAddressRead](docs/WalletAddressRead.md)
 - [WalletCreate](docs/WalletCreate.md)
 - [WalletDetailRead](docs/WalletDetailRead.md)
 - [WalletGroupNodeRead](docs/WalletGroupNodeRead.md)
 - [WalletGroupRead](docs/WalletGroupRead.md)
 - [WalletPactCurrency](docs/WalletPactCurrency.md)
 - [WalletPactHistoryBucketPactRead](docs/WalletPactHistoryBucketPactRead.md)
 - [WalletPactHistoryBucketRead](docs/WalletPactHistoryBucketRead.md)
 - [WalletPactHistoryMetric](docs/WalletPactHistoryMetric.md)
 - [WalletPactHistoryRange](docs/WalletPactHistoryRange.md)
 - [WalletPactHistoryRead](docs/WalletPactHistoryRead.md)
 - [WalletPactHistorySummaryRead](docs/WalletPactHistorySummaryRead.md)
 - [WalletPactStatsRead](docs/WalletPactStatsRead.md)
 - [WalletPairAgentInfo](docs/WalletPairAgentInfo.md)
 - [WalletPairConfirm](docs/WalletPairConfirm.md)
 - [WalletPairInfoRead](docs/WalletPairInfoRead.md)
 - [WalletPairInitiate](docs/WalletPairInitiate.md)
 - [WalletPairInitiateRead](docs/WalletPairInitiateRead.md)
 - [WalletPairRead](docs/WalletPairRead.md)
 - [WalletPairStatus](docs/WalletPairStatus.md)
 - [WalletPairWalletInfo](docs/WalletPairWalletInfo.md)
 - [WalletRead](docs/WalletRead.md)
 - [WalletReshareRequest](docs/WalletReshareRequest.md)
 - [WalletReshareResponse](docs/WalletReshareResponse.md)
 - [WalletStatus](docs/WalletStatus.md)
 - [WalletTssCallbackRequest](docs/WalletTssCallbackRequest.md)
 - [WalletTssCallbackResponse](docs/WalletTssCallbackResponse.md)
 - [WalletType](docs/WalletType.md)
 - [WalletUpdate](docs/WalletUpdate.md)
 - [WebhookProcessResult](docs/WebhookProcessResult.md)
 - [WrappedValidationError](docs/WrappedValidationError.md)


## Author


