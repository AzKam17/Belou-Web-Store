import { create } from 'zustand'

type State = {
    subdomain: string
}

type Actions = {
    updateDomain: (value: string) => void
}

export const useSubDomain = create<State & Actions>((set) => ({
    subdomain: '',
    updateDomain: (newSub: string) => set({ subdomain: newSub }),
}))
