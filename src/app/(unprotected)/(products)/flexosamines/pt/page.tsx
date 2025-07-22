'use client'

import { useMutation } from 'convex/react'
import Script from 'next/script'
import { useEffect } from 'react'
import { api } from '../../../../../../convex/_generated/api'
import CookieNoticePortugal from '../../../_components/cookiesportugal/CookiesPortugal'

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
      {/* Este script é carregado com a estratégia "beforeInteractive".
        Isso garante que ele seja injetado e executado antes de qualquer código React 
        da página, tornando-o uma das primeiras coisas a carregar.
        <!-- Start Filtripixel tracking (filtripixel.minify.js) -->
<!-- Place at the end of the head and before the </head> tag -->
<script data-render-head="true" src="https://static.filtripixel.io/filtripixel.minify.js?pixelId=093a8a03-2b72-4081-a57e-80bf2adf42ba"></script>
<!-- End Filtripixel tracking (filtripixel.minify.js) -->
      */}
      <Script
        data-render-head="true"
        id="filtripixel-tracking"
        src="https://static.filtripixel.io/filtripixel.minify.js?pixelId=093a8a03-2b72-4081-a57e-80bf2adf42ba"
        strategy="beforeInteractive"
      />

      <div className='relative h-screen w-full bg-[url("/ultravix.png")] bg-cover bg-center'>
        <div className="absolute inset-0 backdrop-blur-lg bg-black/30"></div>
        <div className="relative z-10 flex justify-center items-center h-full text-white text-2xl">
          <CookieNoticePortugal iframeSrc="https://pt.doctorvitalcare.com/?utm_source=1347" />
        </div>
      </div>
    </>
  )
}
