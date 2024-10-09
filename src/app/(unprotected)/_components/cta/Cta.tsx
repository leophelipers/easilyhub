'use client'

import { Button } from '@/components/ui/button'
import { SignUpButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import Link from 'next/link'

// export interface ICtaProps {} props: IAdminTopbarProps

export default function Cta() {
  const { isLoading, isAuthenticated } = useConvexAuth()
  return (
    <div className="md:mx-28 px-10 bg-[#1D1D1D] flex flex-col md:flex-row items-center justify-between py-8">
      <div className="p-2">
        <h1 className="font-['Bebas Neue'] font-bold text-5xl text-brand-green">
          FAÇA PARTE <br />
          DA NOSSA <br />
          REVOLUÇÃO
        </h1>
      </div>
      <div className="p-2 flex flex-col items-center justify-start gap-4">
        <h2 className="font-['Bebas Neue'] font bold text-xl text-slate-200">
          Faça sua primeira venda agora! <br />
          Sem precisar investir. Somente
          <br /> com o tempo que você tem!
        </h2>
        {!isAuthenticated && !isLoading && (
          <>
            <SignUpButton mode="modal">
              <Button className="bg-brand-green text-white font-bold">
                Cadastre-se agora de maneira gratuita!
              </Button>
            </SignUpButton>
          </>
        )}
        {isAuthenticated && !isLoading && (
          <>
            <div className="flex gap-x-2">
              <Link href={'/dashboard'}>
                <Button className="bg-brand-green text-white font-bold w-max border-none">
                  ENTRAR
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
