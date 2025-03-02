"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface PreviewImageProps {
    src: string
    alt: string
    width: number
    height: number
    className?: string
    brightness?: number
    contrast?: number
    isColor?: boolean
}

export function PreviewImage({
    src,
    alt,
    width,
    height,
    className = "",
    brightness = 0,
    contrast = 0,
    isColor = false,
}: PreviewImageProps) {
    const [style, setStyle] = useState({})

    useEffect(() => {
        // Convert our -100 to 100 range to appropriate CSS filter values
        const brightnessValue = 1 + brightness / 100
        const contrastValue = 1 + contrast / 100
        const grayscaleValue = isColor ? 0 : 1

        setStyle({
            filter: `brightness(${brightnessValue}) contrast(${contrastValue}) grayscale(${grayscaleValue})`,
        })
    }, [brightness, contrast, isColor])

    return (
        <div className="relative aspect-[4/3] w-full">
            <Image
                src={src || "/placeholder.svg"}
                alt={alt}
                fill
                className={`object-contain ${className}`}
                style={style}
                priority
            />
        </div>
    )
}

