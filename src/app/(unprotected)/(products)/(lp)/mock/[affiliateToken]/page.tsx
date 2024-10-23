'use client'

import { useMutation } from 'convex/react'
import { useEffect } from 'react'
import { api } from '../../../../../../../convex/_generated/api'
import { Id } from '../../../../../../../convex/_generated/dataModel'

const productId = 'js75gvn0hfceg8c8sqhrnb488s734wmt' // String do ID do produto

export default function ProductPage({
  params,
}: {
  params: { affiliateToken: string }
}) {
  const { affiliateToken } = params
  const registerClick = useMutation(api.clicks.createClick)

  useEffect(() => {
    const existingCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('affiliateToken='))

    if (!existingCookie) {
      // Registra o clique com o ID do produto no formato correto
      registerClick({
        affiliateToken, // Passando o affiliateToken
        productId: productId as Id<'products'>, // Aqui passa o ID no formato esperado
        clickOrigin: 'web',
      })

      // Define o cookie
      document.cookie = `affiliateToken=${affiliateToken}; path=/; max-age=${60 * 60 * 24 * 30};`
    }
  }, [affiliateToken, registerClick])

  return (
    <div>
      <h1>Produto Fixo: {productId}</h1>
      <p>Afiliado: {affiliateToken}</p>
      {/* Outras informações do produto */}
    </div>
  )
}
