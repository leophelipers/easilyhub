'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { formatToBRL } from '@/lib/formatToReal'
import { useMutation, useQuery } from 'convex/react'
import { ArrowUpRight } from 'lucide-react'
import * as React from 'react'
import { api } from '../../../../../convex/_generated/api'

export default function WithdrawalRequest() {
  const easilyAccount = useQuery(api.easilyAccount.getEasilyAccount)
  const withdrawRequest = useMutation(api.withdraw.requestWithdrawal)

  const [amount, setAmount] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const { toast } = useToast()

  // This would typically come from your app's state management
  const availableBalance = 8750.0

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    // Validate the amount
    const withdrawalAmount = parseFloat(amount)
    if (isNaN(withdrawalAmount) || withdrawalAmount <= 50) {
      toast({
        title: 'Erro',
        description: 'Por favor, insira um valor válido para saque.',
        variant: 'destructive',
      })
      setIsLoading(false)
      return
    }

    if (withdrawalAmount > availableBalance) {
      toast({
        title: 'Saldo insuficiente',
        description: 'O valor solicitado excede o seu saldo disponível.',
        variant: 'destructive',
      })
      setIsLoading(false)
      return
    }

    await withdrawRequest({ amount: withdrawalAmount })

    toast({
      variant: 'success',
      title: 'Solicitação enviada',
      description: `Sua solicitação de saque de R$ ${withdrawalAmount.toFixed(2)} foi enviada com sucesso.`,
    })

    setAmount('')
    setIsLoading(false)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-stone-950">
        Solicitar Saque
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Saldo Disponível para Saque
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatToBRL(easilyAccount?.withdrawableBalance ?? 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Solicitar Saque</CardTitle>
            <CardDescription>Insira o valor que deseja sacar</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="amount">Valor do Saque</Label>
                  <Input
                    id="amount"
                    placeholder="Digite o valor"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    step="0.01"
                    min="50"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Processando...' : 'Solicitar Saque'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
