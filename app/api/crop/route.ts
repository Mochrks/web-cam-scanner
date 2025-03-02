import { NextResponse } from "next/server"
import sharp from "sharp"
import path from "path"
import fs from "fs/promises"

interface Point {
  x: number
  y: number
}

interface CropRequest {
  id: string
  points: Point[]
  rotation: number
}

export async function POST(request: Request) {
  const { id, points, rotation } = (await request.json()) as CropRequest

  if (!id || !points || points.length !== 4) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads")
  const inputPath = path.join(uploadsDir, `${id}.png`)
  const tempPath = path.join(uploadsDir, `temp_${id}.png`)

  try {
    // Get the image metadata
   const metadata: sharp.Metadata | null = await sharp(inputPath).metadata();
  if (!metadata || !metadata.width || !metadata.height) {
    throw new Error("Unable to get image dimensions");
  }

  // Convert normalized points to actual pixel coordinates
  const actualPoints = points.map((point) => ({
    x: Math.round(point.x * metadata.width!), // Gunakan ! untuk meyakinkan TypeScript
    y: Math.round(point.y * metadata.height!), // Gunakan ! untuk meyakinkan TypeScript
  }));

    // Process the image
    await sharp(inputPath)
      // First rotate if needed
      .rotate(rotation)
      // Then apply perspective transformation
      .extract({
        left: Math.min(...actualPoints.map((p) => p.x)),
        top: Math.min(...actualPoints.map((p) => p.y)),
        width: Math.max(...actualPoints.map((p) => p.x)) - Math.min(...actualPoints.map((p) => p.x)),
        height: Math.max(...actualPoints.map((p) => p.y)) - Math.min(...actualPoints.map((p) => p.y)),
      })
      .toFile(tempPath)

    // Replace the original file with the cropped version
    await fs.rename(tempPath, inputPath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error cropping image:", error)
    return NextResponse.json(
      {
        error: "Error cropping image",
        details: (error as Error).message,
      },
      { status: 500 },
    )
  }
}

