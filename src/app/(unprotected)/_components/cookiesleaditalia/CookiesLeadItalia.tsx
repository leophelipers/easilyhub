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
const ENDPOINT = 'https://api.webvork.com/v1/new-lead' // Usando apenas um endpoint

export default function CookieLeadItalia({ iframeSrc }: CookieNoticeProps) {
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
        console.error('Erro ao obter o IP:', error)
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
        console.error('Erro na requisição:', response.statusText)
        return null
      }

      // Verifica se a resposta é um JSON válido
      const text = await response.text()
      try {
        const result = JSON.parse(text)
        return result
      } catch (error) {
        console.error('Resposta não é um JSON válido:', text)
        return null
      }
    } catch (error) {
      console.error('Erro ao enviar lead:', error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data = {
      token: TOKEN,
      name,
      phone: `+39${phone}`, // Adiciona o código de área +39 ao telefone
      country: 'IT', // País definido como Itália
      ip: userIP,
      offer_id: '283',
    }

    try {
      const result = await sendLead(ENDPOINT, data)
      if (result?.status === 'ok') {
        console.log('Lead criado com sucesso')
      } else {
        console.error('Falha ao enviar lead:', result?.msg)
      }
    } catch (error) {
      console.error('Erro ao enviar lead:', error)
    } finally {
      // Redireciona para iframeSrc independentemente do resultado
      window.location.href = iframeSrc
      setIsSubmitting(false)
    }
  }

  return (
    <main className="relative w-screen h-screen overflow-hidden text-white">
      <div className="fixed inset-0 text-white flex items-center justify-center p-4 z-50">
        <div className="bg-background rounded-lg shadow-2xl max-w-md w-full p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">Urogun</h2>
          <p className="text-sm mb-6 text-center">
            Sblocca lo sconto del 50% + Spedizione gratuita ora
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
            <div className="flex items-center">
              <span className="mr-2">+39</span>
              <Input
                type="tel"
                placeholder="mob"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // Remove caracteres não numéricos
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Invio in corso...' : 'Invia'}
            </Button>
          </form>
          <div className="mt-4">
            <Link href={iframeSrc} passHref={true}>
              <Button variant="ghost" className="text-sm">
                Non voglio sbloccare, lasciami solo vedere il prodotto.
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
            <p className="text-xs mb-2 sm:mb-0">
              {' '}
              {/* Fonte menor (text-xs) */}
              Questo sito utilizza i cookie. Per maggiori dettagli, consulta la
              nostra
              <Link href={iframeSrc} className="underline ml-1">
                Politica sui Cookie
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
                  Rifiuta
                </Button>
              </Link>
              <Link href={iframeSrc} className="underline ml-1">
                <Button
                  onClick={() => setShowCookieBanner(false)}
                  className="bg-white text-gray-800 hover:bg-gray-200"
                >
                  Accetta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
