'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import Invite from './invite/Invite'
import Pre from './pre/Pre'

// export interface IDashboardProps {} props: IAdminTopbarProps

export default function Dashboard() {
  const hasInvite = useQuery(api.users.hasInvited)

  return (
    <div className="flex items-center justify-center p-8">
      {hasInvite?.referatedBy !== undefined ? <Pre /> : <Invite />}
    </div>
  )
}
