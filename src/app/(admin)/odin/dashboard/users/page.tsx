'use client'
import { columns, Payment } from './_components/userData/columns'
import { DataTable } from './_components/userData/data-table'

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  {
    id: '1561e151',
    amount: 155,
    status: 'processing',
    email: 'leo@leo.com',
  },
  // ...
]

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col ">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <h2>Usuários</h2>
          <DataTable columns={columns} data={payments} />
        </main>
      </div>
    </div>
  )
}
