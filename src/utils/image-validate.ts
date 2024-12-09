import path from "path";
import NotFoundException from "../errors/NotFoundException";
import BadRequestException from "../errors/BadRequestException";

// List of allowed image extensions
const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"] as const;

/**
 * Validates the file by checking its type and ensuring it has an allowed extension.
 * @param file - The file to be validated
 * @returns {boolean} - Returns true if the file extension is allowed, otherwise false.
 * @throws {BadRequestException} - Throws an error if the file extension is invalid.
 */
export const validateImageFileExtension = (file: File): boolean => {
  const fileExtension = path.extname(file.name).toLowerCase();
  if (!ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension as any)) {
    throw new BadRequestException("Invalid file extension. Only image files are allowed.");
  }
  return true;
};

/**
 *
 * @param file - The file object to be checked for content.
 * @returns {boolean} - Returns `true` if the file is not empty (size > 0), otherwise throws an error.
 * @throws {NotFoundException} - Throws an error if the file is empty or not provided.
 */
export const validateImageFileNotEmpty = (file: File): boolean => {
  const sizeImageEmpty = 0;
  if (!file || file.size === sizeImageEmpty) {
    throw new NotFoundException("No file uploaded or file is empty");
  }
  return true;
};

/**
 * Utility function to check if the file is valid and is an image.
 * This combines the file validation and extension validation.
 * @param file - The file object to be validated (it must be an image and non-empty).
 * @throws {BadRequestException | NotFoundException} - Throws an error if the file is empty or the extension is invalid.
 */
export const validateImageFile = (file: File): void => {
  validateImageFileNotEmpty(file);
  validateImageFileExtension(file);
};
