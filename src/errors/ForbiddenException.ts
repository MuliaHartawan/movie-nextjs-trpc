import { CustomException } from "@/types/cutom-exception";

export class ForbiddenException extends CustomException {
  constructor(message: string) {
    super(403, message, []);
    this.name = "ForbiddenException";
  }
}

export default ForbiddenException;
