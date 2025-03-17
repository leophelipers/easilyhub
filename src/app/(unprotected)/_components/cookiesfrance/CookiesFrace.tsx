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

      {/* Avis sur les cookies */}
      <div className="fixed inset-0  text-white flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-6">
          <h2 className="text-xl font-semibold mb-4">
            Politique en matière de cookies
          </h2>
          <p className="text-sm mb-6">
            Ce site utilise des cookies pour améliorer la navigation, tout en
            respectant votre confidentialité conformément au RGPD. Nous
            n'utiliserons pas vos données à d'autres fins sans votre
            consentement explicite. Consultez notre Politique de confidentialité
            pour plus de détails. Gérez vos préférences ou appuyez sur Accepter
            pour autoriser l'utilisation des cookies{' '}
            <Link href={iframeSrc} passHref={true}>
              <Button variant={'ghost'}>Politique en matière de cookies</Button>
            </Link>
            .
          </p>
          <div className="flex justify-end space-x-4">
            <Link href={iframeSrc} passHref={true}>
              <Button variant="outline" className="whitespace-nowrap">
                Refuser
              </Button>
            </Link>
            <Link href={iframeSrc} passHref={true}>
              <Button className="whitespace-nowrap">Accepter</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Optionnel : superposition de contenu */}
      <div className="relative z-10 p-4">
        {/* Ajoutez tout contenu supplémentaire devant apparaître au-dessus de l'iframe ici */}
      </div>
    </main>
  )
}
