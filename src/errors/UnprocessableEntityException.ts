import { CustomException, FieldErrorType } from "@/types/cutom-exception";

export class UnprocessableEntityException extends CustomException {
  constructor(message: string, errors?: Array<FieldErrorType>) {
    super(422, message, errors || []);
    this.name = "UnprocessableEntityException";
    this.errors = errors;
  }
}

export default UnprocessableEntityException;
