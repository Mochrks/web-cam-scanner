import { UploadDropzone } from "@/components/upload-dropzone"

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block">Transform Your Documents</span>
          <span className="block text-primary">Into Perfect Scans</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Web CamScanner turns your images into a powerful scanner. Capture, enhance, and share your documents with ease.
        </p>

      </div>

      <div className="mt-20">
        <UploadDropzone />
      </div>
    </div>
  )
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-base text-muted-foreground">{description}</p>
    </div>
  )
}

