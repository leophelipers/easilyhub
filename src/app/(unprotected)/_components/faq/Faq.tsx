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
    <div className="md:mx-28 bg-[#1D1D1D] flex flex-col md:flex-row items-center justify-between py-8 gap-2">
      <div className="p-2 flex flex-col">
        <h1 className="font-['Bebas Neue'] font-bold text-6xl text-brand-green">
          perguntas frequentes
        </h1>
        <p>Sentiu falta de alguma pergunta? Nos deixe saber por aqui:</p>
        <Button className="bg-brand-green text-white font-bold">
          Entre em contato conosco
        </Button>
      </div>
      <div className="p-2 flex flex-col items-center justify-start gap-4 w-full">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
