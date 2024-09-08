import { CustomException } from "@/types/cutom-exception";

export class ServiceUnavailableException extends CustomException {
  constructor(message: string) {
    super(503, message, []);
    this.name = "ServiceUnavailableException";
  }
}

export default ServiceUnavailableException;
