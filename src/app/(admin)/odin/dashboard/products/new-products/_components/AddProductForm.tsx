'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  heroImage: z.string().url('Must be a valid URL'),
  linkSalesPage: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  linkLeadsPage: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  comissionValue: z.string().min(1, 'Commission value is required'),
  comissionType: z.string().min(1, 'Commission type is required'),
  easilyComissionRate: z.number().min(0).optional(),
  lastSaleTimestamp: z.number().optional(),
  paymentPlataform: z.string().optional(),
  paymentPlataformId: z.string().optional(),
  visible: z.boolean().optional(),
})

export default function AddProductForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      heroImage: '',
      linkSalesPage: '',
      linkLeadsPage: '',
      comissionValue: '',
      comissionType: '',
      visible: true,
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      // Here you would typically call your Convex mutation
      // For example:
      // await addProduct(values)

      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      console.log('Form values:', values)
      toast({
        title: 'Product added',
        description: 'The product has been successfully added.',
      })
      router.push('/products') // Redirect to products list page
    } catch (error) {
      console.error('Failed to add product:', error)
      toast({
        title: 'Error',
        description:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Product description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="heroImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkSalesPage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sales Page URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/sales" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkLeadsPage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leads Page URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/leads" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comissionValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commission Value</FormLabel>
              <FormControl>
                <Input placeholder="10.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comissionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commission Type</FormLabel>
              <FormControl>
                <Input placeholder="Percentage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="easilyComissionRate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Easy Commission Rate (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="5"
                  {...field}
                  onChange={(e) => {
                    const value =
                      e.target.value === '' ? undefined : Number(e.target.value)
                    field.onChange(value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentPlataform"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Platform (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="PayPal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="paymentPlataformId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Platform ID (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="12345" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visible"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Visible</FormLabel>
                <FormDescription>
                  Make this product visible to users
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </Button>
      </form>
    </Form>
  )
}
