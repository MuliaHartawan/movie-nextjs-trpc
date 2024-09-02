import { CustomException } from "@/types/cutom-exception";

export class ForbiddenException extends CustomException {
  constructor(message: string, errors?: string[]) {
    super(403, message, errors || []);
    this.name = "ForbiddenException";
  }
}

export default ForbiddenException;
