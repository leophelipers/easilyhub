'use client'

import { useMutation } from 'convex/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { api } from '../../../../../../convex/_generated/api'
import CookieNoticeItalia from '../../../_components/cookiesItalia/CookiesItalia'

export default function App() {
  const saveClick = useMutation(api.drcashclicks.create)

  useEffect(() => {
    const getUrlParameter = (name: string): string | null => {
      const urlParams = new URLSearchParams(window.location.search)
      return urlParams.get(name)
    }

    const gclid = getUrlParameter('gclid')

    if (gclid) {
      saveClick({
        gclid,
        fullUrl: window.location.href,
      })
    }
  }, [saveClick])

  return (
    <>
      <Head>
        {/*
          Usando dangerouslySetInnerHTML para injetar um script inline.
          Este script inline cria dinamicamente a tag do script do Filtripixel e a adiciona ao <head>.
          Este método é uma alternativa robusta quando o <Script> do Next.js não funciona como esperado
          com certos scripts de terceiros, forçando o carregamento de forma mais direta.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = 'https://static.filtripixel.io/filtripixel.minify.js?pixelId=9c45903b-8fef-4f32-b253-bb4c8c868e10';
                script.async = true;
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </Head>
      <div className='relative h-screen w-full bg-[url("/ultravix.png")] bg-cover bg-center'>
        <div className="absolute inset-0 backdrop-blur-lg bg-black/30"></div>
        <div className="relative z-11 flex justify-center items-center h-full text-white text-2xl ">
          <CookieNoticeItalia iframeSrc="https://it4.doctorhealthpro.com/?utm_source=1591" />
        </div>
      </div>
    </>
  )
}
