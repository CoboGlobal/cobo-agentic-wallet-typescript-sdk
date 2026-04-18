import {
    assertParamExists,
    RequiredError,
    ApiError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ServerError,
} from '../common';

describe('assertParamExists', () => {
    it('should not throw for valid string value', () => {
        expect(() => assertParamExists('fn', 'param', 'value')).not.toThrow();
    });

    it('should not throw for zero', () => {
        expect(() => assertParamExists('fn', 'param', 0)).not.toThrow();
    });

    it('should not throw for empty string', () => {
        expect(() => assertParamExists('fn', 'param', '')).not.toThrow();
    });

    it('should not throw for false', () => {
        expect(() => assertParamExists('fn', 'param', false)).not.toThrow();
    });

    it('should throw RequiredError for null', () => {
        expect(() => assertParamExists('myFunc', 'id', null)).toThrow(RequiredError);
        expect(() => assertParamExists('myFunc', 'id', null)).toThrow(
            'Required parameter id was null or undefined when calling myFunc.'
        );
    });

    it('should throw RequiredError for undefined', () => {
        expect(() => assertParamExists('myFunc', 'id', undefined)).toThrow(RequiredError);
    });
});

describe('RequiredError', () => {
    it('should have name and field set', () => {
        const err = new RequiredError('wallet_id', 'wallet_id is required');
        expect(err.name).toBe('RequiredError');
        expect(err.field).toBe('wallet_id');
        expect(err.message).toBe('wallet_id is required');
        expect(err).toBeInstanceOf(Error);
    });
});

describe('ApiError', () => {
    it('should carry status, body, and headers', () => {
        const err = new ApiError(500, { error: 'fail' }, { 'x-request-id': 'abc' });
        expect(err.status).toBe(500);
        expect(err.body).toEqual({ error: 'fail' });
        expect(err.headers).toEqual({ 'x-request-id': 'abc' });
        expect(err.name).toBe('ApiError');
        expect(err).toBeInstanceOf(Error);
    });

    it('should format message with string body', () => {
        const err = new ApiError(400, 'bad request');
        expect(err.message).toContain('400');
        expect(err.message).toContain('bad request');
    });

    it('should format message with object body', () => {
        const err = new ApiError(422, { detail: 'validation failed' });
        expect(err.message).toContain('422');
        expect(err.message).toContain('validation failed');
    });

    it('should handle empty body', () => {
        const err = new ApiError(204, null);
        expect(err.message).toContain('204');
    });

    it('should default headers to empty object', () => {
        const err = new ApiError(500, 'err');
        expect(err.headers).toEqual({});
    });
});

describe('Typed error subclasses', () => {
    it('BadRequestError should have status 400', () => {
        const err = new BadRequestError('bad');
        expect(err.status).toBe(400);
        expect(err.name).toBe('BadRequestError');
        expect(err).toBeInstanceOf(ApiError);
        expect(err).toBeInstanceOf(Error);
    });

    it('UnauthorizedError should have status 401', () => {
        const err = new UnauthorizedError('unauth');
        expect(err.status).toBe(401);
        expect(err.name).toBe('UnauthorizedError');
        expect(err).toBeInstanceOf(ApiError);
    });

    it('ForbiddenError should have status 403', () => {
        const err = new ForbiddenError('forbidden');
        expect(err.status).toBe(403);
        expect(err.name).toBe('ForbiddenError');
        expect(err).toBeInstanceOf(ApiError);
    });

    it('NotFoundError should have status 404', () => {
        const err = new NotFoundError('not found');
        expect(err.status).toBe(404);
        expect(err.name).toBe('NotFoundError');
        expect(err).toBeInstanceOf(ApiError);
    });

    it('ServerError should carry custom 5xx status', () => {
        const err = new ServerError(503, 'service unavailable');
        expect(err.status).toBe(503);
        expect(err.name).toBe('ServerError');
        expect(err).toBeInstanceOf(ApiError);
    });
});
