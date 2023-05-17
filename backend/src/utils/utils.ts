import { BadRequestException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import md5 from 'md5';
import { isValidObjectId } from 'mongoose';
import { SafeParseReturnType, ZodType } from 'zod';
import { Categories } from '../types/Categories';

export class Utils {
  private static categories: Categories[] = [
    'node.js',
    'java',
    'python',
    'react',
    'golang',
  ];

  private static availableOperations: string[] = [
    'inc',
    'dec',
  ];

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
      throw new BadRequestException('invalid object id.');
    }
  }

  public static validateCategory(category: Categories): void {
    if (!Utils.categories.includes(category)) {
      throw new UnauthorizedException('unavailable category.');
    }
  }

  public static validateOperation(operation: string): void {
    if (!Utils.availableOperations.includes(operation)) {
      throw new UnauthorizedException('invalid operation.');
    }
  }
}
