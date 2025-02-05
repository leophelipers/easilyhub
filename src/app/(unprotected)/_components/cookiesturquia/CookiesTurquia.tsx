/* eslint-disable react/no-unescaped-entities */
'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CookieNoticeProps {
  iframeSrc: string
}

export default function CookieNoticeTurquia({ iframeSrc }: CookieNoticeProps) {
  return (
    <main className="relative w-screen h-screen overflow-hidden">
      {/* Arka plan iframe */}

      {/* Çerez Bildirimi */}
      <div className="fixed inset-0 text-black flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-6">
          <h2 className="text-xl font-semibold mb-4">Çerez Politikası</h2>
          <p className="text-sm mb-6">
            Bu web sitesi, gezinmeyi iyileştirmek için çerezler kullanır ve
            KVKK'ya uygun olarak gizliliğinize saygı duyar. Verilerinizi açık
            rızanız olmadan hiçbir amaçla kullanmayacağız. Daha fazla detay için
            Gizlilik Politikamızı inceleyin. Tercihlerinizi yönetin veya çerez
            kullanımına izin vermek için Kabul Et'e tıklayın{' '}
            <Link href={iframeSrc} passHref={true}>
              <Button variant={'ghost'}>Çerez Politikası</Button>
            </Link>
            .
          </p>
          <div className="flex justify-end space-x-4">
            <Link href={iframeSrc} passHref={true}>
              <Button variant="outline" className="whitespace-nowrap">
                Reddet
              </Button>
            </Link>
            <Link href={iframeSrc} passHref={true}>
              <Button className="whitespace-nowrap">Kabul Et</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Opsiyonel: İçerik kaplaması */}
      <div className="relative z-10 p-4">
        {/* İframe üzerinde görünmesi gereken ek içerikleri buraya ekleyin */}
      </div>
    </main>
  )
}
