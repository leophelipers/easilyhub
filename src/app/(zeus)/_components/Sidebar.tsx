'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import {
  Home,
  LineChart,
  Settings,
  ShoppingCart,
  Users2,
  Wallet,
} from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '../../../../public/easilyE.png'

// Fix: Correct the props definition by removing the invalid `props: IAdminTopbarProps`
export function SideBar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col gap-2 p-2 items-center justify-center w-max">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-18 flex-col border-r border-emerald-500 bg-transparent sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <Image src={Logo} alt="logo easily" width={20} height={20} />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/main-dash"
                  className={
                    pathname === '/dashboard/main-dash'
                      ? 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-emerald-700 text-white'
                      : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  }
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/showcase"
                  className={
                    pathname === '/dashboard/showcase'
                      ? 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-emerald-700 text-white'
                      : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  }
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Showcase</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Showcase</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/financial"
                  className={
                    pathname === '/dashboard/financial'
                      ? 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-emerald-700 text-white'
                      : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  }
                >
                  <Wallet className="h-5 w-5" />
                  <span className="sr-only">Financeiro</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Financeiro</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={
                    pathname === '/dashboard/colaborators'
                      ? 'cursor-not-allowed flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-emerald-700 text-white'
                      : 'cursor-not-allowed flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  }
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Colaboradores(em breve)</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                Colaboradores(em breve)
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={
                    pathname === '/dashboard/analytics'
                      ? 'cursor-not-allowed flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-emerald-700 text-white'
                      : 'cursor-not-allowed flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  }
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Relatórios(em breve)</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Relatórios(em breve)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/settings/vzero"
                  className={
                    pathname === '/dashboard/settings/vzero'
                      ? 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-emerald-700 text-white'
                      : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                  }
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Configurações</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Configurações</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </div>
  )
}
