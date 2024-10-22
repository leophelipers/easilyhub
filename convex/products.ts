/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { v } from 'convex/values'
import { Id } from './_generated/dataModel'
import { query } from './_generated/server'

export const getProducts = query({
  handler: async (ctx) => {
    const products = await ctx.db
      .query('products')
      .filter((q) => q.eq(q.field('visible'), true))
      .collect()

    return products
  },
})

export const getProductById = query({
  args: { id: v.string() },
  handler: async (ctx, args) => {
    // Convert string ID to Convex ID
    const productId = args.id as Id<'products'>

    const product = await ctx.db.get(productId)

    if (!product) {
      throw new Error('Product not found')
    }

    // Only return visible products or handle visibility check based on your requirements
    if (product.visible === false) {
      throw new Error('Product not available')
    }
    console.log(product)

    return {
      ...product,
      // Ensure all optional fields are handled
      linkSalesPage: product.linkSalesPage ?? null,
      linkLeadsPage: product.linkLeadsPage ?? null,
      easilyComissionRate: product.easilyComissionRate ?? null,
      lastSaleTimestamp: product.lastSaleTimestamp ?? null,
      paymentPlataform: product.paymentPlataform ?? null,
      paymentPlataformId: product.paymentPlataformId ?? null,
      visible: product.visible ?? true,
    }
  },
})
