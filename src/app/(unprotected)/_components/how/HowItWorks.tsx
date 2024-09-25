'use client'

import { Separator } from '@/components/ui/separator'

// export interface IHowItWorksProps {} props: IAdminTopbarProps

export default function HowItWorks() {
  return (
    <div className="bg-[#1D1D1D] py-7 mx-28 flex flex-col items-start">
      {/** Heading */}
      <div className="flex flex-col gap-2">
        <div className="border-l border-white">
          <h2 className="font-['Bebas Neue'] text-brand-green pl-2">
            FAÇA PARTE DE UMA REVOLUÇÃO
          </h2>
        </div>
        <h1 className="font-['Bebas Neue'] text-4xl text-white font-bold">
          ENTENDA COMO FUNCIONA
        </h1>
      </div>
      {/** Cards */}
      <div className="flex flex-col md:flex-row gap-2 py-2">
        <div className="flex flex-row gap-2 py-2">
          <div className="flex flex-row gap-2">
            <div>
              <h1 className="text-6xl">1</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl py-2">Crie uma Conta</h1>
              <Separator />
              <p>
                Cadastre-se com seu e-mail e senha <br />
                no nosso cadastro simplificado.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 py-2 w-auto">
          <div className="flex flex-row gap-2">
            <div>
              <h1 className="text-6xl">2</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl py-2"> Escolha uma pool</h1>
              <Separator className="" />
              <p>
                Escolha qual produto você
                <br /> deseja fazer parte em nossa vitrine de destaques.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 py-2">
          <div className="flex flex-row gap-2">
            <div>
              <h1 className="text-6xl">3</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl py-2">Consiga Cliques</h1>
              <Separator />
              <p>
                Agora é só contribuir com os cliques.
                <br />O esforço seu e de toda a pool farão efeito.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 py-2">
          <div className="flex flex-row gap-2">
            <div>
              <h1 className="text-7xl text-brand-green">4</h1>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl py-2">Boas vendas!</h1>
              <Separator className="text-brand-green bg-brand-green" />
              <p>
                Assim que os cliques se <br />
                converterem em vendas, todos ganham!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
