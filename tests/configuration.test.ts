import { Configuration, getServerUrl, ServerConfigurations } from '../configuration';

describe('Configuration', () => {
    it('should create with default empty parameters', () => {
        const config = new Configuration();
        expect(config.apiKey).toBeUndefined();
        expect(config.basePath).toBeUndefined();
        expect(config.serverIndex).toBeUndefined();
    });

    it('should accept all parameters', () => {
        const config = new Configuration({
            apiKey: 'test-key',
            basePath: 'https://example.com',
            serverIndex: 0,
            serverVariables: { env: 'prod' },
            baseOptions: { timeout: 5000 },
        });
        expect(config.apiKey).toBe('test-key');
        expect(config.basePath).toBe('https://example.com');
        expect(config.serverIndex).toBe(0);
        expect(config.serverVariables).toEqual({ env: 'prod' });
        expect(config.baseOptions).toEqual({ timeout: 5000 });
    });
});

describe('getServerUrl', () => {
    it('should return server URL for valid index', () => {
        const url = getServerUrl(0);
        expect(typeof url).toBe('string');
    });

    it('should throw for out-of-range index', () => {
        expect(() => getServerUrl(999)).toThrow('out of range');
    });

    it('should throw for negative index', () => {
        expect(() => getServerUrl(-1)).toThrow('out of range');
    });
});

describe('ServerConfigurations', () => {
    it('should be a non-empty array', () => {
        expect(Array.isArray(ServerConfigurations)).toBe(true);
        expect(ServerConfigurations.length).toBeGreaterThan(0);
    });

    it('should have url and description on each entry', () => {
        for (const server of ServerConfigurations) {
            expect(server).toHaveProperty('url');
            expect(server).toHaveProperty('description');
        }
    });
});
