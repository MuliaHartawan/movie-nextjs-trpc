import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "posters");

export const saveMoviePoster = async (file: File): Promise<string> => {
  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const fileExtension = path.extname(file.name);
  const uniqueFileName = `${uuidv4()}${fileExtension}`;
  const filePath = path.join(UPLOAD_DIR, uniqueFileName);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  await fs.writeFile(filePath, buffer);

  return `/uploads/posters/${uniqueFileName}`;
};

export const deleteMoviePoster = async (posterPath: string): Promise<void> => {
  try {
    const fullPath = path.join(process.cwd(), "public", posterPath);
    await fs.unlink(fullPath);
  } catch (error) {
    console.error("Error deleting poster:", error);
  }
};
