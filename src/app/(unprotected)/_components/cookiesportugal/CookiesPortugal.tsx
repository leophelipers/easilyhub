/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CookieNoticeProps {
  iframeSrc: string
}

export default function CookieNoticePortugal({ iframeSrc }: CookieNoticeProps) {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Background iframe */}

      {/* Cookie Notice */}
      <div className="fixed inset-0 bg-white/85 text-black flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-6">
          <h2 className="text-xl font-semibold mb-4">Politica sui Cookie</h2>
          <p className="text-sm mb-6">
            Este site utiliza cookies para melhorar a navegação, respeitando a
            tua privacidade de acordo com o RGPD. Não utilizaremos os teus dados
            para qualquer finalidade sem o teu consentimento explícito. Consulta
            a nossa Política de Privacidade para mais detalhes. Gere as tuas
            preferências ou clica em Aceito para permitir o uso dos cookies{' '}
            <Link href={iframeSrc} passHref={true}>
              <Button variant={'ghost'}>Política de Cookies</Button>
            </Link>
            .
          </p>
          <div className="flex justify-end space-x-4">
            <Link href={iframeSrc} passHref={true}>
              <Button variant="outline" className="whitespace-nowrap">
                Recusar
              </Button>
            </Link>
            <Link href={iframeSrc} passHref={true}>
              <Button className="whitespace-nowrap">Aceito</Button>
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
