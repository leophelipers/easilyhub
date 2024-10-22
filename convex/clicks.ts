import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const createClick = mutation({
  args: {
    affiliateToken: v.string(),
    productId: v.id('products'),
    clickOrigin: v.string(),
  },
  handler: async (ctx, args) => {
    // Busca o usuário com base no affiliateToken
    const user = await ctx.db
      .query('users')
      .withIndex('by_affiliateToken', (q) =>
        q.eq('affiliateToken', args.affiliateToken),
      )
      .first()

    if (!user) {
      throw new Error('Usuário não encontrado')
    }

    const clerkId = user.userId

    // Verifica se clerkId está definido
    if (!clerkId) {
      throw new Error('User Clerk ID não encontrado')
    }

    // Verifica se um clique recente já foi registrado para o mesmo produto
    const recentClick = await ctx.db
      .query('clicks')
      .withIndex('by_userId_productId', (q) =>
        q.eq('userId', user._id).eq('productId', args.productId),
      )
      .order('desc')
      .first()

    // Se não há clique recente ou o último clique foi há mais de 60 segundos, registra um novo clique
    if (!recentClick || Date.now() - recentClick.timestamp > 60000) {
      await ctx.db.insert('clicks', {
        userId: user._id,
        userClerkId: clerkId, // Aqui, clerkId é garantido como string
        productId: args.productId,
        clickOrigin: args.clickOrigin,
        timestamp: Date.now(),
      })

      return { success: true, message: 'Clique registrado com sucesso' }
    } else {
      return { success: false, message: 'Clique já registrado recentemente' }
    }
  },
})

export const getTotalClicks = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new ConvexError({
        message: 'Usuário não autenticado',
        code: 401,
      })
    }

    // Buscar o usuário
    const user = await ctx.db
      .query('users')
      .withIndex('by_userId', (q) => q.eq('userId', identity.subject))
      .unique()

    if (!user) {
      throw new ConvexError({
        message: 'Esse usuário não existe',
        code: 123,
      })
    }

    let totalClicks

    // Buscar Clicks
    const clicks = await ctx.db
      .query('clicks')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .collect()

    console.log(clicks.length)
    console.log(clicks)

    if (clicks.length < 1) {
      totalClicks = 0
    } else {
      totalClicks = clicks.length
    }

    console.log(totalClicks)
    return totalClicks
  },
})
