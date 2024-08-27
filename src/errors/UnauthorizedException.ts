import { CustomError } from "@/types/cutom-error";

export function unauthorizedException(message: string): CustomError {
  return {
    errorType: "UnauthorizedException",
    message,
    errorCode: 401,
    instance: new Error("UnauthorizedException"),
  };
}
