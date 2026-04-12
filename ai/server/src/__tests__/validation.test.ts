import { describe, it, expect } from 'vitest';
import { cultivationQuerySchema, photoAdviceRequestSchema } from '../middleware/validation';

describe('cultivationQuerySchema', () => {
  it('有効なデータ（必須項目のみ）を受け入れる', () => {
    const result = cultivationQuerySchema.safeParse({
      vegetableName: 'トマト',
      plantedAt: '2026-04-01',
    });
    expect(result.success).toBe(true);
  });

  it('有効なデータ（任意項目含む）を受け入れる', () => {
    const result = cultivationQuerySchema.safeParse({
      vegetableName: 'トマト',
      plantedAt: '2026-04-01',
      region: '関東',
      memo: '有機栽培で育てたい',
    });
    expect(result.success).toBe(true);
  });

  it('brand を含む有効なデータを受け入れる', () => {
    const result = cultivationQuerySchema.safeParse({
      vegetableName: 'トマト',
      plantedAt: '2026-04-01',
      brand: 'サントリー本気野菜',
    });
    expect(result.success).toBe(true);
  });

  it('vegetableName が空文字列 → 失敗', () => {
    const result = cultivationQuerySchema.safeParse({
      vegetableName: '',
      plantedAt: '2026-04-01',
    });
    expect(result.success).toBe(false);
  });

  it('vegetableName が51文字 → 失敗', () => {
    const result = cultivationQuerySchema.safeParse({
      vegetableName: 'あ'.repeat(51),
      plantedAt: '2026-04-01',
    });
    expect(result.success).toBe(false);
  });

  it('vegetableName が50文字 → 成功', () => {
    const result = cultivationQuerySchema.safeParse({
      vegetableName: 'あ'.repeat(50),
      plantedAt: '2026-04-01',
    });
    expect(result.success).toBe(true);
  });

  it('plantedAt が YYYY-MM-DD 形式でない → 失敗', () => {
    const result = cultivationQuerySchema.safeParse({
      vegetableName: 'トマト',
      plantedAt: '2026/04/01',
    });
    expect(result.success).toBe(false);
  });

  it('plantedAt が "2026-4-1" 形式 → 失敗', () => {
    const result = cultivationQuerySchema.safeParse({
      vegetableName: 'トマト',
      plantedAt: '2026-4-1',
    });
    expect(result.success).toBe(false);
  });

  it('plantedAt が "20260401" 形式 → 失敗', () => {
    const result = cultivationQuerySchema.safeParse({
      vegetableName: 'トマト',
      plantedAt: '20260401',
    });
    expect(result.success).toBe(false);
  });
});

describe('photoAdviceRequestSchema', () => {
  const validBase64 = 'dGVzdA=='; // "test" in base64

  it('有効なデータ（image/jpeg）を受け入れる', () => {
    const result = photoAdviceRequestSchema.safeParse({
      vegetableName: 'トマト',
      imageBase64: validBase64,
      mimeType: 'image/jpeg',
    });
    expect(result.success).toBe(true);
  });

  it('有効なデータ（image/png）を受け入れる', () => {
    const result = photoAdviceRequestSchema.safeParse({
      vegetableName: 'トマト',
      imageBase64: validBase64,
      mimeType: 'image/png',
    });
    expect(result.success).toBe(true);
  });

  it('有効なデータ（image/webp）を受け入れる', () => {
    const result = photoAdviceRequestSchema.safeParse({
      vegetableName: 'トマト',
      imageBase64: validBase64,
      mimeType: 'image/webp',
    });
    expect(result.success).toBe(true);
  });

  it('userComment を含む有効なデータを受け入れる', () => {
    const result = photoAdviceRequestSchema.safeParse({
      vegetableName: 'トマト',
      imageBase64: validBase64,
      mimeType: 'image/jpeg',
      userComment: '葉が黄色くなっています',
    });
    expect(result.success).toBe(true);
  });

  it('mimeType が無効 → 失敗', () => {
    const result = photoAdviceRequestSchema.safeParse({
      vegetableName: 'トマト',
      imageBase64: validBase64,
      mimeType: 'image/gif',
    });
    expect(result.success).toBe(false);
  });

  it('imageBase64 が空 → 失敗', () => {
    const result = photoAdviceRequestSchema.safeParse({
      vegetableName: 'トマト',
      imageBase64: '',
      mimeType: 'image/jpeg',
    });
    expect(result.success).toBe(false);
  });

  it('vegetableName が空 → 失敗', () => {
    const result = photoAdviceRequestSchema.safeParse({
      vegetableName: '',
      imageBase64: validBase64,
      mimeType: 'image/jpeg',
    });
    expect(result.success).toBe(false);
  });
});
