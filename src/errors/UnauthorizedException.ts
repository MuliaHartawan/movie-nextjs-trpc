import { CustomException } from "@/types/cutom-exception";

export class UnauthorizedException extends CustomException {
  constructor(message: string) {
    super(401, message, []);
    this.name = "UnauthorizedException";
  }
}

export default UnauthorizedException;
