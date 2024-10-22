import { ConvexError, v } from 'convex/values'
import { Id } from './_generated/dataModel'
import { mutation, query } from './_generated/server'

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

    // Recupera a taxa de comissão do produto
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

      // Verifica se é a primeira venda do afiliado
      if (!user.firstSale) {
        console.log('Primeira venda do afiliado')

        // Encontra o parceiro que indicou o afiliado
        const partner = await ctx.db
          .query('users')
          .withIndex('by_easilyPartnerCode', (q) =>
            q.eq('easilyPartnerCode', user.referatedBy),
          )
          .first()

        console.log('Parceiro encontrado:', partner)

        if (!partner) {
          console.log(
            'Erro: Parceiro não encontrado para o código:',
            user.referatedBy,
          )
          throw new Error('Parceiro não encontrado')
        }

        // Registra o saldo referente ao valor em comissionPartner
        const commissionToPartner = partner.comissionPartner || 0

        // Buscar a conta Easily do parceiro
        const partnerEasilyAccount = await ctx.db
          .query('easilyAccount')
          .withIndex('by_userId', (q) => q.eq('userId', partner._id))
          .first()

        if (!partnerEasilyAccount) {
          throw new Error('Conta Easily não encontrada para o parceiro')
        }

        // Atualiza o totalBalance do parceiro
        await ctx.db.patch(partnerEasilyAccount._id, {
          totalBalance:
            (partnerEasilyAccount.totalBalance || 0) + commissionToPartner,
          blockedBalance:
            (partnerEasilyAccount.blockedBalance || 0) + commissionToPartner,
        })

        console.log('Saldo atualizado para o parceiro:', partner._id)

        // Define a data de desbloqueio para o parceiro
        const partnerUnlockDate =
          Date.now() + (partner.daysToUnlock || 7) * 24 * 60 * 60 * 1000

        // Registrar transação para o parceiro
        await ctx.db.insert('transactions', {
          affiliateId: partner._id,
          amount: commissionToPartner,
          saleId: generateSaleId(),
          createdAt: Date.now(),
          status: 'blocked',
          unlockDate: partnerUnlockDate,
          typeOf: 'indication',
        })

        console.log(`Transação registrada para o parceiro ${partner._id}`)

        // Marca a primeira venda do afiliado
        await ctx.db.patch(user._id, { firstSale: true })
      }

      // Define a data de desbloqueio considerando os dias de bloqueio
      const unlockDate =
        Date.now() + (user.daysToUnlock || 7) * 24 * 60 * 60 * 1000
      console.log('Data de desbloqueio calculada:', new Date(unlockDate))

      // Atualiza o saldo do afiliado
      await ctx.db.patch(affiliateAccount._id, {
        totalBalance: (affiliateAccount.totalBalance || 0) + commissionPerClick,
        blockedBalance:
          (affiliateAccount.blockedBalance || 0) + commissionPerClick,
      })

      console.log('Saldo atualizado para o afiliado:', affiliateAccount.userId)

      // Registrar transação para o afiliado
      const transactionId = await ctx.db.insert('transactions', {
        affiliateId: click.userId as Id<'users'>,
        amount: commissionPerClick,
        productId: args.productId,
        productName: product.name,
        saleId: generateSaleId(),
        createdAt: Date.now(),
        status: 'blocked',
        unlockDate,
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

export const getHistoricalSales = query({
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

    // Buscar saldo histórico

    const historicalBalance = await ctx.db
      .query('easilyAccount')
      .withIndex('by_userId', (q) => q.eq('userId', user._id))
      .first()

    console.log(historicalBalance?.totalBalance)

    return historicalBalance
  },
})

// Função para calcular o início de um intervalo de tempo baseado em filtros de data
function getStartDate(dateFilter: string): number {
  const now = new Date()
  let startDate: Date

  switch (dateFilter) {
    case 'today': {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      break
    }
    case 'week': {
      const dayOfWeek = now.getDay()
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - dayOfWeek,
      )
      break
    }
    case 'month': {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    }
    default: {
      startDate = new Date(0)
    }
  }

  return startDate.getTime() // Retorna a data convertida para timestamp
}

// Função principal para buscar as transações filtradas por data
export const getFilteredTransactions = query({
  args: {
    dateFilter: v.string(),
  },
  handler: async (ctx, args) => {
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

    const userId = user._id
    const startDateTimestamp = getStartDate(args.dateFilter)

    // Consultando a tabela 'transactions' e filtrando por 'createdAt' e 'userId'
    const transactions = await ctx.db
      .query('transactions')
      .filter((q) => q.eq(q.field('affiliateId'), userId))
      .filter((q) => q.gte(q.field('createdAt'), startDateTimestamp))
      .collect()

    // Soma o total das transações
    const totalAmount = transactions.reduce((acc, transaction) => {
      const amountAsNumber = parseFloat(transaction.amount.toString()) || 0
      return acc + amountAsNumber
    }, 0)

    return {
      totalAmount: totalAmount.toFixed(2), // Convert to string with 2 decimal places
      transactions,
    }
  },
})
