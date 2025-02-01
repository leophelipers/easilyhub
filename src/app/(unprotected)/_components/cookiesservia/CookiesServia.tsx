/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CookieNoticeProps {
  iframeSrc: string
}

export default function CookieNoticeServia({ iframeSrc }: CookieNoticeProps) {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Background iframe */}

      {/* Cookie Notice */}
      <div className="fixed inset-0  text-black flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-6">
          <h2 className="text-xl font-semibold mb-4">Политика колачића</h2>
          <p className="text-sm mb-6">
            Овај веб-сајт користи колачиће да побољша прегледање, поштујући вашу
            приватност у складу са ГДПР-ом. Нећемо користити ваше податке ни у
            које сврхе без вашег изричитог пристанка. За више детаља, погледајте
            нашу Политику приватности. Управљајте својим подешавањима или
            кликните на Прихвати да дозволите употребу колачића{' '}
            <Link href={iframeSrc} passHref={true}>
              <Button variant={'ghost'}>Политика колачића</Button>
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
