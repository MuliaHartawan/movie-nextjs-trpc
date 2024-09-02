export class CustomException extends Error {
  errorCode: number;
  message: string;
  name: string;
  errors?: string[]; // Has field errors

  constructor(errorCode: number, message: string, errors: string[]) {
    super(message);
    this.errorCode = errorCode;
    this.errors = errors;
    this.message = message;
    this.name = "CustomException";
  }
}
