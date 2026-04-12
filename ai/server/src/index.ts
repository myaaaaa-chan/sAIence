import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './types/env';
import { health } from './routes/health';
import { schedule } from './routes/schedule';
import { advice } from './routes/advice';

const app = new Hono<{ Bindings: Env }>();

// CORS — 環境変数でオリジンを制御。モバイル専用なら CORS_ORIGIN を空のままにしてすべて拒否
app.use('*', cors({
  origin: (origin, c) => {
    const allowed = c.env.CORS_ORIGIN;
    if (!allowed) return '';
    const origins = allowed.split(',').map((s: string) => s.trim());
    return origins.includes(origin) ? origin : '';
  },
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
}));

// Global error handler — never leak internal details
app.onError((err, c) => {
  console.error('Unhandled error:', err.message);
  return c.json(
    { error: 'INTERNAL_ERROR', message: 'サーバー内部エラーが発生しました。', statusCode: 500 },
    500,
  );
});

// Routes
app.route('/', health);
app.route('/', schedule);
app.route('/', advice);

export default app;
