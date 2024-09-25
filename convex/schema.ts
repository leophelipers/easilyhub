import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    userId: v.optional(v.string()),
    name: v.optional(v.string()),
    lastName: v.optional(v.string()),
    email: v.optional(v.string()),
    cpf: v.optional(v.string()),
    cnpj: v.optional(v.string()),
    isCnpj: v.optional(v.boolean()),
    address: v.optional(v.string()),
    addressNumber: v.optional(v.string()),
    addressComplement: v.optional(v.string()),
    cep: v.optional(v.string()),
    bank: v.optional(v.string()),
    bankAccountNumber: v.optional(v.string()),
    bankAccountType: v.optional(v.string()),
    role: v.optional(v.string()),
  }).index('by_userId', ['userId']),

  easilyAccount: defineTable({
    userId: v.id('users'),
    userClerkId: v.string(),
    balance: v.optional(v.string()),
    withdraws: v.id('withdraws'),
    comissions: v.optional(v.id('commissions')),
  }),

  withdraws: defineTable({
    userId: v.id('users'),
    userClerkId: v.string(),
    easilyAccountId: v.id('easilyAccount'),
    amount: v.optional(v.string()),
  }),

  products: defineTable({
    name: v.string(),
    description: v.string(),
    heroImage: v.string(),
    comissionValue: v.string(),
    comissionType: v.string(),
  }),

  comissions: defineTable({
    userId: v.id('users'),
    userClerkId: v.string(),
    productId: v.id('products'),
    amount: v.string(),
    taxEasily: v.string(),
    finalComission: v.string(),
  }),

  clicks: defineTable({
    userId: v.id('users'),
    userClerkId: v.string(),
    productId: v.id('products'),
    clickOrigin: v.string(),
  }),

  affiliateEasily: defineTable({
    affiliateId: v.id('users'),
    referateId: v.id('users'),
    finalDate: v.optional(v.string()),
  }),
})
