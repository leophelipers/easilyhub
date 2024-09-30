/* eslint-disable react/no-unescaped-entities */
'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'

// export interface IFaqProps {} props: IAdminTopbarProps

export default function Faq() {
  return (
    <div className="md:mx-28 px-10 bg-[#1D1D1D] flex flex-col md:flex-row items-center justify-between py-8 gap-2">
      <div className="flex flex-col">
        <h1 className="font-['Bebas Neue'] font-bold text-brand-green text-5xl md:text-5xl">
          Perguntas Frequentes
        </h1>
        <p>Sentiu falta de alguma pergunta? Nos deixe saber por aqui:</p>
        <Button className="bg-brand-green text-white font-bold">
          Entre em contato conosco
        </Button>
      </div>
      <div className="p-2 flex flex-col items-center justify-start gap-4 w-full">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>
              Em quanto tempo recebo minhas comissões?
            </AccordionTrigger>
            <AccordionContent>
              Isso varia de produto a produto, entre em detalhes do produto para
              conferir.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              Quero colocar meu produto na EasilyHub como faço?
            </AccordionTrigger>
            <AccordionContent>
              Basta mandar um e-mail para "contato@easilyhub.com" com o título
              "PARCEIRO - PRODUTO" que nossa equipe te atenderá por lá.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              Sou influenciador, posso ser agenciado por vocês?
            </AccordionTrigger>
            <AccordionContent>
              Sim, claro! nosso time comercial está a sua disposição, basta
              entrar em contato no e-mail contato@easilyhub.com com o assunto:
              SOU INFLUENCIADOR. Nossa equipe seguirá com o seu atendimento.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>
              Entraram em contato comigo pela DM do instagram, é verdadeiro?
            </AccordionTrigger>
            <AccordionContent>
              Nossa equipe de prospecção ativa pode enviar sim directs, mas caso
              queira confirmar se é verdadeiro basta enviar um e-mail para
              contato@easilyhub.com com o título : "Confirmar DM"
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
