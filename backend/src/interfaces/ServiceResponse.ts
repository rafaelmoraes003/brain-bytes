import HTTPCodes from '../enum/HTTPCodes';

interface ServiceResponse<T = undefined> {
  code: HTTPCodes,
  data?: T,
}

export default ServiceResponse;
