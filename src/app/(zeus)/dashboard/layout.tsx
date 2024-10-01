'use client'

import { SideBar } from '../_components/Sidebar'
import { TopBar } from '../_components/Topbar'

type Props = {
  children: React.ReactNode
}

const LayoutAdmin = ({ children }: Props) => {
  return (
    <div className="h-max min-h-screen w-full bg-stone-100">
      <div className="flex">
        <div className="h-max p-4 z-[15] hidden md:flex">
          <SideBar />
        </div>
        <div className="flex flex-col w-full">
          <div className="shadow">
            <TopBar />
          </div>
          <div>
            <main className="h-max min-h-screen">{children}</main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LayoutAdmin
