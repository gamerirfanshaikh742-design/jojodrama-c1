'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Download, Info, Play, Star } from 'lucide-react'
import { useJojo } from '@/components/jojo-provider'
import type { Movie } from '@/lib/movies'
import { cn } from '@/lib/utils'

export function HeroCarousel({ items }: { items: Movie[] }) {
  const [index, setIndex] = useState(0)
  const { openMovie } = useJojo()
  const movie = items[index]

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), 8000)
    return () => clearInterval(timer)
  }, [items.length])

  return (
    <section id="top" aria-label="Featured" className="relative h-[85svh] min-h-[560px] w-full overflow-hidden">
      {items.map((m, i) => (
        <Image
          key={m.id}
          src={m.backdrop!}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={cn(
            'object-cover transition-all duration-[1400ms] ease-out',
            i === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
          )}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />

      <div className="relative mx-auto flex h-full max-w-[1600px] flex-col justify-end px-4 pb-24 md:px-10 md:pb-32">
        <div key={movie.id} className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            <span className="rounded bg-brand px-1.5 py-0.5 text-[10px] tracking-normal text-brand-foreground">J</span>
            jojodrama Original
          </p>
          <h1 className="text-balance text-5xl font-bold tracking-tight md:text-7xl">{movie.title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {movie.score.toFixed(1)}
            </span>
            <span>{movie.year}</span>
            <span className="rounded border border-border px-1.5 py-0.5 text-xs">{movie.rating}</span>
            <span>{movie.duration}</span>
            <span className="rounded bg-secondary px-1.5 py-0.5 text-xs font-semibold text-foreground">4K HDR</span>
            <span>{movie.genres.join(' · ')}</span>
          </div>
          <p className="mt-4 text-pretty text-base leading-relaxed text-foreground/85 md:text-lg">{movie.synopsis}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openMovie(movie)}
              className="flex items-center gap-2 rounded-full bg-foreground px-7 py-3 font-semibold text-background transition-transform hover:scale-[1.03]"
            >
              <Play className="size-5 fill-current" />
              Play
            </button>
            <button
              type="button"
              onClick={() => openMovie(movie)}
              className="flex items-center gap-2 rounded-full bg-brand px-7 py-3 font-semibold text-brand-foreground transition-transform hover:scale-[1.03]"
            >
              <Download className="size-5" />
              Download
            </button>
            <button
              type="button"
              onClick={() => openMovie(movie)}
              className="flex items-center gap-2 rounded-full bg-secondary px-6 py-3 font-semibold backdrop-blur-md transition-colors hover:bg-secondary/80"
            >
              <Info className="size-5" />
              More Info
            </button>
          </div>
        </div>

        <div className="absolute bottom-24 right-4 flex gap-2 md:bottom-32 md:right-10" role="tablist" aria-label="Featured titles">
          {items.map((m, i) => (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show ${m.title}`}
              onClick={() => setIndex(i)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i === index ? 'w-8 bg-foreground' : 'w-1.5 bg-foreground/40 hover:bg-foreground/70',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
