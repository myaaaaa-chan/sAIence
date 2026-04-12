const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const DEFAULT_MODEL = 'anthropic/claude-sonnet-4-20250514';
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 1000;

type TextMessage = {
  role: 'user';
  content: string;
};

type MultimodalMessage = {
  role: 'user';
  content: Array<
    | { type: 'text'; text: string }
    | { type: 'image_url'; image_url: { url: string } }
  >;
};

type ChatMessage = TextMessage | MultimodalMessage;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(
  apiKey: string,
  messages: ChatMessage[],
  model: string,
): Promise<string> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
      await sleep(delay);
    }

    try {
      console.log(`[openrouter] attempt=${attempt + 1}/${MAX_RETRIES} model=${model}`);
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
        }),
      });

      console.log(`[openrouter] response status=${response.status}`);

      if (!response.ok) {
        const status = response.status;
        const errorBody = await response.text().catch(() => '(failed to read body)');
        console.error(`[openrouter] error response status=${status} body=${errorBody}`);
        // Retry on 429 (rate limit) and 5xx (server errors)
        if (status === 429 || status >= 500) {
          lastError = new Error(`OpenRouter API returned ${status}: ${errorBody}`);
          continue;
        }
        throw new Error(`OpenRouter API request failed with status ${status}: ${errorBody}`);
      }

      const data = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
        error?: { message?: string; code?: number };
      };

      if (data.error) {
        console.error(`[openrouter] API-level error: ${JSON.stringify(data.error)}`);
        throw new Error(`OpenRouter API error: ${data.error.message ?? JSON.stringify(data.error)}`);
      }

      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        console.error(`[openrouter] empty content, full response: ${JSON.stringify(data)}`);
        throw new Error('OpenRouter API returned empty content');
      }
      console.log(`[openrouter] success content_length=${content.length}`);
      return content;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`[openrouter] caught error attempt=${attempt + 1}: ${lastError.message}`);
      // Only retry on network errors or retryable status codes
      if (attempt < MAX_RETRIES - 1) {
        continue;
      }
    }
  }

  throw lastError ?? new Error('OpenRouter API request failed');
}

export function parseAiJsonResponse<T>(raw: string): T {
  // Extract JSON from possible markdown code fences
  const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const jsonStr = jsonMatch ? jsonMatch[1].trim() : raw.trim();
  return JSON.parse(jsonStr) as T;
}

export async function callOpenRouterText(
  apiKey: string,
  prompt: string,
  model: string = DEFAULT_MODEL,
): Promise<string> {
  return fetchWithRetry(apiKey, [{ role: 'user', content: prompt }], model);
}

export async function callOpenRouterMultimodal(
  apiKey: string,
  prompt: string,
  imageBase64: string,
  mimeType: string,
  model: string = DEFAULT_MODEL,
): Promise<string> {
  return fetchWithRetry(
    apiKey,
    [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt },
          {
            type: 'image_url',
            image_url: { url: `data:${mimeType};base64,${imageBase64}` },
          },
        ],
      },
    ],
    model,
  );
}
