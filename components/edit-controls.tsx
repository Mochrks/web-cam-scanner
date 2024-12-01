'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export function EditControls({ id }: { id: string }) {
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const router = useRouter()

  const handleSave = async () => {
    const response = await fetch('/api/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, brightness, contrast }),
    })

    if (response.ok) {
      router.push(`/result/${id}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="brightness">Brightness</Label>
        <Slider
          id="brightness"
          min={0}
          max={200}
          step={1}
          value={[brightness]}
          onValueChange={(value) => setBrightness(value[0])}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contrast">Contrast</Label>
        <Slider
          id="contrast"
          min={0}
          max={200}
          step={1}
          value={[contrast]}
          onValueChange={(value) => setContrast(value[0])}
        />
      </div>
      <Button onClick={handleSave} className="w-full">Save Changes</Button>
    </div>
  )
}

