import { CustomException } from "@/types/cutom-exception";

export class NotFoundException extends CustomException {
  constructor(message: string) {
    super(404, message, []);
    this.name = "NotFoundException";
  }
}

export default NotFoundException;
