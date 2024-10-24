'use client'

import Topbar from '@/components/landingPage/topbar/Topbar'
import dynamic from 'next/dynamic'
import Cta from './_components/cta/Cta'
import Faq from './_components/faq/Faq'
import Footer from './_components/footer/Footer'
import Hero from './_components/hero/Hero'
import HowItWorks from './_components/how/HowItWorks'
import Partner from './_components/partner/Partner'
import Why from './_components/why/Why'
const CookieConsent = dynamic(() => import('react-cookie-consent'), {
  ssr: false,
})

// export interface IHomeProps {} props: IAdminTopbarProps

export default function Home() {
  return (
    <div className="flex flex-col bg-slate-50 h-full">
      <div className="">
        <Topbar />
      </div>
      <div id="hero">
        <Hero />
      </div>
      <div className="w-full bg-[#1D1D1D]" id="how">
        <HowItWorks />
      </div>
      <div id="why">
        <Why />
      </div>
      <div className="w-full bg-[#1D1D1D]" id="cta">
        <Cta />
      </div>
      <div className="w-full bg-brand-green" id="cta">
        <Partner />
      </div>
      <div className="w-full bg-[#1D1D1D]" id="faq">
        <Faq />
      </div>
      <div className="w-full bg-black">
        <Footer />
      </div>
      <CookieConsent
        location="bottom"
        buttonText="Aceitar"
        cookieName="easilyhubCookieConsent"
        expires={365}
      >
        Nós usamos cookies para melhorar sua experiência
      </CookieConsent>
    </div>
  )
}
