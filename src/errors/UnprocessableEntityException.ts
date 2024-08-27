import { CustomError } from "@/types/cutom-error";

export function unprocessableEntityException(message: string): CustomError {
  return {
    errorType: "UnprocessableEntityException",
    message,
    errorCode: 422,
    stack: new Error().stack,
  };
}
