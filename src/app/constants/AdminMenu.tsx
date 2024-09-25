import { UserCircle, UsersFour } from '@phosphor-icons/react'
type MENU_PROPS = {
  key: number
  title: string
  icon: JSX.Element
  url: string
}

export const MENU: MENU_PROPS[] = [
  {
    key: 1,
    title: 'Usuários',
    icon: <UserCircle />,
    url: '/odin/dashboard/users',
  },
  {
    key: 2,
    title: 'Email Marketing',
    icon: <UsersFour />,
    url: '/odin/dashboard/users',
  },
]
