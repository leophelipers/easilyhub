'use client'

import { useNewHero } from '@/hooks/use-hero-modal'
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog'

export const NewHeroModal = () => {
  const newHero = useNewHero()

  return (
    <Dialog open={newHero.isOpen} onOpenChange={newHero.onClose}>
      <DialogContent className="bg-white text-black">
        <DialogHeader></DialogHeader>
        <div>
          <iframe
            className="w-full aspect-video self-stretch md:min-h-96 rounded shadow"
            src="https://www.youtube.com/embed/Y5TWOVNjs0k?si=Dq399j6l2I0tnYai"
            title="Product Overview Video"
            aria-hidden="true"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
