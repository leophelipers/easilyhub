import { v } from 'convex/values'
import { Id } from './_generated/dataModel'
import { mutation } from './_generated/server'

// Função para gerar um ID único para a venda
const generateSaleId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const recordSale = mutation({
  args: {
    productId: v.id('products'),
  },
  handler: async (ctx, args) => {
    console.log('Iniciando registro de venda')

    // Busca o produto
    const product = await ctx.db.get(args.productId)
    console.log('Produto obtido:', product)

    if (!product) {
      console.log('Erro: Produto não encontrado')
      throw new Error('Produto não encontrado')
    }

    // Recupera a taxa de comissão do produto, que varia de 0.01 a 1
    const commissionRate = product.easilyComissionRate || 0
    console.log('Taxa de comissão do produto:', commissionRate)

    // Cálculo da comissão total considerando a taxa da plataforma
    const commissionTotal =
      parseFloat(product.comissionValue) * (1 - commissionRate)
    console.log('Comissão total após taxa da plataforma:', commissionTotal)

    // Buscar cliques desde a última venda
    console.log('lastSaleTimestamp:', product.lastSaleTimestamp)

    const clicks = await ctx.db
      .query('clicks')
      .withIndex('by_productId', (q) => q.eq('productId', args.productId))
      .filter((q) => {
        if (product.lastSaleTimestamp) {
          return q.gte(q.field('timestamp'), product.lastSaleTimestamp)
        }
        return q.gt(q.field('timestamp'), 0)
      })
      .collect()

    console.log('Total de cliques encontrados:', clicks.length)

    if (clicks.length === 0) {
      console.log('Erro: Nenhum clique registrado desde a última venda')
      throw new Error('Nenhum clique registrado desde a última venda')
    }

    // Número total de cliques
    const totalClicks = clicks.length
    if (totalClicks === 0) {
      console.log('Erro: Nenhum clique registrado desde a última venda')
      throw new Error('Nenhum clique registrado desde a última venda')
    }

    console.log('Total de cliques:', totalClicks)

    // Comissão por clique
    const commissionPerClick = commissionTotal / totalClicks
    console.log('Comissão por clique:', commissionPerClick)

    // Processar cada clique e registrar uma transação correspondente
    for (const click of clicks) {
      console.log('Processando clique:', click)

      // Consulta a conta de afiliado usando o índice 'by_userId'
      const affiliateAccount = await ctx.db
        .query('easilyAccount')
        .withIndex('by_userId', (q) => q.eq('userId', click.userId))
        .first()

      console.log('Conta de afiliado obtida:', affiliateAccount)

      // Verifica se a conta de afiliado foi encontrada
      if (!affiliateAccount) {
        console.log(
          'Erro: Conta de afiliado não encontrada para userId:',
          click.userId,
        )
        throw new Error('Conta de afiliado não encontrada')
      }

      // Verifica se o usuário associado à conta existe
      const user = await ctx.db.get(affiliateAccount.userId)
      if (!user) {
        console.log(
          'Erro: Usuário não encontrado para userId:',
          affiliateAccount.userId,
        )
        throw new Error('Usuário não encontrado')
      }

      console.log('Usuário obtido:', user)

      // Define a data de desbloqueio considerando os dias de bloqueio
      const unlockDate =
        Date.now() + (user.daysToUnlock || 7) * 24 * 60 * 60 * 1000
      console.log('Data de desbloqueio calculada:', new Date(unlockDate))

      // Atualiza o saldo do afiliado
      await ctx.db.patch(affiliateAccount._id, {
        totalBalance: (affiliateAccount.totalBalance || 0) + commissionPerClick, // Histórico total de saldo
        userClerkId: user.userId,
        blockedBalance:
          (affiliateAccount.blockedBalance || 0) + commissionPerClick, // Saldo bloqueado
      })

      console.log('Saldo atualizado para o afiliado:', affiliateAccount.userId)

      // Registrar transação para o afiliado
      const transactionId = await ctx.db.insert('transactions', {
        affiliateId: click.userId as Id<'users'>,
        amount: commissionPerClick,
        productId: args.productId,
        saleId: generateSaleId(),
        createdAt: Date.now(),
        clickId: click._id,
        status: 'blocked', // O saldo está bloqueado inicialmente
        unlockDate, // Inclua a data de desbloqueio
        typeOf: 'venda',
      })

      console.log(
        `Transação registrada com ID ${transactionId} para o afiliado ${click.userId}`,
      )
    }

    // Atualiza a data da última venda
    await ctx.db.patch(args.productId, {
      lastSaleTimestamp: Date.now(),
    })

    console.log(
      'Data da última venda atualizada para o produto:',
      args.productId,
    )

    return {
      success: true,
      message: 'Venda registrada e comissões distribuídas por clique',
    }
  },
})
