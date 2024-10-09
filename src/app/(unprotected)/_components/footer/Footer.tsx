'use client'

import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../../../../public/easilyBanco.png'

// export interface IFooterProps {} props: IAdminTopbarProps

export default function Footer() {
  return (
    <div className="md:mx-28 bg-black flex flex-col md:flex-row items-center justify-between py-8 gap-2">
      <div className="p-2 flex flex-col items-center justify-center w-full">
        <Image src={Logo} alt="logo" width={110} height={40} />
        <div className="flex gap-4 py-4">
          <div className="text-slate-500">© Copyright 2024 EasilyHub.</div>
          <div className="flex gap-4">
            <Link href={'/privacy-politics'}>Política de privacidade</Link>
            <Link href={'/terms'}>Termos de serviços</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
