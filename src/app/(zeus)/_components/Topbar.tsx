'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { UserButton } from '@clerk/clerk-react'
import {
  HomeIcon,
  PanelLeft,
  Settings,
  ShoppingCart,
  Wallet,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '../../../../public/easilyE.png'
// export interface IAdminTopBarProps {} props: IAdminTopbarProps

export function TopBar() {
  const pathname = usePathname()
  const pathArray = pathname.split('/').filter((path) => path)

  return (
    <div className="p-2 w-full h-full min-h-6 border-b border-emerald-500">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4  bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex md:hidden text-stone-900">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs bg-stone-900">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/dashboard/main-dash"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <HomeIcon className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/showcase"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Showcase
                </Link>
                <Link
                  href="/dashboard/financial"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Wallet className="h-5 w-5" />
                  Carteira
                </Link>
                <Link
                  href="/dashboard/settings/vzero"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Settings className="h-5 w-5" />
                  Configurações
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="md:hidden">
          <Image src={Logo} alt="logo easily" width={20} height={20} />
        </div>
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">{pathArray[0]}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">{pathArray[1]}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{pathArray[2]}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <UserButton
            customMenuItems={[{ label: 'Editar Conta', href: '/contas' }]}
          />
        </div>
      </header>
    </div>
  )
}
