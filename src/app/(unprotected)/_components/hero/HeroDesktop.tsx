'use client'

import { Button } from '@/components/ui/button'
import { ArrowRightCircle, Play } from 'lucide-react'
import Link from 'next/link'

// export interface IHeroDesktopProps {} props: IAdminTopbarProps

export default function HeroDesktop() {
  return (
    <div>
      <div className="flex flex-col gap-2 px-4 mx-auto md:mx-0 p-2 flex-1 items-start">
        <p className="text-[#333333] font-semibold text-md md:text-lg">
          Facilitando suas vendas
        </p>
        <div className="flex flex-row">
          <h1 className="text-brand-green font-['Bebas Neue'] font-bold text-3xl md:text-5xl">
            EASILY
          </h1>
          <h1 className="text-[#333333] font-semibold font-['Bebas Neue'] text-3xl md:text-5xl">
            {'  '}
            &nbsp;É A REVOLUÇÃO{}
          </h1>
        </div>
        <div className="flex flex-row">
          <h1 className="text-[#333333] font-semibold font-['Bebas Neue'] text-3xl md:text-5xl">
            NO MERCADO&nbsp;
          </h1>
          <h1 className="text-brand-green font-['Bebas Neue'] font-bold text-3xl md:text-5xl">
            {' '}
            DIGITAL
          </h1>
        </div>
        <div>
          <span className="text-md md:text-xl py-2 text-[#333333]">
            Não precisa fazer nada sozinho, vamos juntos!
          </span>
        </div>
        <div className="flex flex-row gap-4">
          <Link href="#">
            <Button className="bg-brand-green text-white text-sm md:text-md hidden md:flex">
              Faça parte da nossa revolução
            </Button>
            <Button className="bg-brand-green text-white text-sm md:text-md  md:hidden flex flex-row gap-2">
              Faça Parte da Easily
              <ArrowRightCircle />
            </Button>
          </Link>
          <Link
            href="#"
            className="md:flex md:flex-row gap-2 p-2 text-stone-900 text-sm md:text-md hidden"
          >
            <Play />
            Conheça a Easily
          </Link>
        </div>
      </div>
    </div>
  )
}
