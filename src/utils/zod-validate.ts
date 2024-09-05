import { ZodError, ZodType } from "zod";
import BadRequestException from "../errors/BadRequestException";

export const validate = async <T>(schema: ZodType<T>, data: T): Promise<T | void> => {
  return schema.parseAsync(data).catch((error) => {
    if (error instanceof ZodError) {
      const zodErrors = error.errors;
      const errorMessage = zodErrors.at(0)?.message;
      const mapZodErrorPath = zodErrors.map((err) => {
        return err.path.toString();
      });

      throw new BadRequestException(errorMessage ?? "Invalid input data", [
        { path: mapZodErrorPath, message: errorMessage ?? "Invalid input data" },
      ]);
    }
  });
};
