import { NextResponse } from "next/server"
import sharp from "sharp"
import { v4 as uuidv4 } from "uuid"
import path from "path"
import fs from "fs/promises"

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
  }

  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), "public", "uploads")
  try {
    await fs.mkdir(uploadsDir, { recursive: true })
  } catch (error) {
    console.error("Error creating uploads directory:", error)
    return NextResponse.json({ error: "Failed to create uploads directory" }, { status: 500 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const id = uuidv4()
  const filename = `${id}.png`

  try {
    // Process the image with simpler transformations
    const sharpImage = sharp(buffer)

    // Save original size with basic enhancements
    await sharpImage
      .clone()
      .greyscale() // Convert to grayscale
      .normalize() // Normalize the image
      .sharpen() // Sharpen the image
      .toFile(path.join(uploadsDir, filename))

    // Save thumbnail
    await sharpImage
      .clone()
      .greyscale()
      .normalize()
      .sharpen()
      .resize(300)
      .toFile(path.join(uploadsDir, `thumb_${filename}`))

    return NextResponse.json({ id })
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

