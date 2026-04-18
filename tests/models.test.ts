import { WalletType } from '../models/wallet-type';
import { WalletStatus } from '../models/wallet-status';
import type { WalletRead } from '../models/wallet-read';
import type { WalletCreate } from '../models/wallet-create';

describe('WalletType enum', () => {
    it('should have MPC value', () => {
        expect(WalletType.MPC).toBe('MPC');
    });

    it('should have Custodial value', () => {
        expect(WalletType.Custodial).toBe('Custodial');
    });

    it('should be usable as a type', () => {
        const t: WalletType = WalletType.MPC;
        expect(t).toBe('MPC');
    });
});

describe('WalletStatus enum', () => {
    it('should define preparing, active, archived', () => {
        expect(WalletStatus.preparing).toBe('preparing');
        expect(WalletStatus.active).toBe('active');
        expect(WalletStatus.archived).toBe('archived');
    });
});

describe('WalletRead interface', () => {
    it('should accept a valid wallet object', () => {
        const wallet: WalletRead = {
            uuid: 'wallet-123',
            wallet_type: WalletType.MPC,
            name: 'My Wallet',
            owner_id: 'owner-456',
            cobo_wallet_id: null,
            status: WalletStatus.active,
            metadata: { env: 'test' },
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
        };
        expect(wallet.uuid).toBe('wallet-123');
        expect(wallet.wallet_type).toBe('MPC');
        expect(wallet.status).toBe('active');
        expect(wallet.cobo_wallet_id).toBeNull();
        expect(wallet.metadata).toEqual({ env: 'test' });
    });

    it('should allow optional main_node_id', () => {
        const wallet: WalletRead = {
            uuid: 'w-1',
            wallet_type: WalletType.MPC,
            name: 'Test',
            owner_id: 'o-1',
            cobo_wallet_id: 'cobo-1',
            status: WalletStatus.preparing,
            metadata: {},
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
            main_node_id: 'node-abc',
        };
        expect(wallet.main_node_id).toBe('node-abc');
    });
});

describe('WalletCreate interface', () => {
    it('should accept minimal required fields', () => {
        const req: WalletCreate = {
            wallet_type: WalletType.MPC,
            name: 'New Wallet',
        };
        expect(req.wallet_type).toBe('MPC');
        expect(req.name).toBe('New Wallet');
        expect(req.metadata).toBeUndefined();
    });

    it('should accept optional fields', () => {
        const req: WalletCreate = {
            wallet_type: WalletType.MPC,
            name: 'Full Wallet',
            main_node_id: 'node-1',
            metadata: { purpose: 'testing' },
            for_owner: true,
        };
        expect(req.main_node_id).toBe('node-1');
        expect(req.for_owner).toBe(true);
    });
});

describe('Model JSON serialization', () => {
    it('should round-trip WalletRead through JSON', () => {
        const wallet: WalletRead = {
            uuid: 'w-1',
            wallet_type: WalletType.MPC,
            name: 'Test',
            owner_id: 'o-1',
            cobo_wallet_id: null,
            status: WalletStatus.active,
            metadata: { key: 'value' },
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-06-15T12:00:00Z',
        };

        const json = JSON.stringify(wallet);
        const parsed = JSON.parse(json) as WalletRead;

        expect(parsed.uuid).toBe(wallet.uuid);
        expect(parsed.wallet_type).toBe(wallet.wallet_type);
        expect(parsed.status).toBe(wallet.status);
        expect(parsed.cobo_wallet_id).toBeNull();
        expect(parsed.metadata).toEqual({ key: 'value' });
    });

    it('should serialize enum values as strings', () => {
        const data = { type: WalletType.MPC, status: WalletStatus.archived };
        const json = JSON.stringify(data);
        expect(json).toContain('"MPC"');
        expect(json).toContain('"archived"');
    });
});
