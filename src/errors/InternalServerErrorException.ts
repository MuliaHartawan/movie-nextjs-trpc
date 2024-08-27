import { CustomError } from "@/types/cutom-error";

export function internalServerErrorException(message: string): CustomError {
  return {
    errorType: "InternalServerErrorException",
    message,
    errorCode: 500,
    instance: new Error("InternalServerErrorException"),
  };
}
