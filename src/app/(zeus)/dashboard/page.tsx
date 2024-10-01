'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ArrowRight, CircleArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../../public/easilyE.png'

// export interface IDashboardProps {} props: IAdminTopbarProps

export default function Dashboard() {
  return (
    <div className="flex items-center justify-center p-8">
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
            <Link href="#">
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
              Você está aqui porque quer divulgar a EasilyHub e os produtos
              simultaneamente
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Link href="#">
              <Button className="flex items-center justify-center gap-2">
                Quero fazer parte do Beta
                <ArrowRight />
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
              Você está aqui porque quer divulgar a EasilyHub e os produtos
              simultaneamente
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-center">
            <Link href="#">
              <Button>Quero fazer parte do Beta</Button>
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
            <Link href="#">
              <Button>Quero fazer parte do Beta</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
