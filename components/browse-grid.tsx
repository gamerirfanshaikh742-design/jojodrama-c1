'use client'

import { useState } from 'react'
import { MovieCard } from '@/components/movie-row'
import { genres, movies } from '@/lib/movies'
import { cn } from '@/lib/utils'

export function BrowseGrid() {
  const [genre, setGenre] = useState('All')
  const filtered = genre === 'All' ? movies : movies.filter((m) => m.genres.includes(genre))

  return (
    <section id="browse" aria-labelledby="browse-heading" className="mx-auto max-w-[1600px] scroll-mt-20 px-4 md:px-10">
      <h2 id="browse-heading" className="text-xl font-semibold tracking-tight md:text-2xl">
        Browse by Genre
      </h2>
      <div className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Filter by genre">
        {genres.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGenre(g)}
            aria-pressed={genre === g}
            className={cn(
              'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
              genre === g ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground',
            )}
          >
            {g}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">No titles in this genre yet — check back soon.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 [&>button]:w-full">
          {filtered.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      )}
    </section>
  )
}
