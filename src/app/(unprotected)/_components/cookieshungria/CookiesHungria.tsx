/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CookieNoticeProps {
  iframeSrc: string
}

export default function CookieNoticeHungary({ iframeSrc }: CookieNoticeProps) {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Background iframe */}

      {/* Cookie Notice */}
      <div className="fixed inset-0  text-black flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-6">
          <h2 className="text-xl font-semibold mb-4">Cookie szabályzat</h2>
          <p className="text-sm mb-6">
            Ez a weboldal sütiket használ a böngészés javítása érdekében,
            tiszteletben tartva az Ön adatvédelmét a GDPR szerint. Az Ön
            kifejezett hozzájárulása nélkül nem fogjuk felhasználni adatait
            semmilyen célra. Részletekért tekintse meg az Adatvédelmi
            Szabályzatunkat. Kezelje preferenciáit, vagy kattintson az Elfogadom
            gombra a sütik használatának engedélyezéséhez{' '}
            <Link href={iframeSrc} passHref={true}>
              <Button variant={'ghost'}>Cookie szabályzat</Button>
            </Link>
            .
          </p>
          <div className="flex justify-end space-x-4">
            <Link href={iframeSrc} passHref={true}>
              <Button variant="outline" className="whitespace-nowrap">
                Elutasít
              </Button>
            </Link>
            <Link href={iframeSrc} passHref={true}>
              <Button className="whitespace-nowrap">Elfogadom</Button>
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
