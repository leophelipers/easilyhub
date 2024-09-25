'use client'

import { SideBar } from '../_components/Sidebar'
import { TopBar } from '../_components/Topbar'

type Props = {
  children: React.ReactNode
}

const LayoutAdmin = ({ children }: Props) => {
  return (
    <div className="h-full w-full bg-stone-900">
      <div className="flex">
        <div className="h-screen p-4 z-[15] shadow">
          <SideBar />
        </div>
        <div className="flex flex-col w-full">
          <div className="shadow">
            <TopBar />
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
