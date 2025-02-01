import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const create = mutation({
  args: {
    gclid: v.string(),
    fullUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const clickId = await ctx.db.insert('drcashClicks', {
      gclid: args.gclid,
      fullUrl: args.fullUrl,
    })
    return clickId
  },
})
