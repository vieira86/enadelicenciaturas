import { useState } from 'react'
import { ChartTooltip } from './ChartTooltip'
import { CHART_COLOR } from './chartTheme'

interface AreaComparisonProps {
  mediaPedagogica: number
  maiorPedagogica: number
  mediaQuimica: number
  maiorQuimica: number
}

const WIDTH = 640
const HEIGHT = 150
const MARGIN = { top: 16, right: 56, bottom: 16, left: 92 }
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right
const ROW_H = 54

/**
 * Compara Pedagógica e Química indexando cada uma ao próprio máximo
 * alcançado pela turma naquela área — as duas partes da prova têm
 * escalas diferentes, então uma comparação em pontos brutos seria
 * enganosa; em "% do maior resultado da turma" as duas ficam na mesma
 * régua de 0–100.
 */
export function AreaComparison({ mediaPedagogica, maiorPedagogica, mediaQuimica, maiorQuimica }: AreaComparisonProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  const linhas = [
    {
      label: 'Química',
      cor: CHART_COLOR.quimica,
      pct: (mediaQuimica / maiorQuimica) * 100,
      media: mediaQuimica,
      maior: maiorQuimica,
    },
    {
      label: 'Pedagógica',
      cor: CHART_COLOR.pedagogica,
      pct: (mediaPedagogica / maiorPedagogica) * 100,
      media: mediaPedagogica,
      maior: maiorPedagogica,
    },
  ]

  const xScale = (pct: number) => MARGIN.left + (pct / 100) * PLOT_W

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto" role="img" aria-label="Desempenho médio por área, em relação ao maior resultado da turma">
        {linhas.map((linha, i) => {
          const y = 16 + i * ROW_H
          const barH = 26
          const w = Math.max((linha.pct / 100) * PLOT_W, 1)
          const isHovered = hovered === i
          return (
            <g key={linha.label}>
              <text x={MARGIN.left - 10} y={y + barH / 2} textAnchor="end" dominantBaseline="middle" fontSize={12} fontWeight={600} style={{ fill: 'var(--color-text-primary)' }}>
                {linha.label}
              </text>
              <rect x={MARGIN.left} y={y} width={PLOT_W} height={barH} rx={4} style={{ fill: 'var(--color-border)' }} />
              <rect
                x={MARGIN.left}
                y={y}
                width={w}
                height={barH}
                rx={4}
                fill={linha.cor}
                opacity={isHovered ? 1 : 0.9}
                tabIndex={0}
                role="img"
                aria-label={`${linha.label}: média de ${linha.media.toFixed(1)} acertos, ${linha.pct.toFixed(0)}% do maior resultado da turma (${linha.maior})`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                style={{ cursor: 'pointer', outline: 'none' }}
              />
              <text x={xScale(linha.pct) + 8} y={y + barH / 2} dominantBaseline="middle" fontSize={12} fontWeight={600} style={{ fill: 'var(--color-text-primary)' }}>
                {linha.pct.toFixed(0)}%
              </text>
            </g>
          )
        })}
      </svg>

      <ChartTooltip
        xPct={hovered !== null ? (xScale(linhas[hovered].pct) / WIDTH) * 100 : 0}
        yPct={hovered !== null ? ((16 + hovered * ROW_H) / HEIGHT) * 100 : 0}
        visible={hovered !== null}
      >
        {hovered !== null && (
          <>
            <strong>{linhas[hovered].label}</strong> · média {linhas[hovered].media.toFixed(1)} de {linhas[hovered].maior} (maior nota da turma na área)
          </>
        )}
      </ChartTooltip>
    </div>
  )
}
