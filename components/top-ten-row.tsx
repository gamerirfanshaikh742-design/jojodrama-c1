'use client'

import Image from 'next/image'
import { ScrollRow } from '@/components/movie-row'
import { useJojo } from '@/components/jojo-provider'
import type { Movie } from '@/lib/movies'

export function TopTenRow({ items }: { items: Movie[] }) {
  const { openMovie } = useJojo()

  return (
    <ScrollRow title="Top 10 on jojodrama Today" id="top-10">
      {items.map((m, i) => (
        <button
          key={m.id}
          type="button"
          onClick={() => openMovie(m)}
          className="group relative flex shrink-0 snap-start items-end outline-none"
          aria-label={`Number ${i + 1}: ${m.title}`}
        >
          <span
            aria-hidden="true"
            className="-mr-6 select-none text-[9rem] font-black leading-[0.75] tracking-tighter text-background md:text-[11rem]"
            style={{ WebkitTextStroke: '3px oklch(0.6 0.01 285)' }}
          >
            {i + 1}
          </span>
          <span className="relative block aspect-[2/3] w-28 overflow-hidden rounded-lg ring-1 ring-border transition-transform duration-300 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-foreground md:w-36">
            <Image src={m.poster} alt="" fill sizes="144px" className="object-cover" />
          </span>
        </button>
      ))}
    </ScrollRow>
  )
}
