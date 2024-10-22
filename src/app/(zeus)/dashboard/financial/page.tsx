/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatToBRL } from '@/lib/formatToReal'
import { useQuery } from 'convex/react'
import { ArrowUpRight, DollarSign, Lock } from 'lucide-react'
import Link from 'next/link'
import { api } from '../../../../../convex/_generated/api'
import { columns } from './_components/columns'
import { DataTable } from './_components/data-table'

export default function SalesDashboard() {
  const historicalBalance = useQuery(api.sales.getHistoricalSales)
  const easilyAccount = useQuery(api.easilyAccount.getEasilyAccount)
  const transactions = useQuery(api.transactions.getTransaction)

  if (!historicalBalance) return <div>Loading...</div>

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-stone-950">
            Painel Financeiro
          </h1>
        </div>
        <div>
          <Link href={'/dashboard/withdraw'}>
            <Button>Novo Saque</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatToBRL(easilyAccount?.totalBalance ?? 0)}
            </div>
          </CardContent>
        </Card>

        <Link href={'/dashboard/withdraw'}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Saldo Disponível para Saque
              </CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatToBRL(easilyAccount?.withdrawableBalance ?? 0)}
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Saldo Bloqueado
            </CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatToBRL(easilyAccount?.blockedBalance ?? 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Suas transações</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={transactions ?? []} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
