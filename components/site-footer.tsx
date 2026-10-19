import { Logo } from '@/components/logo'

const columns = [
  { title: 'Browse', links: ['Movies', 'K-Dramas', 'New & Popular', 'Top 10'] },
  { title: 'Account', links: ['My Downloads', 'My List', 'Devices', 'Plans'] },
  { title: 'Help', links: ['Help Center', 'Terms of Use', 'Privacy', 'Contact'] },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-14 md:grid-cols-[2fr_1fr_1fr_1fr] md:px-10">
        <div>
          <Logo />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Cinematic stories, beautifully delivered. Stream or download in up to 4K HDR and watch anywhere — even offline.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#top" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        {'© 2026 jojodrama. All rights reserved.'}
      </p>
    </footer>
  )
}
