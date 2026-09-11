import type { ReactNode } from 'react'

interface ChartTooltipProps {
  /** Posição horizontal em % da largura do container (0–100). */
  xPct: number
  /** Posição vertical em % da altura do container (0–100). */
  yPct: number
  visible: boolean
  children: ReactNode
}

/**
 * Tooltip flutuante posicionado por porcentagem (não por coordenada do mouse),
 * para que apareça de forma determinística tanto no hover quanto no foco por
 * teclado. O container pai precisa de `position: relative`.
 */
export function ChartTooltip({ xPct, yPct, visible, children }: ChartTooltipProps) {
  return (
    <div
      role="tooltip"
      className={`pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-lg bg-[var(--color-text-primary)] px-2.5 py-1.5 text-xs text-[var(--color-surface)] shadow-lg transition-opacity duration-150 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ left: `${xPct}%`, top: `${yPct}%` }}
    >
      {children}
    </div>
  )
}
