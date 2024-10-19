'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEdgeStore } from '@/lib/edgestore'
import * as React from 'react'
// export interface IDocumentsProps {} props: IAdminTopbarProps

export default function Documents() {
  const [file, setFile] = React.useState<File>()
  const { edgestore } = useEdgeStore()

  return (
    <div>
      <div>
        <Input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0])
          }}
        />
        <Button
          onClick={async () => {
            if (file) {
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  // you can use this to show a progress bar
                  console.log(progress)
                },
              })
              // you can run some server action or api here
              // to add the necessary data to your database
              console.log(res)
            }
          }}
        >
          Upload
        </Button>
      </div>
    </div>
  )
}
