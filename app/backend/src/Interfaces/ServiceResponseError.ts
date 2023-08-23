export type ServiceMessage = { message: string };

type ServiceResErrorType = 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT';

export type ServiceResError = {
  status: ServiceResErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL' | 'OK',
  data: T
};

export type ServiceResponseError<T> = ServiceResError | ServiceResponseSuccess<T>;
