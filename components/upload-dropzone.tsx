"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, File } from 'lucide-react'
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function UploadDropzone() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const router = useRouter()

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } })

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const { id } = await response.json()
        router.push(`/edit/${id}`)
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      // Handle error (e.g., show error message to user)
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  // Simulating upload progress
  if (uploading) {
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval)
          return prev
        }
        return prev + 5
      })
    }, 100)
  }

  return (
    <div className="max-w-xl mx-auto">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground"
          }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="flex items-center justify-center space-x-4">
            <File className="h-8 w-8 text-primary" />
            <span className="font-medium">{file.name}</span>
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Drag & drop an image here, or click to select one
            </p>
          </>
        )}
      </div>
      {file && (
        <div className="mt-4 space-y-4">
          {uploading ? (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">Uploading... {uploadProgress}%</p>
            </div>
          ) : (
            <Button onClick={handleUpload} className="w-full">
              Upload and Edit
            </Button>
          )}
        </div>
      )}
    </div>
  )
}