import { CustomException } from "@/types/cutom-exception";

export class InternalServerErrorException extends CustomException {
  constructor(message: string) {
    super(500, message, []);
    this.name = "InternalServerErrorException";
  }
}

export default InternalServerErrorException;
