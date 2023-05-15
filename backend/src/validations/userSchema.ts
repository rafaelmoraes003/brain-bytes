import { ZodType, z } from 'zod';
import { User } from '../schemas/user';

export const userSchema: ZodType<Partial<User>> = z.object({
  username: z.string().min(3).max(12),
  password: z.string().min(6).max(5),
});