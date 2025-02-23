'use client'
// export interface IPreProps {} props: IAdminTopbarProps

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { CircleArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../../../public/easilyE.png'

export default function Pre() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="flex flex-col gap-2 items-center justify-center">
            <Image src={Logo} alt="logo easily" width={20} height={20} />
            <h2 className="font-bold text-stone-900">Sou um Parceiro</h2>
          </CardHeader>
          <CardContent>
            <p>
              Você está aqui porque quer divulgar a EasilyHub e os produtos
              simultaneamente
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Link href="https://tally.so/r/np7VbP" passHref={true}>
              <Button className="flex items-center justify-center gap-1">
                Quero fazer parte do Beta
                <CircleArrowRight />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-col gap-2 items-center justify-center">
            <Image src={Logo} alt="logo easily" width={20} height={20} />
            <h2 className="font-bold text-stone-900">Sou um Influenciador</h2>
          </CardHeader>
          <CardContent>
            <p>
              Você está aqui porque quer ser um Influenciador agenciado(a) pela
              EasilyHub
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Link href="https://tally.so/r/wg74DJ" passHref={true}>
              <Button className="flex items-center justify-center gap-2">
                Quero fazer parte do Beta
                <CircleArrowRight />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-col gap-2 items-center justify-center">
            <Image src={Logo} alt="logo easily" width={20} height={20} />
            <h2 className="font-bold text-stone-900">Sou Membro Fundador</h2>
          </CardHeader>
          <CardContent>
            <p>
              Você está aqui porque quer divulgar os produtos e aumentar a renda
              com consistência
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Link href="https://tally.so/r/mYMd5v" passHref={true}>
              <Button className="flex items-center justify-center gap-2">
                Quero fazer parte do Beta
                <CircleArrowRight />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="flex flex-col gap-2 items-center justify-center">
            <Image src={Logo} alt="logo easily" width={20} height={20} />
            <h2 className="font-bold text-stone-900">
              Sou um Parceiro Convidado
            </h2>
          </CardHeader>
          <CardContent>
            <p>
              Você está aqui porque quer divulgar a EasilyHub e os produtos
              simultaneamente
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Link href="https://tally.so/r/mDJe4E" passHref={true}>
              <Button className="flex items-center justify-center gap-2">
                Quero fazer parte do Beta
                <CircleArrowRight />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="p-2">
        <Link href={'/dashboard/main-dash'}>
          <Button variant={'outline'} className="bg-brand-green">
            Ir para dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
