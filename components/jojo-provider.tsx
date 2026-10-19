'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { Movie } from '@/lib/movies'

export type DownloadItem = {
  movie: Movie
  quality: string
  size: string
  progress: number
}

type JojoContextValue = {
  selected: Movie | null
  openMovie: (movie: Movie) => void
  closeMovie: () => void
  downloads: Record<string, DownloadItem>
  startDownload: (movie: Movie, quality: string, size: string) => void
  removeDownload: (id: string) => void
  myList: string[]
  toggleMyList: (id: string) => void
}

const JojoContext = createContext<JojoContextValue | null>(null)

export function JojoProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<Movie | null>(null)
  const [downloads, setDownloads] = useState<Record<string, DownloadItem>>({})
  const [myList, setMyList] = useState<string[]>([])

  const hasActive = Object.values(downloads).some((d) => d.progress < 100)

  useEffect(() => {
    if (!hasActive) return
    const timer = setInterval(() => {
      setDownloads((prev) => {
        const next = { ...prev }
        for (const key of Object.keys(next)) {
          const item = next[key]
          if (item.progress < 100) {
            next[key] = { ...item, progress: Math.min(100, item.progress + Math.random() * 9 + 3) }
          }
        }
        return next
      })
    }, 400)
    return () => clearInterval(timer)
  }, [hasActive])

  const startDownload = useCallback((movie: Movie, quality: string, size: string) => {
    setDownloads((prev) => ({ ...prev, [movie.id]: { movie, quality, size, progress: 0 } }))
  }, [])

  const removeDownload = useCallback((id: string) => {
    setDownloads((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const toggleMyList = useCallback((id: string) => {
    setMyList((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }, [])

  const closeMovie = useCallback(() => setSelected(null), [])

  const value = useMemo(
    () => ({
      selected,
      openMovie: setSelected,
      closeMovie,
      downloads,
      startDownload,
      removeDownload,
      myList,
      toggleMyList,
    }),
    [selected, closeMovie, downloads, startDownload, removeDownload, myList, toggleMyList],
  )

  return <JojoContext.Provider value={value}>{children}</JojoContext.Provider>
}

export function useJojo() {
  const ctx = useContext(JojoContext)
  if (!ctx) throw new Error('useJojo must be used within JojoProvider')
  return ctx
}
