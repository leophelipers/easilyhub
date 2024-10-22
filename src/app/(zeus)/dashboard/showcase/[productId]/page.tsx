/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { useQuery } from 'convex/react'
import { Info, Link as LinkIcon } from 'lucide-react'
import Image from 'next/image'
import { api } from '../../../../../../convex/_generated/api'
import { Id } from '../../../../../../convex/_generated/dataModel'

interface productIdPageProps {
  params: {
    productId: Id<'products'>
  }
}

export default function ProductIdPage({ params }: productIdPageProps) {
  const { toast } = useToast()

  const product = useQuery(api.products.getProductById, {
    id: params.productId,
  })

  const user = useQuery(api.users.getUser)

  // Show loading state while fetching data
  if (!product) {
    return (
      <div className="container mx-auto p-6 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  const copyAffiliateLink = (link: string) => {
    navigator.clipboard.writeText(link)
    toast({
      title: 'Link copiado!',
      description: 'O link foi copiado para sua área de transferência.',
      variant: 'success',
    })
  }

  // Calculate commission value for display
  const getCommissionDisplay = () => {
    if (product.comissionType === 'percentage') {
      return `${product.comissionValue}%`
    }
    return `R$ ${product.comissionValue}`
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl mb-2">{product.name}</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Image
            src="https://cdn.pixabay.com/photo/2022/12/01/04/43/girl-7628308_1280.jpg"
            alt={product.name}
            width={800} // Defina a largura adequada
            height={256} // Defina a altura adequada
            className="w-full h-64 object-cover rounded-lg"
          />
          <p className="text-muted-foreground">{product.description}</p>

          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Detalhes do Produto</TabsTrigger>
              <TabsTrigger value="affiliate">
                Informações de Afiliado
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <div className="space-y-4">
                {product.lastSaleTimestamp && (
                  <div className="flex items-center justify-between">
                    <span>Última Venda:</span>
                    <span>
                      {new Date(product.lastSaleTimestamp).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {product.paymentPlataform && (
                  <div className="flex items-center justify-between">
                    <span>Plataforma de Pagamento:</span>
                    <span>{product.paymentPlataform}</span>
                  </div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="affiliate" className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex flex-row gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info
                            className="text-brand-green"
                            width={20}
                            height={20}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            Comissão a ser dividida na pool - antes das taxas
                            easily que variam entre 10-30%
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <span className="font-semibold">Comissão total:</span>
                </div>

                <span className="text-green-600 font-bold">
                  {getCommissionDisplay()}
                </span>
              </div>
              {product.linkSalesPage && (
                <div>
                  <h4 className="font-semibold mb-2">
                    Link da Página de Vendas
                  </h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={product.linkSalesPage}
                      readOnly
                      className="flex-grow p-2 border rounded"
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        product.linkSalesPage &&
                        copyAffiliateLink(
                          product.linkSalesPage + '/' + user?.affiliateToken,
                        )
                      }
                    >
                      <LinkIcon className="mr-2 h-4 w-4" /> Copiar
                    </Button>
                  </div>
                </div>
              )}
              {product.linkLeadsPage && (
                <div>
                  <h4 className="font-semibold mb-2">
                    Link da Página de Captura
                  </h4>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={product.linkLeadsPage}
                      readOnly
                      className="flex-grow p-2 border rounded"
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        product.linkLeadsPage &&
                        window.open(product.linkLeadsPage, '_blank')
                      }
                    >
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Página de Captura
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
