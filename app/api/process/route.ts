import { NextResponse } from "next/server"
import sharp from "sharp"
import path from "path"
import fs from "fs/promises"

export async function POST(request: Request) {
  const { id, brightness, contrast, isColor } = await request.json()

  if (!id) {
    return NextResponse.json({ error: "No image ID provided" }, { status: 400 })
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads")
  const inputPath = path.join(uploadsDir, `${id}.png`)
  const outputPath = path.join(uploadsDir, `processed_${id}.png`)

  try {
    // Check if input file exists
    await fs.access(inputPath)

    // Start with the base image processing
    let imageProcessor = sharp(inputPath)

    // Apply grayscale if not in color mode
    if (!isColor) {
      imageProcessor = imageProcessor.grayscale()
    }

   // Apply brightness adjustments
    imageProcessor = imageProcessor.modulate({
      brightness: Number.parseFloat(brightness) / 100 + 1,
    });

    // Apply contrast adjustments using .linear()
    const contrastFactor = Number.parseFloat(contrast) / 100 + 1;
    imageProcessor = imageProcessor.linear(contrastFactor);

    // Save the processed image
    await imageProcessor.toFile(outputPath)

    return NextResponse.json({ success: true, id })
  } catch (error) {
    console.error("Error processing image:", error)
    return NextResponse.json(
      {
        error: "Error processing image",
        details: (error as Error).message,
      },
      { status: 500 },
    )
  }
}

