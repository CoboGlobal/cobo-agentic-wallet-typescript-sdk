import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
import { HealthApi } from '../api/health-api';
import { WalletsApi } from '../api/wallets-api';
import { BalanceApi } from '../api/balance-api';
import { PactsApi } from '../api/pacts-api';
import { PendingOperationsApi } from '../api/pending-operations-api';
import { PendingOperationStatus } from '../models/pending-operation-status';
import { WalletType } from '../models/wallet-type';

/**
 * Create a mock axios instance that captures the request config
 * instead of making a real HTTP call.
 */
function createMockAxios(): AxiosInstance & { lastRequest?: AxiosRequestConfig } {
    const mock: any = {
        lastRequest: undefined,
        request: jest.fn((config: AxiosRequestConfig) => {
            mock.lastRequest = config;
            return Promise.resolve({ data: {}, status: 200, statusText: 'OK', headers: {}, config });
        }),
        defaults: { headers: { common: {} } },
        interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() },
        },
    };
    return mock;
}

describe('HealthApi', () => {
    it('should use basePath from configuration', () => {
        const config = new Configuration({ basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new HealthApi(config, undefined, mock);

        api.healthCheck();
        expect(mock.lastRequest?.url).toContain('https://api.example.com');
    });

    it('should include X-API-Key header when apiKey is set', async () => {
        const config = new Configuration({ apiKey: 'my-secret-key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new HealthApi(config, undefined, mock);

        await api.healthCheck();
        expect(mock.lastRequest?.headers?.['X-API-Key']).toBe('my-secret-key');
    });

    it('should NOT include X-API-Key header when apiKey is not set', async () => {
        const config = new Configuration({ basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new HealthApi(config, undefined, mock);

        await api.healthCheck();
        expect(mock.lastRequest?.headers?.['X-API-Key']).toBeUndefined();
    });

    it('should call GET /health', async () => {
        const config = new Configuration({ basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new HealthApi(config, undefined, mock);

        await api.healthCheck();
        expect(mock.lastRequest?.method).toBe('GET');
        expect(mock.lastRequest?.url).toContain('/health');
    });

    it('should set Accept and Content-Type headers', async () => {
        const config = new Configuration({ basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new HealthApi(config, undefined, mock);

        await api.healthCheck();
        expect(mock.lastRequest?.headers?.['Accept']).toBe('application/json');
        expect(mock.lastRequest?.headers?.['Content-Type']).toBe('application/json');
    });

    it('should allow custom basePath override in constructor', async () => {
        const config = new Configuration({ basePath: 'https://default.com' });
        const mock = createMockAxios();
        const api = new HealthApi(config, 'https://override.com', mock);

        await api.healthCheck();
        expect(mock.lastRequest?.url).toContain('https://override.com');
    });

    it('should merge custom options headers', async () => {
        const config = new Configuration({ basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new HealthApi(config, undefined, mock);

        await api.healthCheck({ headers: { 'X-Custom': 'value' } });
        expect(mock.lastRequest?.headers?.['X-Custom']).toBe('value');
    });
});

describe('WalletsApi', () => {
    it('should substitute path parameters in URL', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new WalletsApi(config, undefined, mock);

        await api.getWallet('wallet-123');
        expect(mock.lastRequest?.url).toContain('/api/v1/wallets/wallet-123');
        expect(mock.lastRequest?.url).not.toContain('{wallet_uuid}');
    });

    it('should encode special characters in path parameters', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new WalletsApi(config, undefined, mock);

        await api.getWallet('wallet/with spaces');
        expect(mock.lastRequest?.url).toContain('wallet%2Fwith%20spaces');
    });

    it('should use GET method for getWallet', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new WalletsApi(config, undefined, mock);

        await api.getWallet('wallet-123');
        expect(mock.lastRequest?.method).toBe('GET');
    });

    it('should send body for POST requests', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new WalletsApi(config, undefined, mock);

        const body = { wallet_type: WalletType.MPC, name: 'test-wallet' };
        await api.createWallet(body);
        expect(mock.lastRequest?.method).toBe('POST');
        expect(mock.lastRequest?.data).toEqual(body);
    });

    it('should pass explicit X-API-Key header param when provided', async () => {
        const config = new Configuration({ apiKey: 'config-key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new WalletsApi(config, undefined, mock);

        await api.getWallet('w-1', undefined, 'override-key');
        expect(mock.lastRequest?.headers?.['X-API-Key']).toBe('override-key');
    });
});

describe('BalanceApi', () => {
    it('should include query parameters in URL', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new BalanceApi(config, undefined, mock);

        await api.listBalances('wallet-abc', 'ETH');
        const url = mock.lastRequest?.url ?? '';
        expect(url).toContain('wallet_uuid=wallet-abc');
        expect(url).toContain('chain_id=ETH');
    });

    it('should omit undefined query parameters', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new BalanceApi(config, undefined, mock);

        await api.listBalances('wallet-abc');
        const url = mock.lastRequest?.url ?? '';
        expect(url).toContain('wallet_uuid=wallet-abc');
        expect(url).not.toContain('chain_id');
        expect(url).not.toContain('token_id');
    });

    it('should include boolean query parameters', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new BalanceApi(config, undefined, mock);

        await api.listBalances(undefined, undefined, '0xabc', undefined, true);
        const url = mock.lastRequest?.url ?? '';
        expect(url).toContain('address=0xabc');
        expect(url).toContain('force_refresh=true');
    });

    it('should include numeric query parameters', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new BalanceApi(config, undefined, mock);

        await api.listBalances(undefined, undefined, undefined, undefined, undefined, 50, undefined, undefined, 10);
        const url = mock.lastRequest?.url ?? '';
        expect(url).toContain('limit=50');
        expect(url).toContain('offset=10');
    });
});

describe('PactsApi', () => {
    it('should call GET /api/v1/pacts/{pact_id} for getPact', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new PactsApi(config, undefined, mock);

        await api.getPact('pact-abc');
        expect(mock.lastRequest?.method).toBe('GET');
        expect(mock.lastRequest?.url).toContain('/api/v1/pacts/pact-abc');
        expect(mock.lastRequest?.url).not.toContain('{pact_id}');
    });

    it('should call GET /api/v1/pacts/{pact_id}/events for listPactEvents', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new PactsApi(config, undefined, mock);

        await api.listPactEvents('pact-123');
        expect(mock.lastRequest?.method).toBe('GET');
        expect(mock.lastRequest?.url).toContain('/api/v1/pacts/pact-123/events');
    });

    it('should include query params for listPacts', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new PactsApi(config, undefined, mock);

        await api.listPacts('active' as any, 'wallet-1', undefined, undefined, 0, 20);
        const url = mock.lastRequest?.url ?? '';
        expect(url).toContain('status=active');
        expect(url).toContain('wallet_id=wallet-1');
        expect(url).toContain('limit=20');
        expect(url).toContain('offset=0');
    });

    it('should omit undefined query params for listPacts', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new PactsApi(config, undefined, mock);

        await api.listPacts();
        const url = mock.lastRequest?.url ?? '';
        expect(url).not.toContain('status=');
        expect(url).not.toContain('wallet_id=');
    });

    it('should send POST with body for submitPact', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new PactsApi(config, undefined, mock);

        const body = { wallet_id: 'w-1', spec: {} } as any;
        await api.submitPact(body);
        expect(mock.lastRequest?.method).toBe('POST');
        expect(mock.lastRequest?.url).toContain('/api/v1/pacts');
        expect(mock.lastRequest?.data).toEqual(body);
    });

    it('should call POST for revokePact', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new PactsApi(config, undefined, mock);

        await api.revokePact('pact-xyz');
        expect(mock.lastRequest?.method).toBe('POST');
        expect(mock.lastRequest?.url).toContain('/api/v1/pacts/pact-xyz/revoke');
    });
});

describe('PendingOperationsApi', () => {
    it('should call GET /api/v1/pending-operations/{id} for getPendingOperation', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new PendingOperationsApi(config, undefined, mock);

        await api.getPendingOperation('op-001');
        expect(mock.lastRequest?.method).toBe('GET');
        expect(mock.lastRequest?.url).toContain('/api/v1/pending-operations/op-001');
        expect(mock.lastRequest?.url).not.toContain('{pending_operation_id}');
    });

    it('should include status query param for listPendingOperations', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new PendingOperationsApi(config, undefined, mock);

        await api.listPendingOperations(PendingOperationStatus.pending);
        const url = mock.lastRequest?.url ?? '';
        expect(url).toContain('status=pending');
    });

    it('should omit status when not provided for listPendingOperations', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new PendingOperationsApi(config, undefined, mock);

        await api.listPendingOperations();
        const url = mock.lastRequest?.url ?? '';
        expect(url).not.toContain('status=');
    });

    it('should call POST for approvePendingOperation', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new PendingOperationsApi(config, undefined, mock);

        await api.approvePendingOperation('op-002');
        expect(mock.lastRequest?.method).toBe('POST');
        expect(mock.lastRequest?.url).toContain('/api/v1/pending-operations/op-002/approve');
    });

    it('should send POST with body for rejectPendingOperation', async () => {
        const config = new Configuration({ apiKey: 'key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new PendingOperationsApi(config, undefined, mock);

        const body = { reason: 'not authorized' };
        await api.rejectPendingOperation('op-003', body);
        expect(mock.lastRequest?.method).toBe('POST');
        expect(mock.lastRequest?.url).toContain('/api/v1/pending-operations/op-003/reject');
        expect(mock.lastRequest?.data).toEqual(body);
    });

    it('should include X-API-Key from config', async () => {
        const config = new Configuration({ apiKey: 'my-key', basePath: 'https://api.example.com' });
        const mock = createMockAxios();
        const api = new PendingOperationsApi(config, undefined, mock);

        await api.listPendingOperations();
        expect(mock.lastRequest?.headers?.['X-API-Key']).toBe('my-key');
    });
});

describe('API constructor', () => {
    it('should fall back to default server URL when no basePath given', () => {
        const mock = createMockAxios();
        // No basePath, no serverIndex — should not throw
        const api = new HealthApi(new Configuration(), undefined, mock);
        expect(api).toBeDefined();
    });

    it('should prefer configuration.basePath over default server', async () => {
        const config = new Configuration({ basePath: 'https://custom.host' });
        const mock = createMockAxios();
        const api = new HealthApi(config, undefined, mock);

        await api.healthCheck();
        expect(mock.lastRequest?.url).toContain('https://custom.host');
    });
});
