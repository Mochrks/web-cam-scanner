import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs/promises'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('file') as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${uuidv4()}.png`

  try {
    const sharpImage = sharp(buffer)
    const metadata = await sharpImage.metadata()

    // Enhance image
    const enhancedImage = sharpImage
      .removeAlpha()
      .normalize()
      .sharpen()
      .threshold(128)
      .toColorspace('b-w')

    // Save original size
    await enhancedImage.clone().toFile(path.join(process.cwd(), 'public', 'uploads', filename))

    // Save thumbnail
    await enhancedImage
      .clone()
      .resize(300)
      .toFile(path.join(process.cwd(), 'public', 'uploads', `thumb_${filename}`))

    return NextResponse.json({ id: filename.split('.')[0] })
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json({ error: 'Error processing image' }, { status: 500 })
  }
}

