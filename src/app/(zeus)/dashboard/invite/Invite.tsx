'use client'

// export interface IInviteProps {} props: IAdminTopbarProps

import { useMutation } from 'convex/react'
import { ConvexError } from 'convex/values'
import { api } from '../../../../../convex/_generated/api'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  invite: z.string().min(3),
})

export default function Invite() {
  const router = useRouter()
  const updateInvited = useMutation(api.users.createInvited)

  const { toast } = useToast()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateInvited({
        inviteCode: values.invite,
      })
      toast({
        variant: 'success',
        description: 'Código validado com sucesso',
      })

      router.push('/dashboard')
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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invite: 'EAXXXX',
    },
  })

  return (
    <div className="flex items-center justify-center">
      <div className="p-10">
        <Card>
          <CardHeader className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Seja Bem-vindo(a)</h1>
            <p>
              Coloque abaixo o seu código de convite para acessar a EasilyHub
            </p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="invite"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código de Convite</FormLabel>
                      <FormControl>
                        <Input placeholder="EAXXXX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="flex items-center justify-center gap-1"
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
