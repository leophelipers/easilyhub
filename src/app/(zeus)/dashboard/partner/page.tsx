'use client'
// export interface IPartnerProps {} props: IAdminTopbarProps
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useQuery } from 'convex/react'
import { CircleArrowRight, Info } from 'lucide-react'
import Link from 'next/link'
import { api } from '../../../../../convex/_generated/api'

export default function Partner() {
  const partnerStats = useQuery(api.partners.getPartnerStats)

  if (!partnerStats) return <div>Loading...</div>

  return (
    <div className="text-stone-950">
      <div className="flex items-center justify-center">
        <div className="p-6 flex items-center justify-center">
          <div>
            <div className="text-stone-950 text-xl font-bold text-center p-4">
              Seu código de parceiro é:{' '}
              <span className="bg-[#1D1D1D] text-brand-green p-2 rounded">
                {partnerStats.code}
              </span>
              <div className="grid grid-cols-3 gap-4 p-4">
                <div>
                  <Card>
                    <CardHeader className="flex flex-row gap-2 items-center justify-center">
                      Indicações totais
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="text-brand-green" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Totais de usuários cadastrados com o seu código de
                              parceiro
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </CardHeader>
                    <CardContent className="text-center">
                      {partnerStats.totalReferrals}
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader>Indicações Comissionadas</CardHeader>
                    <CardContent className="text-center">
                      {partnerStats.referralsWithFirstSale}
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader>Taxa de conversão</CardHeader>
                    <CardContent className="text-center">
                      {(partnerStats.conversionRate * 100).toFixed(2)}%
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader>Comissão gerada</CardHeader>
                    <CardContent className="text-center">
                      {partnerStats.realComission} R$
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader>Possível Comissão</CardHeader>
                    <CardContent className="text-center">
                      {partnerStats.possibleComission} R$
                    </CardContent>
                  </Card>
                </div>
                <div>
                  <Card>
                    <CardHeader className="">Ranking de Parceiros</CardHeader>
                    <CardContent className="text-center flex items-center justify-center mb-[-2]">
                      <Link href="/rank">
                        <Button
                          className="flex items-center justify-center mt-[-2]"
                          size={'icon'}
                        >
                          <CircleArrowRight />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
