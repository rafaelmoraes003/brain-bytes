import HTTPCodes from '../enum/HTTPCodes'
import CustomError from './CustomError'

const validateUser = (_id: string, userId: string) => {
  if (_id !== userId) {
    throw new CustomError("not able to do this action.", HTTPCodes.FORBIDDEN);
  }
};

export default validateUser;
