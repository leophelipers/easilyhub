'use client'

import Topbar from '@/components/landingPage/topbar/Topbar'
import Cta from './_components/cta/Cta'
import Faq from './_components/faq/Faq'
import Footer from './_components/footer/Footer'
import Hero from './_components/hero/Hero'
import HowItWorks from './_components/how/HowItWorks'
import Why from './_components/why/Why'

// export interface IHomeProps {} props: IAdminTopbarProps

export default function Home() {
  return (
    <div className="flex flex-col bg-slate-50 h-full">
      <div className="">
        <Topbar />
      </div>
      <div>
        <Hero />
      </div>
      <div className="w-full bg-[#1D1D1D]">
        <HowItWorks />
      </div>
      <div>
        <Why />
      </div>
      <div className="w-full bg-[#1D1D1D]">
        <Cta />
      </div>
      <div className="w-full bg-[#1D1D1D]">
        <Faq />
      </div>
      <div className="w-full bg-black">
        <Footer />
      </div>
    </div>
  )
}
