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
    easilyPartnerCode: v.optional(v.string()),
    referatedBy: v.optional(v.string()),
    referallCount: v.optional(v.number()),
    firstSale: v.optional(v.boolean()),
    comissionPartner: v.optional(v.float64()),
    affiliateToken: v.optional(v.string()),
    daysToUnlock: v.optional(v.number()), // Number of days to unlock balance
    minEarlyWithdrawal: v.optional(v.number()), // Minimum amount for early withdrawal
    earlyWithdrawalFee: v.optional(v.number()), // Fee percentage for early withdrawal
  })
    .index('by_userId', ['userId'])
    .index('by_affiliateToken', ['affiliateToken'])
    .index('by_easilyPartnerCode', ['easilyPartnerCode'])
    .index('by_referatedBy', ['referatedBy']),

  easilyAccount: defineTable({
    userId: v.id('users'),
    totalBalance: v.optional(v.number()), // Historical balance
    blockedBalance: v.optional(v.number()), // Currently locked balance
    withdrawableBalance: v.optional(v.number()), // Available balance after the lock period
    userClerkId: v.optional(v.string()),
    comissions: v.optional(v.id('commissions')),
  }).index('by_userId', ['userId']),

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
    linkSalesPage: v.optional(v.string()),
    linkLeadsPage: v.optional(v.string()),
    comissionValue: v.string(),
    comissionType: v.string(),
    easilyComissionRate: v.optional(v.number()),
    lastSaleTimestamp: v.optional(v.number()),
    paymentPlataform: v.optional(v.string()),
    paymentPlataformId: v.optional(v.string()),
    visible: v.optional(v.boolean()),
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
    timestamp: v.number(),
  })
    .index('by_userId_productId', ['userId', 'productId'])
    .index('by_productId', ['productId'])
    .index('by_userId', ['userId']),

  affiliateEasily: defineTable({
    affiliateId: v.id('users'),
    referateId: v.id('users'),
    finalDate: v.optional(v.string()),
  }),

  drcashClicks: defineTable({
    gclid: v.optional(v.string()),
    fullUrl: v.optional(v.string()),
  }),

  transactions: defineTable({
    affiliateId: v.id('users'), // ID do afiliado
    amount: v.number(), // Valor da comissão
    productId: v.optional(v.id('products')), // ID do produto
    productName: v.optional(v.string()), // Nome do produto
    saleId: v.string(), // ID da venda
    createdAt: v.number(), // Timestamp da criação
    clickId: v.optional(v.id('clicks')), // ID da click
    status: v.string(), // "blocked", "available"
    unlockDate: v.number(), // Date when the balance will become available
    typeOf: v.string(), // tipo da transação
  }).index('by_affiliateId', ['affiliateId']),
})
