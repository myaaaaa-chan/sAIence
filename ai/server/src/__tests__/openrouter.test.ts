import { describe, it, expect } from 'vitest';
import { parseAiJsonResponse } from '../services/openrouter';

describe('parseAiJsonResponse', () => {
  it('通常の JSON をパースする', () => {
    const raw = JSON.stringify({ foo: 'bar', num: 42 });
    const result = parseAiJsonResponse<{ foo: string; num: number }>(raw);
    expect(result).toEqual({ foo: 'bar', num: 42 });
  });

  it('マークダウンコードフェンス付き JSON をパースする (```json ... ```)', () => {
    const raw = '```json\n{"foo":"bar","num":42}\n```';
    const result = parseAiJsonResponse<{ foo: string; num: number }>(raw);
    expect(result).toEqual({ foo: 'bar', num: 42 });
  });

  it('コードフェンスなし (``` ... ```) をパースする', () => {
    const raw = '```\n{"foo":"bar","num":42}\n```';
    const result = parseAiJsonResponse<{ foo: string; num: number }>(raw);
    expect(result).toEqual({ foo: 'bar', num: 42 });
  });

  it('不正な JSON は例外をスローする', () => {
    const raw = 'これは JSON ではありません';
    expect(() => parseAiJsonResponse(raw)).toThrow();
  });

  it('複雑なネスト構造の JSON をパースする', () => {
    const data = {
      vegetableName: 'トマト',
      events: [
        { type: 'watering', title: '水やり', description: '毎日水をやる', scheduledDate: '2026-04-02' },
      ],
      notes: '補足',
    };
    const raw = JSON.stringify(data);
    const result = parseAiJsonResponse<typeof data>(raw);
    expect(result).toEqual(data);
  });

  it('コードフェンスの中に空白があっても正しくパースする', () => {
    const raw = '```json\n\n  {"foo":"bar"}\n\n```';
    const result = parseAiJsonResponse<{ foo: string }>(raw);
    expect(result).toEqual({ foo: 'bar' });
  });
});
