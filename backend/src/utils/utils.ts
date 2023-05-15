import { BadRequestException } from '@nestjs/common';
import md5 from 'md5';
import { isValidObjectId } from 'mongoose';

export class Utils {
  public static getHash(string: string): string {
    const hash: string = md5(string);
    return hash;
  }

  public static validateObjectId(_id: unknown): void {
    if (!isValidObjectId(_id)) {
      throw new BadRequestException('id must have 24 hexadecimal characters.');
    }
  }
}
