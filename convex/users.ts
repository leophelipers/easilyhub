/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConvexError, v } from 'convex/values'
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
    await ctx.db.insert('users', {
      email: args.email,
      userId: args.userId,
      name: args.name,
      lastName: args.lastName,
      role: 'user',
    })
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
