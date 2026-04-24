import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { AiScheduleResponse } from '../types/shared';

vi.mock('../services/openrouter', () => ({
  callOpenRouterText: vi.fn(),
  parseAiJsonResponse: vi.fn(),
}));

import { callOpenRouterText, parseAiJsonResponse } from '../services/openrouter';
import app from '../index';

const mockCallOpenRouterText = vi.mocked(callOpenRouterText);
const mockParseAiJsonResponse = vi.mocked(parseAiJsonResponse);

const testEnv = {
  OPENROUTER_API_KEY: 'test-key',
  OPENROUTER_MODEL: 'test-model',
  CORS_ORIGIN: '',
  ENVIRONMENT: 'test',
};

describe('POST /api/schedule', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('vegetableName が空の場合 400 を返す', async () => {
    const res = await app.request(
      '/api/schedule',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vegetableName: '', plantedAt: '2026-04-01' }),
      },
      testEnv,
    );
    expect(res.status).toBe(400);
    const body = await res.json() as { error: string };
    expect(body.error).toBe('VALIDATION_ERROR');
  });

  it('plantedAt が欠如している場合 400 を返す', async () => {
    const res = await app.request(
      '/api/schedule',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vegetableName: 'トマト' }),
      },
      testEnv,
    );
    expect(res.status).toBe(400);
    const body = await res.json() as { error: string };
    expect(body.error).toBe('VALIDATION_ERROR');
  });

  it('plantedAt が YYYY-MM-DD 形式でない場合 400 を返す', async () => {
    const res = await app.request(
      '/api/schedule',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vegetableName: 'トマト', plantedAt: '2026/04/01' }),
      },
      testEnv,
    );
    expect(res.status).toBe(400);
  });

  it('AI 呼び出し成功 → 200 と AiScheduleResponse を返す', async () => {
    const mockResponse: AiScheduleResponse = {
      vegetableName: 'トマト',
      events: [
        {
          type: 'watering',
          title: '水やり',
          description: '毎日水をやる',
          scheduledDate: '2026-04-02',
        },
      ],
      notes: '補足情報',
    };

    mockCallOpenRouterText.mockResolvedValue(JSON.stringify(mockResponse));
    mockParseAiJsonResponse.mockReturnValue(mockResponse);

    const res = await app.request(
      '/api/schedule',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vegetableName: 'トマト', plantedAt: '2026-04-01' }),
      },
      testEnv,
    );

    expect(res.status).toBe(200);
    const body = await res.json() as AiScheduleResponse;
    expect(body.vegetableName).toBe('トマト');
    expect(body.events).toHaveLength(1);
    expect(body.events[0].type).toBe('watering');
  });

  it('region と memo を指定しても 200 を返す', async () => {
    const mockResponse: AiScheduleResponse = {
      vegetableName: 'トマト',
      events: [],
    };

    mockCallOpenRouterText.mockResolvedValue(JSON.stringify(mockResponse));
    mockParseAiJsonResponse.mockReturnValue(mockResponse);

    const res = await app.request(
      '/api/schedule',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vegetableName: 'トマト',
          plantedAt: '2026-04-01',
          region: '関東',
          memo: '有機栽培で育てたい',
        }),
      },
      testEnv,
    );

    expect(res.status).toBe(200);
  });

  it('AI 呼び出し失敗 → 502 を返す', async () => {
    mockCallOpenRouterText.mockRejectedValue(new Error('OpenRouter API error'));

    const res = await app.request(
      '/api/schedule',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vegetableName: 'トマト', plantedAt: '2026-04-01' }),
      },
      testEnv,
    );

    expect(res.status).toBe(502);
    const body = await res.json() as { error: string };
    expect(body.error).toBe('AI_SERVICE_ERROR');
  });

  it('AI レスポンスのパースに失敗 → 502 を返す', async () => {
    mockCallOpenRouterText.mockResolvedValue('invalid json response');
    mockParseAiJsonResponse.mockImplementation(() => {
      throw new SyntaxError('Unexpected token');
    });

    const res = await app.request(
      '/api/schedule',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vegetableName: 'トマト', plantedAt: '2026-04-01' }),
      },
      testEnv,
    );

    expect(res.status).toBe(502);
    const body = await res.json() as { error: string };
    expect(body.error).toBe('AI_PARSE_ERROR');
  });
});
