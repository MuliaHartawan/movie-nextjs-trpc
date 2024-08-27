import { CustomError } from "@/types/cutom-error";

export function serviceUnavailableException(message: string): CustomError {
  return {
    errorType: "ServiceUnavailableException",
    message,
    errorCode: 503,
    instance: new Error("ServiceUnavailableException"),
  };
}
