import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  preferences: z.object({
    theme: z.enum(['light', 'dark', 'system']).optional(),
    notifications: z.boolean().optional(),
    privacy: z.enum(['public', 'private']).optional(),
  }).optional(),
});

export function validateUserData(data: unknown) {
  return userSchema.safeParse(data);
}