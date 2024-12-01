import { UploadDropzone } from "@/components/upload-dropzone"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Smartphone } from 'lucide-react'

export default function Home() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          <span className="block">Transform Your Documents</span>
          <span className="block text-primary">Into Perfect Scans</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-muted-foreground sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          NextGen CamScanner turns your smartphone into a powerful scanner. Capture, enhance, and share your documents with ease.
        </p>
        <div className="mt-10 flex justify-center">
          <Button size="lg" className="mr-4">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>

      <div className="mt-20">
        <UploadDropzone />
      </div>

      <div className="mt-32">
        <h2 className="text-3xl font-extrabold text-center mb-12">Why Choose NextGen CamScanner?</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Feature
            icon={<Zap className="h-8 w-8 text-primary" />}
            title="Lightning Fast"
            description="Scan and process documents in seconds with our advanced AI technology."
          />
          <Feature
            icon={<Shield className="h-8 w-8 text-primary" />}
            title="Secure & Private"
            description="Your documents are encrypted and never stored without your permission."
          />
          <Feature
            icon={<Smartphone className="h-8 w-8 text-primary" />}
            title="Mobile Friendly"
            description="Scan on-the-go with our responsive web app, no installation required."
          />
        </div>
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

