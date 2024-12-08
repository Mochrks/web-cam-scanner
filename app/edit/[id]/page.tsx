
import Image from 'next/image'
import { EditControls } from '@/components/edit-controls'

export default function EditPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Edit Your Scan</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <Image
            src={`/uploads/${id}.png`}
            alt="Scanned Image"
            width={800}
            height={600}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full lg:w-64">
          <EditControls id={id} />
        </div>
      </div>
    </div>
  )
}