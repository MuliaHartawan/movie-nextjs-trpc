import { CustomError } from "@/types/cutom-error";

export function forbiddenException(message: string): CustomError {
  return {
    errorType: "ForbiddenException",
    message,
    errorCode: 403,
    instance: new Error("ForbiddenException"),
  };
}
