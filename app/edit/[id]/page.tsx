import { EditPageClient } from "./page-client"

export default function EditPage({ params }: { params: { id: string } }) {
  const { id } = params
  return <EditPageClient id={id} />
}

