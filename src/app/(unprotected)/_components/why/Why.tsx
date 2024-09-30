'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight } from 'lucide-react'

// export interface IWhyProps {} props: IAdminTopbarProps

export default function Why() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-10 md:px-0 md:mx-28 ">
      <div>
        <h1 className="font-['Bebas Neue'] font-bold text-brand-green text-4xl md:text-5xl">
          POR QUE ESCOLHER A EASLILY HUB?
        </h1>
      </div>
      <div className="py-4 md:mx-auto">
        <Tabs defaultValue="affiliate" className="w-full px-2">
          <TabsList className=" bg-[#296215] w-full justify-between px-10">
            <TabsTrigger
              className="data-[state=active]:bg-brand-green data-[state=active]:text-white text-slate-200"
              value="affiliate"
            >
              Afiliados
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-brand-green data-[state=active]:text-white text-slate-200"
              value="influencers"
            >
              Influenciadores
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-brand-green data-[state=active]:text-white text-slate-200"
              value="company"
            >
              Empresas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="affiliate">
            <div className="p-4 rounded bg-slate-200 shadow">
              <ul className="text-zinc-800 flex flex-col text-center items-start">
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Ganhos consistentes</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Maximize seus ganhos e seu tempo</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Dashboard simplificada</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Materiais de divulgação</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Facilidade de controle de ganhos</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Seus dados protegidos end to end</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p className="text-brand-green">
                    Bônus para membros fundadores
                  </p>
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="influencers">
            <div className="p-4 rounded bg-slate-200 shadow">
              <ul className="text-zinc-800 flex flex-col text-center items-start">
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Ganhos consistentes</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Seja um agenciado premium</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Dashboard simplificada</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Equipe comercial de alto rendimento</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Tenha chances com grandes marcas</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Facilidade de controle de ganhos</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Seus dados protegidos end to end</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p className="text-brand-green">
                    Bônus para membros fundadores
                  </p>
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="company">
            <div className="p-4 rounded bg-slate-200 shadow">
              <ul className="text-zinc-800 flex flex-col text-center items-start">
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Escale suas vendas com ótimo ROI</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Consiga mais visibilidade</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Campanhas mais orgânicas</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Funis de alta conversão</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Fortaleça seu branding</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Facilidade de controle de gastos</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p>Seus dados protegidos end to end</p>
                </li>
                <li className="flex items-center justify-center gap-3">
                  <ArrowRight className="text-xl text-brand-green" />
                  <p className="text-brand-green">
                    Bônus para membros fundadores
                  </p>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
