/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConvexError } from 'convex/values'
import { query } from './_generated/server'

export const getPartnerStats = query({
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

    if (user.easilyPartnerCode === undefined) {
      const totalReferrals = 0
      const referralsWithFirstSale = 0

      return {
        totalReferrals,
        referralsWithFirstSale,
        conversionRate:
          totalReferrals > 0 ? referralsWithFirstSale / totalReferrals : 0,
      }
    }
    const comission = user.comissionPartner

    const referrals = await ctx.db
      .query('users')
      .withIndex('by_referatedBy', (q) =>
        q.eq('referatedBy', user.easilyPartnerCode),
      )
      .collect()

    const totalReferrals = referrals.length
    const referralsWithFirstSale = referrals.filter(
      (user) => user.firstSale,
    ).length

    const refarralWithouComission = totalReferrals - referralsWithFirstSale

    const realComission = referralsWithFirstSale * comission!
    const possibleComission = refarralWithouComission * comission!
    const code = user.easilyPartnerCode

    return {
      totalReferrals,
      referralsWithFirstSale,
      realComission,
      possibleComission,
      code,
      conversionRate:
        totalReferrals > 0 ? referralsWithFirstSale / totalReferrals : 0,
    }
  },
})
