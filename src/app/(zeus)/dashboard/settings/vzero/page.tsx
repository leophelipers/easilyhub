'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from 'convex/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { api } from '../../../../../../convex/_generated/api'

const userSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').optional(),
  lastName: z
    .string()
    .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
    .optional(),
  email: z.string().email('Email inválido').optional(),
  cpf: z
    .string()
    .regex(/^\d{11}$/, 'CPF deve conter 11 dígitos')
    .optional(),
  cnpj: z
    .string()
    .regex(/^\d{14}$/, 'CNPJ deve conter 14 dígitos')
    .optional(),
  isCnpj: z.boolean().optional(),
  address: z
    .string()
    .min(5, 'Endereço deve ter pelo menos 5 caracteres')
    .optional(),
  addressNumber: z.string().optional(),
  addressComplement: z.string().optional(),
  cep: z
    .string()
    .regex(/^\d{8}$/, 'CEP deve conter 8 dígitos')
    .optional(),
  bank: z
    .string()
    .min(2, 'Nome do banco deve ter pelo menos 2 caracteres')
    .optional(),
  bankAccountNumber: z
    .string()
    .min(5, 'Número da conta deve ter pelo menos 5 caracteres')
    .optional(),
  bankAccountType: z.string().optional(),
  role: z.string().optional(),
  easilyPartnerCode: z.string().optional(),
  referatedBy: z.string().optional(),
  referallCount: z.number().int().nonnegative().optional(),
  firstSale: z.boolean().optional(),
  comissionPartner: z.number().nonnegative().optional(),
  affiliateToken: z.string().optional(),
  daysToUnlock: z.number().int().nonnegative().optional(),
  minEarlyWithdrawal: z.number().nonnegative().optional(),
  earlyWithdrawalFee: z.number().min(0).max(100).optional(),
})

export default function UserConfiguration() {
  const user = useQuery(api.users.getUser)
  const updateUser = useMutation(api.users.updateUser)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (user) {
      form.reset(user)
    }
  }, [user, form])

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      await updateUser({
        userId: user?._id,
        ...values,
      })
      toast({
        title: 'Configurações atualizadas',
        description: 'Suas informações foram atualizadas com sucesso.',
        variant: 'success',
      })
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao atualizar suas informações.',
        variant: 'destructive',
      })
    }
  }

  if (!user) {
    return <div>Carregando...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-stone-950">
        Configurações do Usuário
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList>
              <TabsTrigger value="personal">Informações Pessoais</TabsTrigger>
              <TabsTrigger value="address">Endereço</TabsTrigger>
              <TabsTrigger value="bank">Informações Bancárias</TabsTrigger>
              <TabsTrigger value="affiliate">
                Informações de Afiliado
              </TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>
                    Atualize suas informações pessoais aqui.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobrenome</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isCnpj"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Pessoa Jurídica
                          </FormLabel>
                          <FormDescription>
                            Ative se você é uma pessoa jurídica.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {form.watch('isCnpj') && (
                    <FormField
                      control={form.control}
                      name="cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNPJ</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="address">
              <Card>
                <CardHeader>
                  <CardTitle>Endereço</CardTitle>
                  <CardDescription>Atualize seu endereço aqui.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Endereço</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addressNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="addressComplement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cep"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="bank">
              <Card>
                <CardHeader>
                  <CardTitle>Informações Bancárias</CardTitle>
                  <CardDescription>
                    Atualize suas informações bancárias aqui.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="bank"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Banco</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bankAccountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número da Conta</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bankAccountType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de Conta</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo de conta" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="corrente">
                              Conta Corrente
                            </SelectItem>
                            <SelectItem value="poupança">
                              Conta Poupança
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="affiliate">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Afiliado</CardTitle>
                  <CardDescription>
                    Visualize suas informações de afiliado aqui.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Função</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="easilyPartnerCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Código de Parceiro</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="referallCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Indicações</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="comissionPartner"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Comissão de Parceiro (%)</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="affiliateToken"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Token de Afiliado</FormLabel>
                        <FormControl>
                          <Input {...field} readOnly />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <Button type="submit">Salvar Alterações</Button>
        </form>
      </Form>
    </div>
  )
}
