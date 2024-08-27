export type CustomError = {
  errorType: string;
  message: string;
  errorCode: number;
  instance: Error;
};
