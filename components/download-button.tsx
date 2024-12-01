'use client'

import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

export function DownloadButton({ id }: { id: string }) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = `/uploads/processed_${id}.png`
    link.download = `scan_${id}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button onClick={handleDownload} className="w-64">
      <Download className="mr-2 h-4 w-4" /> Download Scan
    </Button>
  )
}

