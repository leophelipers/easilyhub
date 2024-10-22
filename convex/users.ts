/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConvexError, v } from 'convex/values'
import { v4 as uuidv4 } from 'uuid'
import { Id } from './_generated/dataModel'
import { internalMutation, mutation, query } from './_generated/server'
import { validateCNPJ, validateCPF, validateEmail } from './validationUtils'

// Tipo para novos usuários
type NewUser = {
  email: string
  cpf?: string
  cnpj?: string
  userId?: string
  role?: string
  [key: string]: any // Permite outros campos opcionais
}

// Função auxiliar para verificar se o usuário é admin
async function isAdmin(db: any, userId: any): Promise<boolean> {
  const user = await db
    .query('users')
    .withIndex('by_userId', (q: any) => q.eq('userId', userId)) // Use o tipo correto de `q` aqui
    .first()

  return user?.role === 'admin'
}

// Função de criação de usuário Clerk
export const createUser = internalMutation({
  args: {
    email: v.string(),
    userId: v.string(),
    name: v.string(),
    lastName: v.string(),
  },
  handler: async (ctx, args) => {
    const affiliateToken = uuidv4()

    // Criar o usuário
    const userId = await ctx.db.insert('users', {
      email: args.email,
      userId: args.userId,
      name: args.name,
      lastName: args.lastName,
      role: 'user',
      affiliateToken,
    })

    // Inicializar a easilyAccount para o novo usuário
    await ctx.db.insert('easilyAccount', {
      userId,
      totalBalance: 0,
      blockedBalance: 0,
      withdrawableBalance: 0,
      userClerkId: args.userId, // Assumindo que userId é o Clerk ID
    })

    return userId
  },
})

// Função para criar um novo usuário (apenas admins)
export const createUserAdmin = mutation({
  args: {
    newUser: v.object({}),
  },
  handler: async (ctx, { newUser }: { newUser: NewUser }) => {
    const currentUser = await ctx.auth.getUserIdentity()

    if (!currentUser || !(await isAdmin(ctx.db, currentUser.id))) {
      throw new Error(
        'Acesso negado: somente administradores podem criar usuários.',
      )
    }

    if (!validateEmail(newUser.email)) {
      throw new Error('E-mail inválido.')
    }
    if (newUser.cpf && !validateCPF(newUser.cpf)) {
      throw new Error('CPF inválido.')
    }
    if (newUser.cnpj && !validateCNPJ(newUser.cnpj)) {
      throw new Error('CNPJ inválido.')
    }

    await ctx.db.insert('users', {
      ...newUser,
      role: newUser.role || 'user',
      userId: (newUser.userId ?? '') as string | undefined,
    })
  },
})

// Função para ler informações de um usuário (qualquer um pode ler)
export const getUserById = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, { userId }) => {
    const currentUser = await ctx.auth.getUserIdentity()

    if (
      currentUser?.id !== userId &&
      !(await isAdmin(ctx.db, currentUser?.id))
    ) {
      throw new Error(
        'Acesso negado: você só pode acessar seus próprios dados.',
      )
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_userId', (q) => q.eq('userId', userId))
      .first()

    if (!user) {
      throw new Error('Usuário não encontrado.')
    }

    return user
  },
})

// Função para listar todos os usuários (apenas admins podem listar todos)
export const listUsers = query({
  handler: async (ctx) => {
    const currentUser = await ctx.auth.getUserIdentity()

    if (!(await isAdmin(ctx.db, currentUser?.id))) {
      throw new Error(
        'Acesso negado: somente administradores podem listar todos os usuários.',
      )
    }

    const users = await ctx.db.query('users').collect()
    return users
  },
})

// Função para contar o número total de usuários (apenas admins podem ver a contagem)
export const countUsers = query({
  handler: async (ctx) => {
    const currentUser = await ctx.auth.getUserIdentity()

    if (!(await isAdmin(ctx.db, currentUser?.id))) {
      throw new Error(
        'Acesso negado: somente administradores podem visualizar a contagem total de usuários.',
      )
    }

    const totalUsers = await ctx.db
      .query('users')
      .collect()
      .then((users) => users.length)
    return { totalUsers }
  },
})

export const createInvited = mutation({
  args: {
    inviteCode: v.optional(v.string()),
  },
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

    const codeExists = await ctx.db
      .query('users')
      .withIndex('by_easilyPartnerCode', (q) =>
        q.eq('easilyPartnerCode', args.inviteCode),
      )
      .collect()

    if (codeExists?.length < 1) {
      throw new ConvexError({
        message:
          'Esse código não existe, verifique letras maiúsculas e minúsculas.',
        code: 123,
      })
    }

    const invited = await ctx.db.patch(user._id, {
      referatedBy: args.inviteCode,
    })

    const affiliate = await ctx.db
      .query('users')
      .withIndex('by_easilyPartnerCode', (q) =>
        q.eq('easilyPartnerCode', args.inviteCode),
      )
      .unique()

    if (affiliate) {
      const countInvited = affiliate.referallCount

      const newCountInvited = countInvited !== undefined ? countInvited + 1 : 1

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newCount = await ctx.db.patch(affiliate._id, {
        referallCount: newCountInvited,
      })
    }

    return invited
  },
})

export const hasInvited = query({
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

export const updateUser = mutation({
  args: {
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
    daysToUnlock: v.optional(v.number()),
    minEarlyWithdrawal: v.optional(v.number()),
    earlyWithdrawalFee: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updateFields } = args

    if (!userId) {
      throw new ConvexError({
        message: 'User ID is required',
      })
    }

    // Remover campos undefined do objeto de atualização
    const fieldsToUpdate = Object.fromEntries(
      Object.entries(updateFields).filter(([_, value]) => value !== undefined),
    )

    // Verificar se há campos para atualizar
    if (Object.keys(fieldsToUpdate).length === 0) {
      throw new Error('Nenhum campo para atualizar foi fornecido')
    }

    // Atualizar o usuário com os campos fornecidos
    const updatedUser = await ctx.db.patch(
      userId as Id<'users'>,
      fieldsToUpdate,
    )

    return {
      success: true,
      message: 'Usuário alterado com sucesso!',
      updatedUser,
    }
  },
})

export const getUser = query({
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

    return user
  },
})
