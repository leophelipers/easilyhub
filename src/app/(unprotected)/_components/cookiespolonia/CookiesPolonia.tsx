/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CookieNoticeProps {
  iframeSrc: string
}

export default function CookieNoticePoland({ iframeSrc }: CookieNoticeProps) {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Background iframe */}

      {/* Cookie Notice */}
      <div className="fixed inset-0 text-black flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-6">
          <h2 className="text-xl font-semibold mb-4">Polityka plików cookie</h2>
          <p className="text-sm mb-6">
            Ta strona używa plików cookie, aby poprawić nawigację, szanując
            Twoją prywatność zgodnie z RODO. Nie będziemy wykorzystywać Twoich
            danych do żadnych celów bez Twojej wyraźnej zgody. Zapoznaj się z
            naszą Polityką prywatności, aby uzyskać więcej informacji. Zarządzaj
            swoimi preferencjami lub kliknij „Akceptuję”, aby zezwolić na użycie
            plików cookie{' '}
            <Link href={iframeSrc} passHref={true}>
              <Button variant={'ghost'}>Polityka plików cookie</Button>
            </Link>
            .
          </p>
          <div className="flex justify-end space-x-4">
            <Link href={iframeSrc} passHref={true}>
              <Button variant="outline" className="whitespace-nowrap">
                Odrzuć
              </Button>
            </Link>
            <Link href={iframeSrc} passHref={true}>
              <Button className="whitespace-nowrap">Akceptuję</Button>
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
