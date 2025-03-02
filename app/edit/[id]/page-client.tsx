"use client"

import { useState } from "react"
import { PreviewImage } from "@/components/priview-image"
import { EditControls } from "@/components/edit-controls"
import { CropTool } from "@/components/crop-tool"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crop, Sliders } from "lucide-react"

export function EditPageClient({ id }: { id: string }) {
    const [brightness, setBrightness] = useState(0)
    const [contrast, setContrast] = useState(0)
    const [isColor, setIsColor] = useState(false)
    const [key, setKey] = useState(0) // Used to force re-render of image after crop

    const handleCropComplete = () => {
        // Force re-render of the image by updating the key
        setKey((prev) => prev + 1)
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8">Edit Your Scan</h1>
            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <PreviewImage
                        key={key}
                        src={`/uploads/${id}.png`}
                        alt="Scanned Image"
                        width={800}
                        height={600}
                        className="rounded-lg shadow-lg"
                        brightness={brightness}
                        contrast={contrast}
                        isColor={isColor}
                    />
                </div>
                <div className="w-full lg:w-80">
                    <Tabs defaultValue="crop">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="crop" className="gap-2">
                                <Crop className="w-4 h-4" />
                                Crop
                            </TabsTrigger>
                            <TabsTrigger value="adjust" className="gap-2">
                                <Sliders className="w-4 h-4" />
                                Adjust
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="crop" className="mt-4">
                            <h4 className="text-center">Comming soon</h4>
                            {/* <CropTool id={id} onCropComplete={handleCropComplete} /> */}
                        </TabsContent>
                        <TabsContent value="adjust" className="mt-4">
                            <EditControls
                                id={id}
                                brightness={brightness}
                                setBrightness={setBrightness}
                                contrast={contrast}
                                setContrast={setContrast}
                                isColor={isColor}
                                setIsColor={setIsColor}
                            />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

