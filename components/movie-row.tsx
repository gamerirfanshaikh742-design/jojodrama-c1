'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Download, Star } from 'lucide-react'
import { useJojo } from '@/components/jojo-provider'
import type { Movie } from '@/lib/movies'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function ScrollRow({
  title,
  id,
  children,
}: {
  title: string
  id?: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const scroll = (dir: 1 | -1) => {
    const el = ref.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  return (
    <section id={id ?? slugify(title)} aria-label={title} className="group/row relative scroll-mt-20">
      <div className="mx-auto mb-3 flex max-w-[1600px] items-end justify-between px-4 md:px-10">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h2>
        <div className="hidden gap-1 md:flex">
          <button
            type="button"
            onClick={() => scroll(-1)}
            className="flex size-8 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-foreground hover:text-background"
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            className="flex size-8 items-center justify-center rounded-full bg-secondary transition-colors hover:bg-foreground hover:text-background"
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-4 px-4 py-4 md:scroll-px-10 md:gap-4 md:px-10"
      >
        {children}
      </div>
    </section>
  )
}

export function MovieCard({ movie }: { movie: Movie }) {
  const { openMovie, downloads } = useJojo()
  const dl = downloads[movie.id]

  return (
    <button
      type="button"
      onClick={() => openMovie(movie)}
      className="group relative w-36 shrink-0 snap-start text-left outline-none sm:w-44 md:w-52"
      aria-label={`${movie.title}, ${movie.year}`}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-muted shadow-lg ring-1 ring-border transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-[1.04] group-hover:shadow-2xl group-hover:ring-foreground/30 group-focus-visible:ring-2 group-focus-visible:ring-foreground">
        <Image
          src={movie.poster}
          alt=""
          fill
          sizes="(min-width: 768px) 208px, 176px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-xs font-semibold backdrop-blur-md">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          {movie.score.toFixed(1)}
        </div>
        {dl && (
          <div className="absolute right-2 top-2 flex size-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
            <Download className="size-3.5" />
            <span className="sr-only">{dl.progress < 100 ? 'Downloading' : 'Downloaded'}</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <p className="line-clamp-2 text-sm font-semibold leading-tight">{movie.title}</p>
          <p className="mt-0.5 text-xs text-white/70">
            {movie.year} · {movie.genres[0]}
          </p>
        </div>
      </div>
    </button>
  )
}

export function MovieRow({ title, items }: { title: string; items: Movie[] }) {
  return (
    <ScrollRow title={title}>
      {items.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </ScrollRow>
  )
}
