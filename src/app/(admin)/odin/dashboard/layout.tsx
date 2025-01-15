'use client'

import { AdminSideBar } from '@/components/adminDash/sidebar/AdminSidebar'
import { AdminTopBar } from '@/components/adminDash/topbar/AdminTopbar'

type Props = {
  children: React.ReactNode
}

const LayoutAdmin = ({ children }: Props) => {
  return (
    <div className="h-full w-full bg-stone-200">
      <div className="flex">
        <div className="h-screen p-4 z-[15] shadow">
          <AdminSideBar />
        </div>
        <div className="flex flex-col w-full">
          <div className="shadow">
            <AdminTopBar />
          </div>
          <div>
            <main className="h-full">{children}</main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutAdmin
