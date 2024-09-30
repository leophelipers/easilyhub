'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Coin } from '@phosphor-icons/react'
import {
  ArrowRightCircle,
  Clock,
  List,
  Play,
  Star,
  User2Icon,
  UsersRound,
} from 'lucide-react'
import Link from 'next/link'

// export interface IHeroProps {} props: IAdminTopbarProps

export default function Hero() {
  return (
    <div className="bg-bannerImg min-h-screen h-full py-2 w-full overflow-hidden border-none flex flex-col">
      <div className="flex flex-col gap-1 md:flex-row md:mx-24 items-center justify-center my-12 p-10">
        {/** Headline e botões */}
        <div className="md:hidden flex flex-col gap-2 px-2 mx-auto md:mx-0 p-2 flex-1 items-start">
          <p className="text-[#333333] font-semibold text-md md:text-lg">
            Seu parceiro digital
          </p>
          <div className="flex flex-row">
            <h1 className="text-brand-green font-['Bebas Neue'] font-bold text-2xl">
              EASILY
            </h1>
            <h1 className="text-[#333333] font-bold font-['Bebas Neue'] text-2xl">
              {'  '}
              &nbsp;É A REVOLUÇÃO{}
            </h1>
          </div>
          <div className="flex flex-row">
            <h1 className="text-[#333333] font-semibold font-['Bebas Neue'] text-2xl">
              NO MERCADO&nbsp;
            </h1>
            <h1 className="text-brand-green font-['Bebas Neue'] font-bold text-2xl">
              {' '}
              DIGITAL
            </h1>
          </div>
          <div>
            <span className="text-md md:text-xl py-2 text-[#333333]">
              Não precisa fazer nada sozinho, vamos juntos!
            </span>
          </div>
          <div className="flex flex-row gap-4 py-3 pb-4">
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
        <div className="hidden md:flex md:flex-col gap-2 px-4 mx-auto md:mx-0 p-2 flex-1 items-start">
          <p className="text-[#333333] font-semibold text-md md:text-lg">
            Facilitando suas vendas
          </p>
          <div className="flex flex-row">
            <h1 className="text-brand-green font-['Bebas Neue'] font-bold text-3xl md:text-5xl">
              EASILY
            </h1>
            <h1 className="text-[#333333] font-bold font-['Bebas Neue'] text-3xl md:text-5xl">
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
        {/** Cards */}
        <div className="flex flex-col md:gap-2">
          <Card className="flex flex-row backdrop-filter backdrop-blur-sm bg-opacity-10 bg-[#F4F3F8] border-none shadow-lg rounded-3xl w-fit">
            <CardHeader>
              <div className="p-2 rounded-2xl shadow bg-brand-green">
                <List />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 justify-start py-4">
              <h2 className="font-bold text-stone-950">Mais de 30 produtos</h2>
              <h3 className="text-stone-700">Para participar</h3>
            </CardContent>
          </Card>
          <Card className="flex flex-row gap-[-2px] backdrop-filter backdrop-blur-sm bg-opacity-10 bg-[#F4F3F8] border-none shadow-lg rounded-3xl w-fit ">
            <CardHeader className="mr-[-24px]">
              <div className="p-2 rounded-2xl shadow bg-brand-green">
                <User2Icon />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 justify-start py-4">
              <h2 className="font-bold text-stone-950">Mais de 500</h2>
              <h3 className="text-stone-700">Usuários cadastrados</h3>
            </CardContent>
          </Card>
          <Card className="flex flex-row backdrop-filter backdrop-blur-sm bg-opacity-10 bg-[#F4F3F8] border-none shadow-lg rounded-3xl w-fit ">
            <CardHeader>
              <div className="p-2 rounded-2xl">
                <Star className="text-[#F2C94C]" />
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-1 justify-start py-4">
              <h2 className="font-bold text-stone-950">4.8</h2>
              <h3 className="text-stone-700">De satisfação</h3>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="bg-[#7c7c7c] backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-lg mx-auto w-fit flex flex-col md:flex-row md:mx-28 py-10 mb-2 shadow-2xl">
        <Card className="bg-transparent border-none shadow-none">
          <CardHeader className="items-start justify-start">
            <div className="bg-brand-green rounded p-2">
              <Coin className="text-white" width={22} height={19} />
            </div>
            <h2 className="font-bold text-[#333333]">Ganhos Consistentes</h2>
          </CardHeader>
          <CardContent>
            <p>
              Através da sua participação para vendas, você vai ser
              recompensando com ganhos consistentes, baseado no esforço conjunto
              da pool.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-transparent border-none shadow-none">
          <CardHeader className="items-start justify-start">
            <div className="bg-brand-green rounded p-2">
              <Clock className="text-white" width={22} height={19} />
            </div>
            <h2 className="font-bold text-[#333333]">Poupe seu tempo!</h2>
          </CardHeader>
          <CardContent>
            <p>
              Você não precisa gastar 8 horas do seu dia para começar a ganhar.
              Use somente o tempo que você tem disponível e já vai conseguir
              alcançar reultados.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-transparent border-none shadow-none">
          <CardHeader className="items-start justify-start">
            <div className="bg-brand-green rounded p-2">
              <UsersRound className="text-white" width={22} height={19} />
            </div>
            <h2 className="font-bold text-[#333333]">
              Um por todos, todos por um!
            </h2>
          </CardHeader>
          <CardContent>
            <p>
              Utilizando um algoritmo que determina o quanto você colocou de
              esforço em uma venda, os ganhos são divididos entre todos os
              membros da pool.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
