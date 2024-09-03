export class CustomException extends Error {
  errorCode: number;
  message: string;
  name: string;
  errors?: Array<FieldErrorType>; // Has field errors

  constructor(errorCode: number, message: string, errors: Array<FieldErrorType>) {
    super(message);
    this.errorCode = errorCode;
    this.errors = errors;
    this.message = message;
    this.name = "CustomException";
  }
}

export type FieldErrorType = {
  path: string[];
};
