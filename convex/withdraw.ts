import { ConvexError, v } from 'convex/values'
import { mutation } from './_generated/server'

// Função para gerar um ID único para a transação
const generateTransactionId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const requestWithdrawal = mutation({
  args: {
    amount: v.number(),
  },
  handler: async (ctx, args) => {
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

    // Verificar se há saldo disponível suficiente
    const availableBalance = easilyAccount.withdrawableBalance || 0
    if (availableBalance < args.amount) {
      throw new ConvexError({
        message: 'Saldo insuficiente para saque',
        code: 125,
      })
    }

    // Registrar a transação de saque
    const transactionId = await ctx.db.insert('transactions', {
      affiliateId: user._id,
      amount: args.amount,
      saleId: generateTransactionId(), // Usando um ID gerado para identificar a transação
      createdAt: Date.now(),
      status: 'pending', // Pode ser ajustado conforme sua lógica de negócios
      unlockDate: Date.now(), // Para saques, podemos considerar que já está desbloqueado
      typeOf: 'withdraw',
    })

    // Atualizar o saldo na conta Easily
    await ctx.db.patch(easilyAccount._id, {
      withdrawableBalance: availableBalance - args.amount,
      // Não alteramos o totalBalance, pois ele representa os ganhos históricos
    })

    console.log(
      `Saque registrado com ID ${transactionId} para o usuário ${user._id}`,
    )

    return {
      success: true,
      message: 'Saque registrado com sucesso',
      transactionId,
    }
  },
})
