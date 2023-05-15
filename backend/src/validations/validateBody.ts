import { UnprocessableEntityException } from '@nestjs/common';
import { SafeParseReturnType, ZodError, ZodIssue, ZodType } from 'zod';

export const validateBody = (validator: ZodType, body: unknown): void => {
  const parsedObject: SafeParseReturnType<unknown, ZodError> = validator.safeParse(body);
  let errorMessage: string;

  if (!parsedObject.success) {
    const error: ZodIssue = parsedObject.error.issues[0];
    errorMessage = `${error.path[0]} - ${error.message}`;
    throw new UnprocessableEntityException(errorMessage);
  }
};
