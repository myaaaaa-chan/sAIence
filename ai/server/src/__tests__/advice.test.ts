import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { PhotoAdviceResponse } from '../types/shared';

vi.mock('../services/openrouter', () => ({
  callOpenRouterMultimodal: vi.fn(),
  parseAiJsonResponse: vi.fn(),
}));

import { callOpenRouterMultimodal, parseAiJsonResponse } from '../services/openrouter';
import app from '../index';

const mockCallOpenRouterMultimodal = vi.mocked(callOpenRouterMultimodal);
const mockParseAiJsonResponse = vi.mocked(parseAiJsonResponse);

const testEnv = {
  OPENROUTER_API_KEY: 'test-key',
  OPENROUTER_MODEL: 'test-model',
  CORS_ORIGIN: '',
  ENVIRONMENT: 'test',
};

const validBase64 = 'dGVzdA=='; // "test" in base64

describe('POST /api/advice', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('mimeType が無効な場合 400 を返す', async () => {
    const res = await app.request(
      '/api/advice',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vegetableName: 'トマト',
          imageBase64: validBase64,
          mimeType: 'image/gif',
        }),
      },
      testEnv,
    );
    expect(res.status).toBe(400);
    const body = await res.json() as { error: string };
    expect(body.error).toBe('VALIDATION_ERROR');
  });

  it('imageBase64 が空の場合 400 を返す', async () => {
    const res = await app.request(
      '/api/advice',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vegetableName: 'トマト',
          imageBase64: '',
          mimeType: 'image/jpeg',
        }),
      },
      testEnv,
    );
    expect(res.status).toBe(400);
    const body = await res.json() as { error: string };
    expect(body.error).toBe('VALIDATION_ERROR');
  });

  it('vegetableName が空の場合 400 を返す', async () => {
    const res = await app.request(
      '/api/advice',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vegetableName: '',
          imageBase64: validBase64,
          mimeType: 'image/jpeg',
        }),
      },
      testEnv,
    );
    expect(res.status).toBe(400);
  });

  it('AI 呼び出し成功 → 200 と PhotoAdviceResponse を返す', async () => {
    const mockResponse: PhotoAdviceResponse = {
      advice: '葉の色が良く、健康的に育っています。',
      urgency: 'normal',
      actions: ['定期的な水やりを続けてください', '追肥を月1回行ってください'],
    };

    mockCallOpenRouterMultimodal.mockResolvedValue(JSON.stringify(mockResponse));
    mockParseAiJsonResponse.mockReturnValue(mockResponse);

    const res = await app.request(
      '/api/advice',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vegetableName: 'トマト',
          imageBase64: validBase64,
          mimeType: 'image/jpeg',
        }),
      },
      testEnv,
    );

    expect(res.status).toBe(200);
    const body = await res.json() as PhotoAdviceResponse;
    expect(body.urgency).toBe('normal');
    expect(body.actions).toHaveLength(2);
    expect(body.advice).toBe('葉の色が良く、健康的に育っています。');
  });

  it('userComment を含むリクエストでも 200 を返す', async () => {
    const mockResponse: PhotoAdviceResponse = {
      advice: '葉が黄色くなっているのは水不足の可能性があります。',
      urgency: 'attention',
      actions: ['水やりの頻度を増やしてください'],
    };

    mockCallOpenRouterMultimodal.mockResolvedValue(JSON.stringify(mockResponse));
    mockParseAiJsonResponse.mockReturnValue(mockResponse);

    const res = await app.request(
      '/api/advice',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vegetableName: 'トマト',
          imageBase64: validBase64,
          mimeType: 'image/png',
          userComment: '葉が黄色くなっています',
        }),
      },
      testEnv,
    );

    expect(res.status).toBe(200);
    const body = await res.json() as PhotoAdviceResponse;
    expect(body.urgency).toBe('attention');
  });

  it('AI 呼び出し失敗 → 502 を返す', async () => {
    mockCallOpenRouterMultimodal.mockRejectedValue(new Error('OpenRouter API error'));

    const res = await app.request(
      '/api/advice',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vegetableName: 'トマト',
          imageBase64: validBase64,
          mimeType: 'image/jpeg',
        }),
      },
      testEnv,
    );

    expect(res.status).toBe(502);
    const body = await res.json() as { error: string };
    expect(body.error).toBe('AI_SERVICE_ERROR');
  });

  it('AI レスポンスのパースに失敗 → 502 を返す', async () => {
    mockCallOpenRouterMultimodal.mockResolvedValue('invalid json');
    mockParseAiJsonResponse.mockImplementation(() => {
      throw new SyntaxError('Unexpected token');
    });

    const res = await app.request(
      '/api/advice',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vegetableName: 'トマト',
          imageBase64: validBase64,
          mimeType: 'image/webp',
        }),
      },
      testEnv,
    );

    expect(res.status).toBe(502);
    const body = await res.json() as { error: string };
    expect(body.error).toBe('AI_PARSE_ERROR');
  });
});
