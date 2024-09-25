'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// export interface IWhyProps {} props: IAdminTopbarProps

export default function Why() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-10 md:px-0 md:mx-28 ">
      <div>
        <h1 className="font-['Bebas Neue'] font-bold text-brand-green text-5xl">
          POR QUE ESCOLHER A EASLILY HUB?
        </h1>
      </div>
      <div className="py-4 md:mx-auto">
        <Tabs defaultValue="affiliate" className="w-full">
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
              <ul className="text-zinc-800">
                <li>
                  - Ganhos consistentes utilizando o tráfego orgânico já gerado
                  pelo perfil;
                </li>
                <li>- Maximização de ganhos sem perder tempo;</li>
                <li>- Dashboard simplificada;</li>
                <li>- Materiais de divulgação para inspiração e templates;</li>
                <li>- Facilidade de controle de ganhos e saques;</li>
                <li>- Seus dados protegidos de ponta a ponta;</li>
                <li>- Ganhos por indicação.</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="influencers">
            <div className="p-4 rounded bg-slate-200 shadow">
              <ul className="text-zinc-800">
                <li>
                  - Ganhos consistentes utilizando o tráfego orgânico já gerado
                  pelo perfil;
                </li>
                <li>- Maximização de ganhos sem perder tempo;</li>
                <li>- Dashboard simplificada;</li>
                <li>- Materiais de divulgação para inspiração e templates;</li>
                <li>- Facilidade de controle de ganhos e saques;</li>
                <li>- Seus dados protegidos de ponta a ponta;</li>
                <li>- Ganhos por indicação.</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="company">
            <div className="p-4 rounded bg-slate-200 shadow">
              <ul className="text-zinc-800">
                <li>
                  - Ganhos consistentes utilizando o tráfego orgânico já gerado
                  pelo perfil;
                </li>
                <li>- Maximização de ganhos sem perder tempo;</li>
                <li>- Dashboard simplificada;</li>
                <li>- Materiais de divulgação para inspiração e templates;</li>
                <li>- Facilidade de controle de ganhos e saques;</li>
                <li>- Seus dados protegidos de ponta a ponta;</li>
                <li>- Ganhos por indicação.</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
