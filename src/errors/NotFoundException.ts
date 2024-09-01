import { CustomError, CustomException } from "@/types/cutom-error";

export class NotFoundException extends CustomException {
  constructor(message: string, errors?: string[]) {
    super(404, message, errors || []);
    this.name = "NotFoundException";
  }
}

export default NotFoundException;
