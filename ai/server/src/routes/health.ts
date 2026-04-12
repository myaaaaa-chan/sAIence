import { Hono } from 'hono';
import type { Env } from '../types/env';

const health = new Hono<{ Bindings: Env }>();

health.get('/api/health', (c) => {
  return c.json({ status: 'ok' });
});

export { health };
