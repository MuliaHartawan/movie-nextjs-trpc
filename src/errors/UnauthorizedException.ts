import { CustomException, FieldErrorType } from "@/types/cutom-exception";

export class UnauthorizedException extends CustomException {
  constructor(message: string, errors?: Array<FieldErrorType>) {
    super(401, message, errors || []);
    this.name = "UnauthorizedException";
  }
}

export default UnauthorizedException;
