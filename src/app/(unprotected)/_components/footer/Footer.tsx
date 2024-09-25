'use client'

import { Button } from '@/components/ui/button'

// export interface IFooterProps {} props: IAdminTopbarProps

export default function Footer() {
  return (
    <div className="md:mx-28 bg-black flex flex-col md:flex-row items-center justify-between py-8 gap-2">
      <div className="p-2 flex flex-col">
        <h1 className="font-['Bebas Neue'] font-bold text-6xl text-brand-green">
          Espaço Rodapé
        </h1>
        <p>Sentiu falta de alguma pergunta? Nos deixe saber por aqui:</p>
        <Button className="bg-brand-green text-white font-bold">
          Entre em contato conosco
        </Button>
      </div>
    </div>
  )
}
