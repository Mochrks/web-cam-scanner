"use client"

import type React from "react"
import Image from 'next/image';
import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CropIcon, RotateCw } from "lucide-react"

interface Point {
    x: number
    y: number
}

interface CropToolProps {
    id: string
    onCropComplete: () => void
}

export function CropTool({ id, onCropComplete }: CropToolProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const [points, setPoints] = useState<Point[]>([])
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [loading, setLoading] = useState(false)

    // Initialize canvas with image
    const initCanvas = useCallback(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        const image = imageRef.current

        if (!canvas || !ctx || !image) return

        // Set canvas size to match image
        canvas.width = image.width
        canvas.height = image.height

        // Draw image
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.save()

        // Handle rotation
        if (rotation !== 0) {
            ctx.translate(canvas.width / 2, canvas.height / 2)
            ctx.rotate((rotation * Math.PI) / 180)
            ctx.translate(-canvas.width / 2, -canvas.height / 2)
        }

        ctx.drawImage(image, 0, 0)
        ctx.restore()

        // Initialize corner points if not set
        if (points.length === 0) {
            setPoints([
                { x: 50, y: 50 }, // Top-left
                { x: canvas.width - 50, y: 50 }, // Top-right
                { x: canvas.width - 50, y: canvas.height - 50 }, // Bottom-right
                { x: 50, y: canvas.height - 50 }, // Bottom-left
            ])
        }
    }, [rotation, points.length])

    // Draw crop overlay
    const drawOverlay = useCallback(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!ctx || points.length !== 4) return

        // Clear previous overlay
        initCanvas()

        // Draw semi-transparent overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(canvas!.width, 0)
        ctx.lineTo(canvas!.width, canvas!.height)
        ctx.lineTo(0, canvas!.height)
        ctx.closePath()

        // Cut out the crop area
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.closePath()
        ctx.fill()

        // Draw the crop lines
        ctx.strokeStyle = "#fff"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.closePath()
        ctx.stroke()

        // Draw corner points
        points.forEach((point, index) => {
            ctx.beginPath()
            ctx.arc(point.x, point.y, 10, 0, 2 * Math.PI)
            ctx.fillStyle = "#fff"
            ctx.fill()
            ctx.strokeStyle = "#000"
            ctx.lineWidth = 2
            ctx.stroke()
        })
    }, [points, initCanvas])

    // Handle mouse events
    const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = (e.clientX - rect.left) * (canvas.width / rect.width)
        const y = (e.clientY - rect.top) * (canvas.height / rect.height)

        // Find if we're clicking near a corner point
        const cornerIndex = points.findIndex((point) => {
            const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2))
            return distance < 20 // 20px radius for easier selection
        })

        if (cornerIndex !== -1) {
            setDraggingIndex(cornerIndex)
        }
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (draggingIndex === null) return

        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = (e.clientX - rect.left) * (canvas.width / rect.width)
        const y = (e.clientY - rect.top) * (canvas.height / rect.height)

        // Update point position
        const newPoints = [...points]
        newPoints[draggingIndex] = { x, y }
        setPoints(newPoints)
    }

    const handleMouseUp = () => {
        setDraggingIndex(null)
    }

    // Handle image load
    const handleImageLoad = () => {
        setImageLoaded(true)
        initCanvas()
    }

    // Rotate image
    const handleRotate = () => {
        setRotation((prev) => (prev + 90) % 360)
    }

    // Apply crop
    const handleCropComplete = async () => {
        if (!canvasRef.current) return

        setLoading(true)
        try {
            const canvas = canvasRef.current
            const normalizedPoints = points.map((point) => ({
                x: point.x / canvas.width,
                y: point.y / canvas.height,
            }))

            const response = await fetch("/api/crop", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    points: normalizedPoints,
                    rotation,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to crop image")
            }

            onCropComplete()
        } catch (error) {
            console.error("Error cropping image:", error)
        } finally {
            setLoading(false)
        }
    }

    // Update overlay when points change
    useEffect(() => {
        if (imageLoaded) {
            drawOverlay()
        }
    }, [imageLoaded, drawOverlay])

    // Update canvas when rotation changes
    useEffect(() => {
        if (imageLoaded) {
            initCanvas()
            drawOverlay()
        }
    }, [rotation, imageLoaded, drawOverlay, initCanvas])

    return (
        <div className="space-y-4">
            <Card className="p-4 overflow-hidden">
                <div className="relative" style={{ maxHeight: "70vh" }}>
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className="w-full h-auto cursor-crosshair"
                    />
                    <img
                        ref={imageRef}
                        src={`/uploads/${id}.png`}
                        alt={`Original image for cropping`}
                        onLoad={handleImageLoad}
                        className="hidden"
                    />
                </div>
            </Card>

            <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleRotate} className="gap-2">
                    <RotateCw className="w-4 h-4" />
                    Rotate
                </Button>
                <Button onClick={handleCropComplete} disabled={loading || points.length !== 4} className="gap-2">
                    <CropIcon className="w-4 h-4" />
                    {loading ? "Applying..." : "Apply Crop"}
                </Button>
            </div>
        </div>
    )
}

