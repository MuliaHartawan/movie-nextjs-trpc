import { storeMoviePoster } from "@/libs/attachment/image";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const result = await storeMoviePoster(file);

    if (result.success) {
      return NextResponse.json(
        {
          message: "File uploaded successfully",
          filePath: result.filePath,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
