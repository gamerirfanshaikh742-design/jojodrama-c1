import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-xl font-bold tracking-tight', className)}>
      <span
        aria-hidden="true"
        className="flex size-7 items-center justify-center rounded-lg bg-brand text-sm font-black text-brand-foreground"
      >
        j
      </span>
      <span>
        jojo<span className="text-brand">drama</span>
      </span>
    </span>
  )
}
