'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from 'convex/react'
import { ConvexError } from 'convex/values'
import { CircleArrowRight, Info } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../../../../convex/_generated/api'

// export interface IProfileProps {} props: IAdminTopbarProps

const validateCpfDigits = (cpf: string) => {
  let sum
  let rest

  // Remove caracteres não numéricos (pontos, hífen)
  cpf = cpf.replace(/[^\d]+/g, '')

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false

  // Validação do primeiro dígito verificador
  sum = 0
  for (let i = 1; i <= 9; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i)
  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(cpf.substring(9, 10))) return false

  // Validação do segundo dígito verificador
  sum = 0
  for (let i = 1; i <= 10; i++)
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i)
  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(cpf.substring(10, 11))) return false

  return true
}

const formSchema = z.object({
  cpf: z
    .string()
    .min(11, { message: 'CPF deve ter no mínimo 11 caracteres' })
    .max(14, { message: 'CPF deve ter no máximo 14 caracteres' }) // Considerando o formato com pontos e hífen
    .refine((cpf) => validateCpfDigits(cpf), {
      message: 'CPF inválido',
    }),
  cnpj: z.boolean().default(false).optional(),
})

export default function Profile() {
  const user = useQuery(api.settings.profileData)
  const cpfMutation = useMutation(api.settings.updateCpf)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await cpfMutation({
        cpf: values.cpf,
        cnpj: values.cnpj,
      })
      toast({
        variant: 'success',
        description: 'Cpf alterado com sucesso',
      })
    } catch (error: unknown) {
      let message: string

      if (error instanceof ConvexError) {
        message = (error.data as { message: string }).message
      } else if (error instanceof Error) {
        message = error.message
      } else {
        message = 'An unexpected error occurred'
      }

      toast({
        variant: 'destructive',
        description: message,
      })
    }
  }

  return (
    <div className="w-full h-full p-6 rounded shadow flex flex-col items-center justify-center gap-2">
      <div className="w-full">
        <Card className="w-full flex items-center justify-center flex-col">
          <CardHeader>
            <CardTitle className="flex flex-row gap-2 items-center justify-center">
              Informações Básicas
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="text-brand-green" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Esses dados não podem ser alterados diretamente, se houver
                      algo errado contate o suporte
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Label>Nome</Label>
            <Input
              placeholder={user?.name}
              disabled={true}
              className="w-full text-stone-800"
            />
            <Input
              placeholder={user?.lastName}
              disabled={true}
              className="w-full text-stone-800"
            />
            <Label>E-mail</Label>
            <Input
              placeholder={user?.email}
              disabled={true}
              className="w-full text-stone-800"
            />
          </CardContent>
        </Card>
      </div>
      <div className="w-full">
        <Card className="w-full flex items-center justify-center flex-col">
          <CardHeader>
            <CardTitle className="flex flex-row gap-2 items-center justify-center">
              Documentos
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="text-brand-green" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Em qualquer alteração você terá que enviar o documento
                      comprovando
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {user?.cpf !== undefined ? (
                  <Input placeholder={user?.cpf} disabled={true} />
                ) : (
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input placeholder="000.000.000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>
                          Deseja cadastrar um cnpj posteriormente?
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="bg-slate-600"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="flex items-center justify-center gap-1 w-full"
                >
                  Enviar
                  <CircleArrowRight />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
