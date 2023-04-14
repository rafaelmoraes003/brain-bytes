import HTTPCodes from '../enum/HTTPCodes';

interface ServiceResponse<T> {
  code: HTTPCodes,
  data: T,
}

export default ServiceResponse;
