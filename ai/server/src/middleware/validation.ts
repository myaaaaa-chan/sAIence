import { z } from 'zod';

const MAX_VEGETABLE_NAME_LENGTH = 50;
const MAX_REGION_LENGTH = 50;
const MAX_MEMO_LENGTH = 500;
const MAX_USER_COMMENT_LENGTH = 1000;
// 10MB Base64 limit (~7.5MB raw image)
const MAX_IMAGE_BASE64_LENGTH = 10 * 1024 * 1024;

const MAX_BRAND_LENGTH = 100;

export const cultivationQuerySchema = z.object({
  vegetableName: z.string().min(1).max(MAX_VEGETABLE_NAME_LENGTH),
  plantedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'ISO 8601 date format required (YYYY-MM-DD)'),
  seedingType: z.enum(['seedling', 'seed']).optional(),
  region: z.string().max(MAX_REGION_LENGTH).optional(),
  brand: z.string().max(MAX_BRAND_LENGTH).optional(),
  memo: z.string().max(MAX_MEMO_LENGTH).optional(),
});

export const photoAdviceRequestSchema = z.object({
  vegetableName: z.string().min(1).max(MAX_VEGETABLE_NAME_LENGTH),
  imageBase64: z.string().min(1).max(MAX_IMAGE_BASE64_LENGTH),
  mimeType: z.enum(['image/jpeg', 'image/png', 'image/webp']),
  userComment: z.string().max(MAX_USER_COMMENT_LENGTH).optional(),
});
