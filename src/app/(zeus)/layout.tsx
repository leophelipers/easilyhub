'use client'

import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  if (isLoading) {
    return <div className="h-full flex items-center justify-center"></div>
  }

  if (!isAuthenticated) {
    return redirect('/')
  }

  return (
    <div className="h-full h-min-screen flex">
      <main className="flex-1 h-screen overflow-y-auto">{children}</main>
    </div>
  )
}

export default MainLayout

/** bg-[#1F1F1F] */
