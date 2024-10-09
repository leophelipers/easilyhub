import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const createClick = mutation({
  args: {
    userClerkId: v.string(),
    productId: v.id('products'),
    clickOrigin: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_userId', (q) => q.eq('userId', args.userClerkId))
      .first()

    if (user) {
      await ctx.db.insert('clicks', {
        userId: user._id,
        userClerkId: args.userClerkId,
        productId: args.productId,
        clickOrigin: args.clickOrigin,
      })
    }
  },
})
