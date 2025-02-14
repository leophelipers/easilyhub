/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface CookieNoticeProps {
  iframeSrc: string
}

const TOKEN = 'db557a118749859373c5b3a891aecb04' // Substitua pelo seu token
const ENDPOINT_1 = 'https://api.webvork.com/v1/new-lead'
const ENDPOINT_2 = 'https://api2.webvork.com/v1/new-lead'

export default function CookieNoticeTurquia({ iframeSrc }: CookieNoticeProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [showCookieBanner, setShowCookieBanner] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [userIP, setUserIP] = useState('')

  useEffect(() => {
    const getIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        setUserIP(data.ip)
      } catch (error) {
        console.error('Error fetching IP:', error)
        setUserIP('0.0.0.0')
      }
    }
    getIP()
  }, [])

  const sendLead = async (endpoint: string, data: any) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(data).toString(),
      })

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`)
      }

      const result = await response.json()
      return result
    } catch (error) {
      console.error('Erro ao enviar lead:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const data = {
        token: TOKEN,
        name,
        phone,
        country: 'CH',
        ip: userIP,
        offer_id: '283',
      }

      let success = false
      let count = 3

      while (count--) {
        try {
          const result1 = await sendLead(ENDPOINT_1, data)
          if (result1.status === 'ok') {
            success = true
            break
          }
        } catch (error) {
          console.error('Falha ao enviar para ENDPOINT_1:', error)
        }

        try {
          const result2 = await sendLead(ENDPOINT_2, data)
          if (result2.status === 'ok') {
            success = true
            break
          }
        } catch (error) {
          console.error('Falha ao enviar para ENDPOINT_2:', error)
        }

        await new Promise((resolve) => setTimeout(resolve, 2000)) // Espera 2 segundos
      }

      if (!success) {
        throw new Error('Falha ao enviar lead após várias tentativas.')
      }

      console.log('Lead criado com sucesso')
      setName('')
      setPhone('')
      window.location.href = iframeSrc
    } catch (error) {
      console.error('Error:', error)
      alert('Houve um erro ao enviar seus dados. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <div className="fixed inset-0 text-black flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Urogun</h2>
          <p className="text-sm mb-6 text-center">
            Desbloqueie o desconto de 50% + Frete grátis agora
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
            />
            <Input
              type="tel"
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              minLength={10}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </Button>
          </form>
          <div className="mt-4">
            <Link href={iframeSrc} passHref={true}>
              <Button variant="ghost" className="text-sm">
                Não quero desbloquear, apenas me deixe ver o produto.
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
            <p className="text-sm mb-2 sm:mb-0">
              Este site usa cookies. Para mais detalhes, consulte nossa
              <Link href={iframeSrc} className="underline ml-1">
                Política de Cookies
              </Link>
              .
            </p>
            <div className="flex space-x-2">
              <Link href={iframeSrc} className="underline ml-1">
                <Button
                  variant="outline"
                  onClick={() => setShowCookieBanner(false)}
                  className="text-white border-white hover:bg-white hover:text-gray-800"
                >
                  Recusar
                </Button>
              </Link>
              <Link href={iframeSrc} className="underline ml-1">
                <Button
                  onClick={() => setShowCookieBanner(false)}
                  className="bg-white text-gray-800 hover:bg-gray-200"
                >
                  Aceitar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
