import { Hono } from 'hono';
import type { PhotoAdviceResponse } from '../types/shared';
import type { Env } from '../types/env';
import { photoAdviceRequestSchema } from '../middleware/validation';
import { buildPhotoAdvicePrompt } from '../prompts/photo-advice';
import { callOpenRouterMultimodal, parseAiJsonResponse } from '../services/openrouter';

const advice = new Hono<{ Bindings: Env }>();

advice.post('/api/advice', async (c) => {
  const body = await c.req.json();
  const parsed = photoAdviceRequestSchema.safeParse(body);

  if (!parsed.success) {
    return c.json(
      { error: 'VALIDATION_ERROR', message: parsed.error.issues.map((i) => i.message).join(', '), statusCode: 400 },
      400,
    );
  }

  const { vegetableName, imageBase64, mimeType, userComment } = parsed.data;
  const prompt = buildPhotoAdvicePrompt(vegetableName, userComment);

  let raw: string;
  try {
    raw = await callOpenRouterMultimodal(c.env.OPENROUTER_API_KEY, prompt, imageBase64, mimeType, c.env.OPENROUTER_MODEL);
  } catch {
    return c.json(
      { error: 'AI_SERVICE_ERROR', message: 'アドバイス生成に失敗しました。しばらく時間をおいて再度お試しください。', statusCode: 502 },
      502,
    );
  }

  let result: PhotoAdviceResponse;
  try {
    result = parseAiJsonResponse<PhotoAdviceResponse>(raw);
  } catch {
    return c.json(
      { error: 'AI_PARSE_ERROR', message: 'AIレスポンスの解析に失敗しました。再度お試しください。', statusCode: 502 },
      502,
    );
  }

  return c.json(result);
});

export { advice };
