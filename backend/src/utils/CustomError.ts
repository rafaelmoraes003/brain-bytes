import HTTPCodes from '../enum/HTTPCodes';

class CustomError extends Error {
  public statusCode: HTTPCodes;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default CustomError;
