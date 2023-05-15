import { BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import md5 from 'md5';
import { isValidObjectId } from 'mongoose';
import { SafeParseReturnType, ZodType } from 'zod';

export class Utils {
  public static getHash(string: string): string {
    const hash: string = md5(string);
    return hash;
  }

  public static validateBody(validator: ZodType, body: unknown): void {
    const parsedObject: SafeParseReturnType<ZodType, unknown> = validator.safeParse(body);
    let errorMessage: string;

    if (!parsedObject.success) {
      const error = parsedObject.error.issues[0];
      errorMessage = `${error.path[0]} - ${error.message}`;
      throw new UnprocessableEntityException(errorMessage);
    }
  }

  public static validateObjectId(_id: unknown): void {
    if (!isValidObjectId(_id)) {
      throw new BadRequestException('id must have 24 hexadecimal characters.');
    }
  }
}
