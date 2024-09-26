import { TRPCClientError } from "@trpc/client";
import { AppRouter } from "@/server/trpc/root";
import { CustomException } from "@/types/cutom-exception";

export function transformTRPCError(error: unknown): CustomException {
  if (error instanceof TRPCClientError) {
    if (error.data?.zodError) {
      // If it's a Zod validation error
      const fieldErrors = Object.entries(error.data.zodError.fieldErrors).map(
        ([path, messages]) => ({
          path: [path],
          message: messages?.[0] || "Invalid input",
        }),
      );
      return new CustomException(400, error.message, fieldErrors);
    } else {
      // For other types of TRPC errors
      return new CustomException(error.data?.httpStatus || 500, error.message, []);
    }
  }
  // For non-TRPC errors
  return new CustomException(500, "An unexpected error occurred", []);
}
