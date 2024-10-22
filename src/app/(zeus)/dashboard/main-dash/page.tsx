'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatToBRL } from '@/lib/formatToReal'
import { useQuery } from 'convex/react'
import { BarChart3, CalendarIcon } from 'lucide-react'
import { api } from '../../../../../convex/_generated/api'
import SalesChart from './_components/SalesChart'

export default function SalesDashboard() {
  const historicalBalance = useQuery(api.sales.getHistoricalSales)
  const totalClicks = useQuery(api.clicks.getTotalClicks)
  const easilyAccount = useQuery(api.easilyAccount.getEasilyAccount)
  const transactions = useQuery(api.transactions.getTransaction)

  if (!historicalBalance) return <div>Loading...</div>
  if (totalClicks === null || totalClicks === undefined)
    return <div>Loading...</div>

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-stone-950">
        Dashboard de Vendas
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatToBRL(historicalBalance?.totalBalance ?? 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clicks</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
          </CardContent>
        </Card>

        <Card className="hidden lg:block">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Saldo disponível para saque
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatToBRL(easilyAccount?.withdrawableBalance ?? 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:hidden space-y-4 mb-6">
        <div>
          <label
            className="text-sm font-medium text-muted-foreground"
            htmlFor="mobile-date-filter"
          >
            Saldo disponível para saque
          </label>
          <div className="text-2xl font-bold">
            {formatToBRL(easilyAccount?.withdrawableBalance ?? 0)}
          </div>
        </div>
      </div>

      <SalesChart transactions={transactions} />
    </div>
  )
}
