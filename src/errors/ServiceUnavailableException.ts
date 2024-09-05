import { CustomException, FieldErrorType } from "@/types/cutom-exception";

export class ServiceUnavailableException extends CustomException {
  constructor(message: string, errors?: Array<FieldErrorType>) {
    super(503, message, errors || []);
    this.name = "ServiceUnavailableException";
  }
}

export default ServiceUnavailableException;
