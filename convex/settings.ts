/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConvexError, v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const profileData = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Called currentUser without authenticated user')
    }

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

    return user
  },
})

export const updateCpf = mutation({
  args: { cpf: v.string(), cnpj: v.optional(v.boolean()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Called currentUser without authenticated user')
    }

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

    const cpf = await ctx.db.patch(user._id, {
      cpf: args.cpf,
    })

    return cpf
  },
})
