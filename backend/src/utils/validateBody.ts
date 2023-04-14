import { SafeParseReturnType, ZodError, ZodIssue, ZodType } from 'zod';
import CustomError from './CustomError';
import HTTPCodes from '../enum/HTTPCodes';

const validateBody = (validator: ZodType, body: unknown): void => {
  const bodyValidation: SafeParseReturnType<unknown, ZodError> = validator.safeParse(body);
  let errorMessage: string;

  if (!bodyValidation.success) {
    const error: ZodIssue = bodyValidation.error.issues[0];
    errorMessage = `${error.path[0]} - ${error.message}`;
    throw new CustomError(errorMessage, HTTPCodes.SEMANTIC_ERROR);
  }
};

export default validateBody;
