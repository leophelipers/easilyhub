'use client'
import { useMutation } from 'convex/react'
import { useState } from 'react'
import { api } from '../../../../../convex/_generated/api'
import { Id } from '../../../../../convex/_generated/dataModel'

export default function MockSale() {
  const [productId, setProductId] = useState<string>('')

  // Use the mutation from Convex
  const recordSale = useMutation(api.sales.recordSale)

  // Função para converter o ID do produto para o tipo Id<'products'>
  const handleSale = async () => {
    const response = await recordSale({
      productId: productId as Id<'products'>,
    })

    console.log(response)
  }

  return (
    <div>
      <h1>Testar Mock de Venda</h1>

      <input
        type="text"
        placeholder="Insira o ID do Produto"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={handleSale}>Registrar Venda</button>
    </div>
  )
}
