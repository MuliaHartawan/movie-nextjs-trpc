import { ZodError, ZodType } from "zod";
import BadRequestException from "../errors/BadRequestException";

export const validate = async <T>(schema: ZodType<T>, data: T): Promise<T | void> => {
  return schema.parseAsync(data).catch((error) => {
    if (error instanceof ZodError) {
      const zodError = error.errors;
      const errorMessage = zodError.at(0)?.message;
      const mapZodErrorPath = zodError.map((err) => {
        return err.path.toString();
      });

      throw new BadRequestException(errorMessage ?? "Invalid input data", [
        { path: mapZodErrorPath, message: errorMessage ?? "Invalid input data" },
      ]);
    }
  });
};
