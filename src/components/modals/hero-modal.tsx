'use client'

import { useNewHero } from '@/hooks/use-hero-modal'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'

export const NewHeroModal = () => {
  const newHero = useNewHero()

  return (
    <Dialog open={newHero.isOpen} onOpenChange={newHero.onClose}>
      <DialogContent className="bg-white">
        <DialogHeader></DialogHeader>
        <div>
          <h1>Modal</h1>
        </div>
      </DialogContent>
    </Dialog>
  )
}
