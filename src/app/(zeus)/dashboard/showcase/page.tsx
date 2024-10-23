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
      <div className="flex flex-col md:grid md:grid-cols-4 gap-3">
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
      </div>
    </div>
  )
}
