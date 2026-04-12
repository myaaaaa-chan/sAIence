import { describe, it, expect } from 'vitest';
import app from '../index';

const testEnv = {
  OPENROUTER_API_KEY: 'test-key',
  OPENROUTER_MODEL: 'test-model',
  CORS_ORIGIN: '',
  ENVIRONMENT: 'test',
};

describe('GET /api/health', () => {
  it('200 を返し、{ status: "ok" } を含む', async () => {
    const res = await app.request('/api/health', {}, testEnv);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ status: 'ok' });
  });
});
