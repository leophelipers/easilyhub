'use client'

import { cn } from '@/lib/utils'
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible'
import {
  Box,
  ChevronDown,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Settings,
  Users,
} from 'lucide-react'
import * as React from 'react'

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '#' },
  {
    icon: Box,
    label: 'Produtos',
    subitems: [
      { label: 'Inventário', href: '#' },
      { label: 'Categorias', href: '#' },
      { label: 'Fornecedores', href: '#' },
    ],
  },
  {
    icon: Users,
    label: 'Clientes',
    subitems: [
      { label: 'Lista', href: '#' },
      { label: 'Segmentos', href: '#' },
      { label: 'Análises', href: '#' },
    ],
  },
  { icon: Settings, label: 'Configurações', href: '#' },
  { icon: HelpCircle, label: 'Ajuda', href: '#' },
]

const SidebarItem = ({ item }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  if (item.subitems) {
    return (
      <CollapsiblePrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
        <CollapsiblePrimitive.Trigger asChild>
          <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900">
            <item.icon className="w-5 h-5 mr-2" />
            {item.label}
            <ChevronDown
              className={cn(
                'w-4 h-4 ml-auto transition-transform duration-200',
                {
                  'transform rotate-180': isOpen,
                },
              )}
            />
          </button>
        </CollapsiblePrimitive.Trigger>
        <CollapsiblePrimitive.Content>
          <div className="pl-6 mt-1 space-y-1">
            {item.subitems.map((subitem, index) => (
              <a
                key={index}
                href={subitem.href}
                className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
              >
                {subitem.label}
              </a>
            ))}
          </div>
        </CollapsiblePrimitive.Content>
      </CollapsiblePrimitive.Root>
    )
  }

  return (
    <a
      href={item.href}
      className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
    >
      <item.icon className="w-5 h-5 mr-2" />
      {item.label}
    </a>
  )
}

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <>
      <button
        className="fixed top-4 left-4 z-40 md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-4 bg-gray-800 text-white">
            <h2 className="text-lg font-semibold">Meu App SaaS</h2>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <SidebarItem key={index} item={item} />
            ))}
          </nav>
          <div className="flex items-center px-4 py-2 border-t">
            <img
              src="/placeholder.svg?height=32&width=32"
              width={32}
              height={32}
              alt="Avatar do usuário"
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">João Silva</p>
              <p className="text-xs text-gray-500">joao@exemplo.com</p>
            </div>
            <button className="p-1 ml-auto text-gray-400 hover:text-gray-500">
              <LogOut className="w-5 h-5" />
              <span className="sr-only">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
