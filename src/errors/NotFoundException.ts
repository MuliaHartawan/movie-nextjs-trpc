import { CustomError } from "@/types/cutom-error";

export function notFoundException(message: string): CustomError {
  return {
    errorType: "NotFoundException",
    message,
    errorCode: 404,
    instance: new Error("NotFoundException"),
  };
}
