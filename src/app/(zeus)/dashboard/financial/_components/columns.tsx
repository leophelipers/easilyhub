'use client'

import { Badge } from '@/components/ui/badge'
import convertTimestampToDate from '@/lib/formatTimeStamp'
import { formatToBRL } from '@/lib/formatToReal'
import { ColumnDef } from '@tanstack/react-table'

export type Transactions = {
  affiliateId?: string
  productId?: string
  productName?: string
  saleId?: string
  createdAt?: number
  clickId?: string
  typeOf?: string
  amount?: number
  status?: string
  unlockDate?: number
}

export const columns: ColumnDef<Transactions>[] = [
  {
    accessorKey: 'status',
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      return (
        <div className="text-center">
          <Badge>{status.toUpperCase()}</Badge>
        </div>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-center">Data</div>,
    cell: ({ row }) => {
      const dateOf = row.getValue('createdAt')
      const dateString = convertTimestampToDate(dateOf as number)
      return (
        <div className="text-center">
          <p>{dateString}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'productName',
    header: () => <div className="text-center">Nome do Produto</div>,
    cell: ({ row }) => {
      const product = row.getValue('productName') as string // Add type assertion
      return (
        <div className="text-center">
          <p>{product}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'typeOf',
    header: () => <div className="text-center">Tipo</div>,
    cell: ({ row }) => {
      const type = row.getValue('typeOf') as string
      return <div className="text-center">{type.toUpperCase()}</div>
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-center">Valor</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const formatted = formatToBRL(amount)

      const type = row.getValue('typeOf')
      return (
        <div
          className={`ml-auto text-center ${type === 'withdraw' ? 'text-red-500' : 'text-green-500'}`}
        >
          {formatted}
        </div>
      )
    },
  },
]
