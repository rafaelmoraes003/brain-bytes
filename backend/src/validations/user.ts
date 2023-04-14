import { ZodType, z } from 'zod';
import IUser from '../interfaces/IUser';

const userSchema: ZodType<IUser> = z.object({
  username: z.string().min(3).max(12),
  password: z.string().min(3).max(15),
});

export default userSchema;
