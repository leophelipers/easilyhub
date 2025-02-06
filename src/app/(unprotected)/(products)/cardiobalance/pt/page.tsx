'use client'

import { useMutation } from 'convex/react'
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
    <div className='relative h-screen w-full bg-[url("/ultravix.png")] bg-cover bg-center'>
      <div className="absolute inset-0 backdrop-blur-lg bg-black/30"></div>
      <div className="relative z-10 flex justify-center items-center h-full text-white text-2xl">
        <CookieNoticePortugal iframeSrc="https://xlg5u.doctortrf.com/l" />
      </div>
    </div>
  )
}
