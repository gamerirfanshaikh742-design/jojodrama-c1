import { JojoProvider } from '@/components/jojo-provider'
import { SiteHeader } from '@/components/site-header'
import { HeroCarousel } from '@/components/hero-carousel'
import { MovieRow } from '@/components/movie-row'
import { TopTenRow } from '@/components/top-ten-row'
import { BrowseGrid } from '@/components/browse-grid'
import { MovieModal } from '@/components/movie-modal'
import { SiteFooter } from '@/components/site-footer'
import { featured, rows, topTen } from '@/lib/movies'

export default function Page() {
  return (
    <JojoProvider>
      <SiteHeader />
      <main>
        <HeroCarousel items={featured} />
        <div className="relative z-10 -mt-16 flex flex-col gap-8 md:gap-10">
          <MovieRow title={rows[0].title} items={rows[0].items} />
          <TopTenRow items={topTen} />
          {rows.slice(1).map((row) => (
            <MovieRow key={row.title} title={row.title} items={row.items} />
          ))}
          <BrowseGrid />
        </div>
      </main>
      <SiteFooter />
      <MovieModal />
    </JojoProvider>
  )
}
