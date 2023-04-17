import { ZodType, z } from 'zod';
import IQuestion from '../interfaces/IQuestion';

const questionSchema: ZodType<IQuestion[]> = z.array(z.object({
  question: z.string().min(2),
  correctAnswer: z.string().min(2),
  incorrectAnswers: z.array(z.string()),
  category: z.enum(['node.js', 'react', 'python']),
}));

export default questionSchema;
