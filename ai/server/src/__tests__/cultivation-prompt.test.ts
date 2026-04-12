import { describe, it, expect } from 'vitest';
import { buildCultivationPrompt } from '../prompts/cultivation';

describe('buildCultivationPrompt', () => {
  const baseQuery = {
    vegetableName: 'トマト',
    plantedAt: '2026-04-01',
  };

  it('プロンプトに vegetableName が含まれる', () => {
    const prompt = buildCultivationPrompt(baseQuery);
    expect(prompt).toContain('トマト');
  });

  it('プロンプトに plantedAt が含まれる', () => {
    const prompt = buildCultivationPrompt(baseQuery);
    expect(prompt).toContain('2026-04-01');
  });

  it('region が指定された場合はプロンプトに含まれる', () => {
    const prompt = buildCultivationPrompt({ ...baseQuery, region: '関東' });
    expect(prompt).toContain('関東');
  });

  it('memo が指定された場合はプロンプトに含まれる', () => {
    const prompt = buildCultivationPrompt({ ...baseQuery, memo: '有機栽培で育てたい' });
    expect(prompt).toContain('有機栽培で育てたい');
  });

  it('JSON フォーマットの指示が含まれる', () => {
    const prompt = buildCultivationPrompt(baseQuery);
    expect(prompt).toContain('JSON');
  });

  it('eventType の enum 値 "fertilizing" が含まれる', () => {
    const prompt = buildCultivationPrompt(baseQuery);
    expect(prompt).toContain('fertilizing');
  });

  it('eventType の enum 値 "pinching" が含まれる', () => {
    const prompt = buildCultivationPrompt(baseQuery);
    expect(prompt).toContain('pinching');
  });

  it('eventType の enum 値 "harvesting" が含まれる', () => {
    const prompt = buildCultivationPrompt(baseQuery);
    expect(prompt).toContain('harvesting');
  });

  it('eventType の enum 値 "watering" が含まれる', () => {
    const prompt = buildCultivationPrompt(baseQuery);
    expect(prompt).toContain('watering');
  });

  it('eventType の enum 値 "other" が含まれる', () => {
    const prompt = buildCultivationPrompt(baseQuery);
    expect(prompt).toContain('other');
  });

  it('brand が指定された場合はプロンプトに含まれる', () => {
    const prompt = buildCultivationPrompt({ ...baseQuery, brand: 'サントリー本気野菜' });
    expect(prompt).toContain('サントリー本気野菜');
  });

  it('brand が省略された場合でもプロンプトが生成される', () => {
    const prompt = buildCultivationPrompt(baseQuery);
    expect(typeof prompt).toBe('string');
    expect(prompt.length).toBeGreaterThan(0);
  });

  it('region が省略された場合でもプロンプトが生成される', () => {
    const prompt = buildCultivationPrompt(baseQuery);
    expect(typeof prompt).toBe('string');
    expect(prompt.length).toBeGreaterThan(0);
  });

  it('特殊文字を含む vegetableName は XML エスケープされる', () => {
    const prompt = buildCultivationPrompt({ ...baseQuery, vegetableName: '<トマト&キュウリ>' });
    expect(prompt).not.toContain('<トマト&キュウリ>');
    expect(prompt).toContain('&lt;トマト&amp;キュウリ&gt;');
  });
});
