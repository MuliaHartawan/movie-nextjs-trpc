import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "posters");

export interface SaveFileResponse {
  success: boolean;
  filePath?: string;
  error?: string;
}

export const storeMoviePoster = async (file: File): Promise<SaveFileResponse> => {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    if (!file || file.size === 0) {
      return {
        success: false,
        error: "No file uploaded or file is empty",
      };
    }

    const fileExtension = path.extname(file.name);
    const uniqueFileName = `${uuidv4()}${fileExtension}`;
    const filePath = path.join(UPLOAD_DIR, uniqueFileName);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    await fs.writeFile(filePath, buffer);

    return {
      success: true,
      filePath: `/uploads/posters/${uniqueFileName}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
