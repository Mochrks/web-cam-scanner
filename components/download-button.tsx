"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function DownloadButton({ id }: { id: string }) {
  const handleDownload = () => {
    // Create a link to download the processed image
    const link = document.createElement("a")
    link.href = `/uploads/processed_${id}.png`
    link.download = `processed_scan_${id}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button onClick={handleDownload} className="gap-2">
      <Download className="h-4 w-4" />
      Download Processed Scan
    </Button>
  )
}

