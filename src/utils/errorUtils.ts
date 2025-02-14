import logger from './logger';

export interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const formatErrorMessage = (error: ErrorResponse | Error): string => {
  if ((error as ErrorResponse).response?.data?.message) {
    return (error as ErrorResponse).response?.data?.message ?? 'An unknown error occurred';
  }
  if (error instanceof TypeError) {
    return `Type Error: ${error.message}`;
  }
  if (error instanceof SyntaxError) {
    return `Syntax Error: ${error.message}`;
  }
  if (error instanceof RangeError) {
    return `Range Error: ${error.message}`;
  }
  if (error instanceof ReferenceError) {
    return `Reference Error: ${error.message}`;
  }
  return error.message ?? 'An unknown error occurred';
};

export const handleAsyncError = (error: ErrorResponse | Error) => {
  // Log the error
  logger.error(error);

  // Format the error message
  return formatErrorMessage(error);
};
