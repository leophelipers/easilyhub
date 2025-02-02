/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CookieNoticeProps {
  iframeSrc: string
}

export default function CookieNoticeEspanha({ iframeSrc }: CookieNoticeProps) {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Background iframe */}

      {/* Cookie Notice */}
      <div className="fixed inset-0  text-black flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-6">
          <h2 className="text-xl font-semibold mb-4">Política de cookies</h2>
          <p className="text-sm mb-6">
            Esta página web utiliza cookies para mejorar la navegación,
            respetando su privacidad según el RGPD. No utilizaremos sus datos
            para ningún propósito sin su consentimiento expreso. Para más
            detalles, consulte nuestra Política de Privacidad. Gestione sus
            preferencias o haga clic en Aceptar para permitir el uso de cookies{' '}
            <Link href={iframeSrc} passHref={true}>
              <Button variant={'ghost'}>Política de cookies</Button>
            </Link>
            .
          </p>
          <div className="flex justify-end space-x-4">
            <Link href={iframeSrc} passHref={true}>
              <Button variant="outline" className="whitespace-nowrap">
                rechazar
              </Button>
            </Link>
            <Link href={iframeSrc} passHref={true}>
              <Button className="whitespace-nowrap">Aceptar</Button>
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
