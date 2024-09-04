import { CustomException, FieldErrorType } from "@/types/cutom-exception";

export class InternalServerErrorException extends CustomException {
  constructor(message: string, errors?: Array<FieldErrorType>) {
    super(500, message, errors || []);
    this.name = "InternalServerErrorException";
  }
}

export default InternalServerErrorException;
