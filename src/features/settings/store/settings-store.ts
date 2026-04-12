import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  region: string
  cultivationMethod: string
  setRegion: (region: string) => void
  setCultivationMethod: (method: string) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      region: '関東',
      cultivationMethod: '地植え',
      setRegion: (region) => set({ region }),
      setCultivationMethod: (cultivationMethod) => set({ cultivationMethod }),
    }),
    { name: 'saience-settings' }
  )
)
