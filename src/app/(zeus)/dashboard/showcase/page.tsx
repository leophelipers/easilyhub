'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { formatToBRL } from '@/lib/formatToReal'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '../../../../../convex/_generated/api'

// export interface IShowcaseProps {} props: IAdminTopbarProps

export default function Showcase() {
  const products = useQuery(api.products.getProducts)
  return (
    <div className="p-4">
      <div>
        <h1 className="text-3xl font-bold mb-6 text-stone-950">Vitrine</h1>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {products?.map((product) => (
          <Card key={product._id} className="overflow-hidden">
            <CardHeader>
              <Image
                src={
                  product.heroImage ||
                  'https://cdn.pixabay.com/photo/2023/10/30/01/31/duck-8351436_1280.jpg'
                }
                alt={product.name}
                width={250}
                height={250}
                className="rounded shadow"
              />
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-stone-950 font-bold text-lg">
                  {product.name}
                </p>
              </div>

              <div>
                <p className="text-stone-950 font-bold text-md">
                  Comissão de até:{' '}
                  {formatToBRL(Number(product.comissionValue) || 0)}
                </p>
                <div>
                  <Badge>{product.comissionType.toUpperCase()}</Badge>
                </div>
              </div>

              <div>
                <Link href={`/dashboard/showcase/${product._id}`}>
                  <Button className="w-full mt-2">Ver Links</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
        <div>
          <Card className="overflow-hidden">
            <CardHeader>
              <Image
                src={
                  'https://cdn.pixabay.com/photo/2023/10/30/01/31/duck-8351436_1280.jpg'
                }
                alt="productName"
                width={250}
                height={300}
                className="rounded shadow"
              />
            </CardHeader>
            <CardContent>
              <div>
                <p className="text-stone-950 font-bold text-lg">Product Name</p>
              </div>

              <div>
                <p className="text-stone-950 font-bold text-md">
                  Comissão de até: R$100,00
                </p>
              </div>

              <div>
                <Button className="p-2 my-2 rounded w-full">Ver Links</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
