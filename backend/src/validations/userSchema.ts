import { ZodType, z } from 'zod';

export const userSchema: ZodType = z.object({
  username: z.string().min(3).max(12),
  password: z.string().min(6).max(15),
});
