import { ZodError, ZodType } from "zod";
import BadRequestException from "../errors/BadRequestException";

/**
 * Validates the provided data against the given Zod schema.
 *
 * @param {ZodType<T>} schema - The Zod schema to validate the data against.
 * @param {T} data - The data to be validated.
 * @returns {Promise<T | void>} - A promise that resolves to the validated data if valid, or throws a BadRequestException if invalid.
 * @throws {BadRequestException} - Throws an exception if the data is invalid, containing the validation errors.
 */
export const validate = async <T>(schema: ZodType<T>, data: T): Promise<T | void> => {
  return schema.parseAsync(data).catch((error) => {
    if (error instanceof ZodError) {
      const zodErrors = error.errors;
      const errorMessage = zodErrors.at(0)?.message;

      throw new BadRequestException(
        errorMessage ?? "Invalid input data",
        zodErrors.map(({ path, message }) => ({ path, message })),
      );
    }
  });
};
