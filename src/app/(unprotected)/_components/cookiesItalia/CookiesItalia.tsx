/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CookieNoticeProps {
  iframeSrc: string
}

export default function CookieNoticeItalia({ iframeSrc }: CookieNoticeProps) {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Background iframe */}

      {/* Cookie Notice */}
      <div className="fixed inset-0  text-black flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-6">
          <h2 className="text-xl font-semibold mb-4">Politica sui Cookie</h2>
          <p className="text-sm mb-6">
            Questo sito, usa cookie per migliorare la navigazione, rispettando
            la tua privacy secondo il GDPR. Non utilizzeremo i tuoi dati per
            nessuno scopo senza il tuo esplicito consenso. Consulta la nostra
            Politica sulla riservatezza per dettagli. Gestisci le tue preferenze
            o premi Accetto per consentire l' uso dei cookie{' '}
            <Link href={iframeSrc} passHref={true}>
              <Button variant={'ghost'}>Politica sui Cookie</Button>
            </Link>
            .
          </p>
          <div className="flex justify-end space-x-4">
            <Link href={iframeSrc} passHref={true}>
              <Button variant="outline" className="whitespace-nowrap">
                Rifiuta
              </Button>
            </Link>
            <Link href={iframeSrc} passHref={true}>
              <Button className="whitespace-nowrap">Acceto</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Optional: Content overlay */}
      <div className="relative z-10 p-4">
        {/* Add any additional content that should appear over the iframe here */}
      </div>
    </main>
  )
}
