import { ObjectId, isValidObjectId } from 'mongoose';
import CustomError from './CustomError';
import HTTPCodes from '../enum/HTTPCodes';

const validateObjectId = (_id: ObjectId): void => {
  if (!isValidObjectId(_id)) {
    throw new CustomError(
      'Id must have 24 hexadecimal characters',
      HTTPCodes.BAD_REQUEST,
    );
  }
};

export default validateObjectId;
