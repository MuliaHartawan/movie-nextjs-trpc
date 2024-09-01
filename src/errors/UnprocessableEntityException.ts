import { CustomException } from "@/types/cutom-exception";

export class UnprocessableEntityException extends CustomException {
  constructor(message: string, errors?: string[]) {
    super(422, message, errors || []);
    this.name = "UnprocessableEntityException";
  }
}

export default UnprocessableEntityException;
