import { ConvexClientProvider } from '@/components/providers/ConvexClientProvider'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { ModalProvider } from '@/components/providers/ModalProvider'
// eslint-disable-next-line camelcase
import { Bebas_Neue, Poppins } from 'next/font/google'
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
      <body className={`${poppins.className}  ${bebas.className} antialiased`}>
        <ConvexClientProvider>
          <ModalProvider />
          {children}
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  )
}
