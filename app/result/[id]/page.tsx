import Image from 'next/image'
import { DownloadButton } from '@/components/download-button'

export default function ResultPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Your Processed Scan</h1>
      <div className="flex flex-col items-center gap-8">
        <Image
          src={`/uploads/processed_${id}.png`}
          alt="Processed Scan"
          width={800}
          height={600}
          className="rounded-lg shadow-lg"
        />
        <DownloadButton id={id} />
      </div>
    </div>
  )
}

