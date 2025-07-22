/* eslint-disable @next/next/no-sync-scripts */
'use client'

import { useMutation } from 'convex/react'
import Head from 'next/head'
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
      <Head>
        <script
          data-render-head="true"
          src="https://static.filtripixel.io/filtripixel.minify.js?pixelId=44852393-73d0-4d32-a06d-83f3d52e2725"
        />
      </Head>
      <div className='relative h-screen w-full bg-[url("/ultravix.png")] bg-cover bg-center'>
        <div className="absolute inset-0 backdrop-blur-lg bg-black/30"></div>
        <div className="relative z-10 flex justify-center items-center h-full text-white text-2xl">
          <CookieNoticePortugal iframeSrc="https://pt.doctorvitalcare.com/?utm_source=1347" />
        </div>
      </div>
    </>
  )
}
