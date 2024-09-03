import { CustomException, FieldErrorType } from "@/types/cutom-exception";

export class NotFoundException extends CustomException {
  constructor(message: string, errors?: Array<FieldErrorType>) {
    super(404, message, errors || []);
    this.name = "NotFoundException";
    this.errors = errors;
  }
}

export default NotFoundException;
