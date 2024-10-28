import { ConvexClientProvider } from '@/components/providers/ConvexClientProvider'
import { Toaster } from '@/components/ui/toaster'
import { GoogleTagManager } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { EdgeStoreProvider } from '../lib/edgestore'
// eslint-disable-next-line camelcase
import { ModalProvider } from '@/components/providers/ModalProvider'
// eslint-disable-next-line camelcase
import { Bebas_Neue, Poppins } from 'next/font/google'
import Head from 'next/head'
import './globals.css'

const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'EasilyHub',
  description: 'Facilitando seu dia a dia de vendas',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="impact-site-verification"
          value="82375743-9a63-4062-b0dd-28553086037f"
        ></meta>
      </Head>
      <body className={`${poppins.className}  ${bebas.className} antialiased`}>
        <ConvexClientProvider>
          <ModalProvider />
          <GoogleTagManager gtmId="GTM-N59W73TS" />
          <EdgeStoreProvider>{children}</EdgeStoreProvider>

          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  )
}
