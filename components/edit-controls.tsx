"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

interface EditControlsProps {
  id: string
  brightness: number
  setBrightness: (value: number) => void
  contrast: number
  setContrast: (value: number) => void
  isColor: boolean
  setIsColor: (value: boolean) => void
}

export function EditControls({
  id,
  brightness,
  setBrightness,
  contrast,
  setContrast,
  isColor,
  setIsColor,
}: EditControlsProps) {
  const [processing, setProcessing] = useState(false)
  const router = useRouter()

  const handleProcess = async () => {
    setProcessing(true)
    try {
      const response = await fetch("/api/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, brightness, contrast, isColor }),
      })

      if (response.ok) {
        router.push(`/result/${id}`)
      } else {
        const data = await response.json()
        throw new Error(data.error || "Failed to process image")
      }
    } catch (error) {
      console.error("Error processing image:", error)
      // You could add a toast notification here
    } finally {
      setProcessing(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="brightness">Brightness: {brightness}</Label>
          <Slider
            id="brightness"
            min={-100}
            max={100}
            step={1}
            value={[brightness]}
            onValueChange={(value) => setBrightness(value[0])}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contrast">Contrast: {contrast}</Label>
          <Slider
            id="contrast"
            min={-100}
            max={100}
            step={1}
            value={[contrast]}
            onValueChange={(value) => setContrast(value[0])}
          />
        </div>

        {/* <div className="flex items-center justify-between">
          <Label htmlFor="color-mode">Color Mode</Label>
          <Switch id="color-mode" checked={isColor} onCheckedChange={setIsColor} />
        </div> */}

        <Button onClick={handleProcess} className="w-full" disabled={processing}>
          {processing ? "Processing..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  )
}

