import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatToBRL } from '@/lib/formatToReal'
import React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Id } from '../../../../../../convex/_generated/dataModel'

// Helper function to format date
const formatDate = (dateString: string) => {
  const parts = dateString.split('/')
  if (parts.length !== 3) return dateString
  const [day, month, year] = parts
  return `${day}/${month}/${year.slice(-2)}`
}

// Helper function to sort dates
const sortDates = (a: string, b: string) => {
  const [dayA, monthA, yearA] = a.split('/')
  const [dayB, monthB, yearB] = b.split('/')
  return (
    new Date(Number(yearA), Number(monthA) - 1, Number(dayA)).getTime() -
    new Date(Number(yearB), Number(monthB) - 1, Number(dayB)).getTime()
  )
}

interface Transaction {
  _id: Id<'transactions'>
  _creationTime: number
  productId?: Id<'products'>
  clickId?: Id<'clicks'>
  amount: number
  affiliateId: Id<'users'>
  typeOf: string
  // Add other properties as needed
}

interface SalesChartProps {
  transactions: Transaction[] | undefined
}

const SalesChart: React.FC<SalesChartProps> = ({ transactions }) => {
  // Process and sort the data
  const salesByDate = transactions?.reduce(
    (acc: Record<string, number>, transaction: Transaction) => {
      const date = formatDate(
        new Date(transaction._creationTime).toLocaleDateString('pt-BR'),
      )
      acc[date] = (acc[date] || 0) + transaction.amount
      return acc
    },
    {},
  )

  const data = Object.entries(salesByDate || {})
    .sort(([dateA], [dateB]) => sortDates(dateA, dateB))
    .map(([date, sales]) => ({ date, sales }))

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Vendas por Dia</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex items-center justify-center">
            No data available
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendas por Dia</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 70, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) =>
                  value.split('/').slice(0, 2).join('/')
                }
              />
              <YAxis tickFormatter={(value) => formatToBRL(value)} width={70} />
              <Tooltip
                formatter={(value: number) => formatToBRL(value)}
                labelFormatter={(label) => `Data: ${label}`}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#69D842"
                fill="#69D842"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default SalesChart
