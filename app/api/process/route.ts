import { NextResponse } from 'next/server'
import sharp from 'sharp'
import path from 'path'

export async function POST(request: Request) {
  const { id, brightness, contrast } = await request.json()

  try {
    const inputPath = path.join(process.cwd(), 'public', 'uploads', `${id}.png`)
    const outputPath = path.join(process.cwd(), 'public', 'uploads', `processed_${id}.png`)

    await sharp(inputPath)
      .modulate({
        brightness: brightness / 100,
        contrast: contrast / 100,
      })
      .toFile(outputPath)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing image:', error)
    return NextResponse.json({ error: 'Error processing image' }, { status: 500 })
  }
}

