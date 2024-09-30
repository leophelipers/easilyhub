'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// export interface IProductsProps {} props: IAdminTopbarProps

export default function Products() {
  return (
    <div className="p-6">
      <div className="flex gap-2">
        <div>
          <Card className="bg-zinc-800 border-none text-white shadow rouded">
            <CardHeader>
              <CardTitle>Novo produto</CardTitle>
            </CardHeader>
            <CardContent>
              <Button>Clique aqui</Button>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 mt-2">
        <div>
          <Card className="bg-zinc-800 border-none text-white shadow rouded">
            <CardHeader>
              <CardTitle>Novo produto</CardTitle>
            </CardHeader>
            <CardContent>
              <Button>Clique aqui</Button>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="bg-zinc-800 border-none text-white shadow rouded">
            <CardHeader>
              <CardTitle>Novo produto</CardTitle>
            </CardHeader>
            <CardContent>
              <Button>Clique aqui</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
