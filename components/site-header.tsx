'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Bell, CheckCircle2, Download, Search, X } from 'lucide-react'
import { Logo } from '@/components/logo'
import { useJojo } from '@/components/jojo-provider'
import { movies } from '@/lib/movies'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'Dramas', href: '#binge-worthy-dramas' },
  { label: 'Top 10', href: '#top-10' },
  { label: 'Browse', href: '#browse' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [downloadsOpen, setDownloadsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { downloads, openMovie, removeDownload } = useJojo()

  const downloadList = Object.values(downloads)
  const activeCount = downloadList.length

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  const results = query.trim()
    ? movies.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.genres.some((g) => g.toLowerCase().includes(query.toLowerCase())),
      )
    : []

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        scrolled
          ? 'border-b border-border bg-background/70 backdrop-blur-xl backdrop-saturate-150'
          : 'bg-gradient-to-b from-background/80 to-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center gap-6 px-4 md:px-10">
        <a href="#top" aria-label="jojodrama home">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full bg-secondary/60 p-1 backdrop-blur-md">
            {navLinks.map((link, i) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={cn(
                    'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                    i === 0 ? 'bg-foreground text-background' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <div
              className={cn(
                'flex items-center overflow-hidden rounded-full transition-all duration-300',
                searchOpen ? 'w-48 bg-secondary sm:w-72' : 'w-10',
              )}
            >
              <button
                type="button"
                onClick={() => {
                  setSearchOpen((o) => !o)
                  setQuery('')
                }}
                className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-secondary"
                aria-label={searchOpen ? 'Close search' : 'Open search'}
              >
                {searchOpen ? <X className="size-5" /> : <Search className="size-5" />}
              </button>
              {searchOpen && (
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Escape' && setSearchOpen(false)}
                  placeholder="Titles, genres..."
                  aria-label="Search titles"
                  className="w-full bg-transparent pr-4 text-sm outline-none placeholder:text-muted-foreground"
                />
              )}
            </div>
            {searchOpen && query.trim() && (
              <div className="absolute right-0 top-12 w-72 overflow-hidden rounded-2xl border border-border bg-popover/95 p-2 shadow-2xl backdrop-blur-xl sm:w-80">
                {results.length === 0 ? (
                  <p className="p-3 text-sm text-muted-foreground">No titles found.</p>
                ) : (
                  <ul className="max-h-80 overflow-y-auto">
                    {results.map((m) => (
                      <li key={m.id}>
                        <button
                          type="button"
                          onClick={() => {
                            openMovie(m)
                            setSearchOpen(false)
                          }}
                          className="flex w-full items-center gap-3 rounded-xl p-2 text-left hover:bg-accent"
                        >
                          <Image src={m.poster} alt="" width={40} height={60} className="h-14 w-10 rounded-md object-cover" />
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium">{m.title}</span>
                            <span className="block text-xs text-muted-foreground">
                              {m.year} · {m.genres.join(', ')}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setDownloadsOpen((o) => !o)}
              className="relative flex size-10 items-center justify-center rounded-full hover:bg-secondary"
              aria-label={`Downloads (${activeCount})`}
              aria-expanded={downloadsOpen}
            >
              <Download className="size-5" />
              {activeCount > 0 && (
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-brand-foreground">
                  {activeCount}
                </span>
              )}
            </button>
            {downloadsOpen && (
              <div className="absolute right-0 top-12 w-80 rounded-2xl border border-border bg-popover/95 p-4 shadow-2xl backdrop-blur-xl">
                <p className="mb-3 text-sm font-semibold">My Downloads</p>
                {downloadList.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nothing here yet. Open a title and choose a quality to download.
                  </p>
                ) : (
                  <ul className="flex flex-col gap-3">
                    {downloadList.map((d) => (
                      <li key={d.movie.id} className="flex items-center gap-3">
                        <Image src={d.movie.poster} alt="" width={40} height={60} className="h-14 w-10 rounded-md object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">{d.movie.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {d.quality} · {d.size}
                          </p>
                          {d.progress < 100 ? (
                            <div
                              className="mt-1.5 h-1 overflow-hidden rounded-full bg-secondary"
                              role="progressbar"
                              aria-valuenow={Math.round(d.progress)}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`Downloading ${d.movie.title}`}
                            >
                              <div className="h-full bg-brand transition-all" style={{ width: `${d.progress}%` }} />
                            </div>
                          ) : (
                            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
                              <CheckCircle2 className="size-3" /> Ready offline
                            </p>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDownload(d.movie.id)}
                          className="rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                          aria-label={`Remove ${d.movie.title}`}
                        >
                          <X className="size-4" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            className="hidden size-10 items-center justify-center rounded-full hover:bg-secondary sm:flex"
            aria-label="Notifications"
          >
            <Bell className="size-5" />
          </button>
          <span
            aria-label="Profile"
            className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand to-amber-500 text-xs font-bold"
          >
            JD
          </span>
        </div>
      </div>
    </header>
  )
}
