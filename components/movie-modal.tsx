'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Check, CheckCircle2, Download, Play, Plus, Star, X } from 'lucide-react'
import { useJojo } from '@/components/jojo-provider'
import { cn } from '@/lib/utils'

export function MovieModal() {
  const { selected, closeMovie, downloads, startDownload, myList, toggleMyList } = useJojo()
  const [quality, setQuality] = useState(1)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!selected) return
    setQuality(1)
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeMovie()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected, closeMovie])

  if (!selected) return null
  const movie = selected
  const dl = downloads[movie.id]
  const inList = myList.includes(movie.id)
  const chosen = movie.qualities[quality]

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close details"
        tabIndex={-1}
        onClick={closeMovie}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-border bg-card shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-300 sm:rounded-3xl"
      >
        <div className="relative aspect-video w-full">
          <Image src={movie.backdrop ?? movie.poster} alt="" fill sizes="768px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          <button
            ref={closeRef}
            type="button"
            onClick={closeMovie}
            className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md hover:bg-black/80"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <h2 id="movie-modal-title" className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
              {movie.title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 font-semibold text-background transition-transform hover:scale-[1.03]"
              >
                <Play className="size-4 fill-current" />
                Play
              </button>
              <button
                type="button"
                onClick={() => toggleMyList(movie.id)}
                aria-pressed={inList}
                className="flex items-center gap-2 rounded-full bg-secondary px-5 py-2.5 font-semibold backdrop-blur-md hover:bg-secondary/80"
              >
                {inList ? <Check className="size-4" /> : <Plus className="size-4" />}
                {inList ? 'In My List' : 'My List'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-6 md:grid-cols-[1.4fr_1fr] md:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 font-semibold text-foreground">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                {movie.score.toFixed(1)}
              </span>
              <span>{movie.year}</span>
              <span className="rounded border border-border px-1.5 py-0.5 text-xs">{movie.rating}</span>
              <span>{movie.duration}</span>
            </div>
            <p className="mt-4 leading-relaxed text-foreground/90">{movie.synopsis}</p>
            <dl className="mt-6 flex flex-col gap-2 text-sm">
              <div>
                <dt className="inline text-muted-foreground">Cast: </dt>
                <dd className="inline">{movie.cast.join(', ')}</dd>
              </div>
              <div>
                <dt className="inline text-muted-foreground">Genres: </dt>
                <dd className="inline">{movie.genres.join(', ')}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl bg-muted p-4">
            <p className="text-sm font-semibold">Download for offline</p>
            <div className="mt-3 flex flex-col gap-2" role="radiogroup" aria-label="Choose quality">
              {movie.qualities.map((q, i) => (
                <button
                  key={q.label}
                  type="button"
                  role="radio"
                  aria-checked={quality === i}
                  disabled={!!dl}
                  onClick={() => setQuality(i)}
                  className={cn(
                    'flex items-center justify-between rounded-xl border px-3 py-2.5 text-sm transition-colors disabled:pointer-events-none disabled:opacity-50',
                    quality === i ? 'border-foreground bg-foreground/10' : 'border-border hover:border-foreground/40',
                  )}
                >
                  <span className="font-medium">{q.label}</span>
                  <span className="text-muted-foreground">{q.size}</span>
                </button>
              ))}
            </div>

            {dl ? (
              dl.progress < 100 ? (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Downloading {dl.quality}</span>
                    <span>{Math.round(dl.progress)}%</span>
                  </div>
                  <div
                    className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-background"
                    role="progressbar"
                    aria-valuenow={Math.round(dl.progress)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Download progress"
                  >
                    <div className="h-full bg-brand transition-all" style={{ width: `${dl.progress}%` }} />
                  </div>
                </div>
              ) : (
                <p className="mt-4 flex items-center justify-center gap-2 rounded-full bg-emerald-500/15 py-2.5 text-sm font-semibold text-emerald-400">
                  <CheckCircle2 className="size-4" />
                  Downloaded · {dl.quality}
                </p>
              )
            ) : (
              <button
                type="button"
                onClick={() => startDownload(movie, chosen.label, chosen.size)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-2.5 font-semibold text-brand-foreground transition-transform hover:scale-[1.02]"
              >
                <Download className="size-4" />
                Download {chosen.label}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
