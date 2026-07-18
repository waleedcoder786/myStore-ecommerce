import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoritesState {
  favorites: Set<string>
  isFavorite: (productId: string) => boolean
  toggleFavorite: (productId: string) => void
  addFavorite: (productId: string) => void
  removeFavorite: (productId: string) => void
  getFavoritesArray: () => string[]
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: new Set<string>(),
      
      isFavorite: (productId: string) => {
        return get().favorites.has(productId)
      },
      
      toggleFavorite: (productId: string) => {
        const { favorites } = get()
        const newFavorites = new Set(favorites)
        
        if (newFavorites.has(productId)) {
          newFavorites.delete(productId)
        } else {
          newFavorites.add(productId)
        }
        
        set({ favorites: newFavorites })
      },
      
      addFavorite: (productId: string) => {
        const { favorites } = get()
        const newFavorites = new Set(favorites)
        newFavorites.add(productId)
        set({ favorites: newFavorites })
      },
      
      removeFavorite: (productId: string) => {
        const { favorites } = get()
        const newFavorites = new Set(favorites)
        newFavorites.delete(productId)
        set({ favorites: newFavorites })
      },
      
      getFavoritesArray: () => {
        return Array.from(get().favorites)
      },
    }),
    {
      name: 'favorites-storage',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name)
          if (!value) return null
          const parsed = JSON.parse(value)
          return {
            state: {
              ...parsed.state,
              favorites: new Set(parsed.state.favorites),
            },
          }
        },
        setItem: (name, value) => {
          const toStore = {
            ...value,
            state: {
              ...value.state,
              favorites: Array.from(value.state.favorites),
            },
          }
          localStorage.setItem(name, JSON.stringify(toStore))
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)
