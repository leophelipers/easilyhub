'use client'

import { useEffect, useState } from 'react'
import { NewHeroModal } from '../modals/hero-modal'

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <NewHeroModal />
    </>
  )
}
