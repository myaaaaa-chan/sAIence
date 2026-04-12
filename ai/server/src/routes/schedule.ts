import { Hono } from 'hono';
import type { AiScheduleResponse } from '@saience/shared';
import type { Env } from '../types/env';
import { cultivationQuerySchema } from '../middleware/validation';
import { buildCultivationPrompt } from '../prompts/cultivation';
import { callOpenRouterText, parseAiJsonResponse } from '../services/openrouter';

const schedule = new Hono<{ Bindings: Env }>();

schedule.post('/api/schedule', async (c) => {
  const body = await c.req.json();
  const parsed = cultivationQuerySchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      { error: 'VALIDATION_ERROR', message: parsed.error.issues.map((i) => i.message).join(', '), statusCode: 400 },
      400,
    );
  }

  const prompt = buildCultivationPrompt(parsed.data);

  console.log(`[schedule] calling OpenRouter for vegetable=${parsed.data.vegetableName}`);

  let raw: string;
  try {
    raw = await callOpenRouterText(c.env.OPENROUTER_API_KEY, prompt, c.env.OPENROUTER_MODEL);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[schedule] AI_SERVICE_ERROR: ${message}`);
    return c.json(
      { error: 'AI_SERVICE_ERROR', message: 'スケジュール生成に失敗しました。しばらく時間をおいて再度お試しください。', statusCode: 502 },
      502,
    );
  }

  let result: AiScheduleResponse;
  try {
    result = parseAiJsonResponse<AiScheduleResponse>(raw);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[schedule] AI_PARSE_ERROR: ${message}`);
    console.error(`[schedule] raw response (first 500 chars): ${raw.slice(0, 500)}`);
    return c.json(
      { error: 'AI_PARSE_ERROR', message: 'AIレスポンスの解析に失敗しました。再度お試しください。', statusCode: 502 },
      502,
    );
  }

  return c.json(result);
});

export { schedule };
