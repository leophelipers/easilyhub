import { create } from 'zustand'

type NewHeroStore = {
  isOpen: boolean
  listingId: string
  onOpen: () => void
  onClose: () => void
}

export const useNewHero = create<NewHeroStore>(
  (set: (arg0: { isOpen: boolean; listingId?: string }) => void) => ({
    isOpen: false,
    listingId: '',
    onOpen: () => {
      set({ isOpen: true })
    },
    onClose: () => set({ isOpen: false, listingId: '' }),
  }),
)
