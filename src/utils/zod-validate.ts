import { ZodError, ZodType } from "zod";
import BadRequestException from "../errors/BadRequestException";

export const validate = async <T>(schema: ZodType<T>, data: T): Promise<T | void> => {
  return schema.parseAsync(data).catch((error) => {
    if (error instanceof ZodError) {
      const zodErrors = error.errors;
      const errorMessage = zodErrors.at(0)?.message;

      throw new BadRequestException(
        errorMessage ?? "Invalid input data",
        zodErrors.map((err) => {
          return {
            path: err.path,
            message: err.message,
          };
        }),
      );
    }
  });
};
