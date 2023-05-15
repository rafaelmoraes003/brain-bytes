import { UnprocessableEntityException } from '@nestjs/common';
import md5 from 'md5';
import { SafeParseReturnType, ZodType } from 'zod';

export class Utils {
  public static getHash(string: string): string {
    const hash: string = md5(string);
    return hash;
  }

  public static validateBody(validator: ZodType, body: unknown) {
    const parsedObject: SafeParseReturnType<ZodType, unknown> = validator.safeParse(body);
    let errorMessage: string;

    if (!parsedObject.success) {
      const error = parsedObject.error.issues[0];
      errorMessage = `${error.path[0]} - ${error.message}`;
      throw new UnprocessableEntityException(errorMessage);
    }
  }
}