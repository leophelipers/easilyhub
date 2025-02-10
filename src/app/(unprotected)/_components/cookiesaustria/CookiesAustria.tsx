/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CookieNoticeProps {
  iframeSrc: string
}

export default function CookieNoticeOesterreich({
  iframeSrc,
}: CookieNoticeProps) {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Hintergrund-Iframe */}

      {/* Cookie-Hinweis */}
      <div className="fixed inset-0 text-black flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-6">
          <h2 className="text-xl font-semibold mb-4">Cookie-Richtlinie</h2>
          <p className="text-sm mb-6">
            Diese Website verwendet Cookies, um die Navigation zu verbessern und
            respektiert Ihre Privatsphäre gemäß der DSGVO. Ihre Daten werden
            ohne Ihre ausdrückliche Zustimmung nicht verwendet. Für weitere
            Details lesen Sie bitte unsere Datenschutzrichtlinie. Verwalten Sie
            Ihre Präferenzen oder klicken Sie auf „Akzeptieren“, um die Nutzung
            von Cookies zu erlauben{' '}
            <Link href={iframeSrc} passHref={true}>
              <Button variant={'ghost'}>Cookie-Richtlinie</Button>
            </Link>
            .
          </p>
          <div className="flex justify-end space-x-4">
            <Link href={iframeSrc} passHref={true}>
              <Button variant="outline" className="whitespace-nowrap">
                Ablehnen
              </Button>
            </Link>
            <Link href={iframeSrc} passHref={true}>
              <Button className="whitespace-nowrap">Akzeptieren</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Optional: Overlay für Inhalte */}
      <div className="relative z-10 p-4">
        {/* Zusätzliche Inhalte, die über dem Iframe erscheinen sollen */}
      </div>
    </main>
  )
}
