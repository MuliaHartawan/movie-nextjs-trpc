import { CustomError } from "@/types/cutom-error";

export function notFoundException(message: string): CustomError {
  return {
    errorType: "NotFoundException",
    message,
    errorCode: 400,
    stack: new Error().stack,
  };
}
