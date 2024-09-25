'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../../public/easilyPreto.png'

// export interface ITopbarProps {} props: IAdminTopbarProps

export default function Topbar() {
  const { isLoading, isAuthenticated } = useConvexAuth()

  return (
    <div className="flex p-6 md:items-center md:justify-evenly justify-between md:p-4 md:mx-auto shadow border-none">
      <div className="flex md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5 shadow" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-white">
            <nav className="grid gap-6 text-lg font-medium  text-ston-950">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                <Image src={Logo} alt="logo" width={110} height={40} />
                <span className="sr-only">EasilyHub</span>
              </Link>
              <Link href="/premium" className="text-stone-950 font-bold">
                Home
              </Link>
              <Link href="/blog" className="text-stone-950 font-bold">
                Benefícios
              </Link>
              <Link
                href="https://phelps.beehiiv.com/subscribe"
                passHref={true}
                className="text-stone-950 font-bold"
              >
                Como funciona?
              </Link>
              <Link href="/blog" className="text-stone-950 font-bold">
                FAQ
              </Link>
              <div className="flex flex-col gap-3">
                {isLoading && <p>Loading...</p>}
                {!isAuthenticated && !isLoading && (
                  <>
                    <SignUpButton mode="modal">
                      <Button className="bg-stone-700 text-white">
                        REGISTRAR
                      </Button>
                    </SignUpButton>
                    <SignInButton mode="modal">
                      <Button
                        variant={'ghost'}
                        className="text-white bg-brand-green shadow-lg p-4"
                      >
                        ENTRAR
                      </Button>
                    </SignInButton>
                  </>
                )}
                {isAuthenticated && !isLoading && (
                  <>
                    <div className="flex gap-x-2">
                      <Link href={'/dashboard'}>
                        <Button
                          variant={'outline'}
                          className="hover:orange-500"
                        >
                          Enter
                        </Button>
                      </Link>
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <Image src={Logo} alt="logo" width={110} height={40} />
      </div>
      <div className="hidden md:flex flex-row gap-3">
        <Link href="#">
          <Button
            variant={'ghost'}
            className="bg-brand-green hover:bg-brand-green/40 text-slate-800 p-5 "
          >
            {' '}
            Home{' '}
          </Button>
        </Link>
        <Link href="#">
          <Button
            variant={'ghost'}
            className="bg-trasnsparent hover:bg-brand-green/40 text-slate-800 p-5 "
          >
            {' '}
            Benefícios{' '}
          </Button>
        </Link>
        <Link href="#">
          <Button
            variant={'ghost'}
            className="bg-trasnsparent hover:bg-brand-green/40 text-slate-800 p-5"
          >
            {' '}
            Como Funciona?{' '}
          </Button>
        </Link>
        <Link href="#">
          <Button
            variant={'ghost'}
            className="bg-trasnsparent hover:bg-brand-green/40 text-slate-800 p-5"
          >
            {' '}
            FAQ{' '}
          </Button>
        </Link>
      </div>
      <div className="hidden md:flex gap-x-2">
        {isLoading && <p>Loading...</p>}
        {!isAuthenticated && !isLoading && (
          <>
            <SignUpButton mode="modal">
              <Button className="bg-stone-700 text-white">REGISTRAR</Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button
                variant={'ghost'}
                className="text-white bg-brand-green shadow p-4"
              >
                ENTRAR
              </Button>
            </SignInButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <div className="flex gap-x-2">
              <Link href={'/dashboard'}>
                <Button variant={'outline'} className="hover:orange-500">
                  Enter
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
