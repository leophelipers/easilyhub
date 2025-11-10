'use client'

import CookieNoticePoland from '@/app/(unprotected)/_components/cookiespolonia/CookiesPolonia'
import { useMutation } from 'convex/react'
import Script from 'next/script'
import { useEffect } from 'react'
import { api } from '../../../../../../convex/_generated/api'

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
      <Script
        data-render-head="true"
        id="filtripixel-tracking"
        src="https://static.filtripixel.io/filtripixel.minify.js?pixelId=d6931546-5f6a-40ca-bc4d-e9fd6c8e2cfd"
        strategy="beforeInteractive"
      />
      <div className='relative h-screen w-full bg-[url("/ultravix.png")] bg-cover bg-center'>
        <div className="absolute inset-0 backdrop-blur-lg bg-black/30"></div>
        <div className="relative z-10 flex justify-center items-center h-full text-white text-2xl">
          <CookieNoticePoland iframeSrc="https://a70l7.doctormurin.com/l" />
        </div>
      </div>
    </>
  )
}
