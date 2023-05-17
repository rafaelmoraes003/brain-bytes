import { Question } from 'src/schemas/question';
import { ZodType, z } from 'zod';

export const questionSchema: ZodType<Question> = z.object({
  question: z.string().min(3),
  correctAnswer: z.string().min(3),
  incorrectAnswers: z.array(z.string()).min(3),
  category: z.enum(['node.js', 'java', 'python', 'golang', 'react']),
});
