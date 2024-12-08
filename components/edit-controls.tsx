"use client"

import { useState } from 'react'

export function EditControls({ id }: { id: string }) {
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)

  const handleProcess = async () => {
    const response = await fetch('/api/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application /json',
      },
      body: JSON.stringify({ id, brightness, contrast }),
    })

    if (response.ok) {
      // Redirect to the result page after processing
      const { success } = await response.json()
      if (success) {
        window.location.href = `/result/${id}`
      }
    } else {
      console.error('Error processing image')
      // Handle error (e.g., show error message to user)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <label>
        Brightness:
        <input
          type="range"
          min="0"
          max="200"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
        />
      </label>
      <label>
        Contrast:
        <input
          type="range"
          min="0"
          max="200"
          value={contrast}
          onChange={(e) => setContrast(Number(e.target.value))}
        />
      </label>
      <button onClick={handleProcess} className="btn">
        Process Image
      </button>
    </div>
  )
}