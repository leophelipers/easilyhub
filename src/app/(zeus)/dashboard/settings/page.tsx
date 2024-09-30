'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Profile from './_components/profile'

// export interface ISettingsProps {} props: IAdminTopbarProps

export default function Settings() {
  return (
    <div className="flex flex-col gap-3 p-10">
      <h1 className="text-zinc-900 font-bold text-3xl">Minha conta</h1>
      <div>
        <Tabs defaultValue="profile" className="">
          <TabsList>
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white text-emerald-700 font-bold text-md"
            >
              Perfil
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white text-emerald-700 font-bold text-md"
            >
              Documentos
            </TabsTrigger>
            <TabsTrigger
              value="finance"
              className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white text-emerald-700 font-bold text-md"
            >
              Financeiro
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="Documentos">
            Change your password here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
