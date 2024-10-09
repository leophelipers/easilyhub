'use client'

import { Button } from '@/components/ui/button'
import { ArrowCircleRight } from '@phosphor-icons/react'
import Link from 'next/link'

// export interface ICtaProps {} props: IAdminTopbarProps

export default function Partner() {
  return (
    <div className="md:mx-28 px-10 bg-brand-green flex flex-col-reverse gap-8 md:gap-0 md:flex-row items-center justify-between py-8">
      <div className="p-2 flex flex-col items-center justify-start gap-4">
        <h2 className="font-['Bebas Neue'] font-bold text-2xl text-white">
          Promova a EasilyHub <br />e ganhe comissões!
        </h2>
        <Link href={'https://tally.so/r/np7VbP'} passHref={true}>
          <Button className="flex gap-2 w-full">
            Entre agora
            <ArrowCircleRight />
          </Button>
        </Link>
      </div>
      <div className="p-2">
        <h1 className="font-['Bebas Neue'] font-bold text-5xl text-white">
          SEJA NOSSO <br />
          PARCEIRO <br />
        </h1>
      </div>
    </div>
  )
}
