import { ConvexError } from 'convex/values'
import { query } from './_generated/server'

export const getEasilyAccount = query({
  handler: async (ctx) => {
    // Autenticar o usuário
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

    // Buscar a conta Easily do usuário
    const easilyAccount = await ctx.db
      .query('easilyAccount')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .first()

    if (!easilyAccount) {
      throw new ConvexError({
        message: 'Conta Easily não encontrada para o usuário',
        code: 124,
      })
    }

    return easilyAccount
  },
})
