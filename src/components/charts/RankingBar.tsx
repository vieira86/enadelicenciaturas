import { useMemo, useState } from 'react'
import type { ResultadoAluno } from '../../data/resultadosTurma'
import { ChartTooltip } from './ChartTooltip'
import { CHART_COLOR } from './chartTheme'

interface RankingBarProps {
  dados: ResultadoAluno[]
  media: number
}

const WIDTH = 640
const ROW_H = 30
const BAR_H = 20
const MARGIN = { top: 22, right: 46, bottom: 28, left: 76 }
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right

function roundedBarPath(x0: number, y0: number, w: number, h: number, radius: number) {
  const r = Math.max(0, Math.min(radius, w))
  if (w <= 0) return `M ${x0} ${y0} L ${x0} ${y0 + h} Z`
  return `M ${x0},${y0}
    L ${x0 + w - r},${y0}
    Q ${x0 + w},${y0} ${x0 + w},${y0 + r}
    L ${x0 + w},${y0 + h - r}
    Q ${x0 + w},${y0 + h} ${x0 + w - r},${y0 + h}
    L ${x0},${y0 + h} Z`
}

export function RankingBar({ dados, media }: RankingBarProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  const ordenado = useMemo(() => [...dados].sort((a, b) => b.nota - a.nota), [dados])
  const height = MARGIN.top + MARGIN.bottom + ordenado.length * ROW_H

  const xScale = (value: number) => MARGIN.left + (value / 100) * PLOT_W
  const xTicks = [0, 20, 40, 60, 80, 100]

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${WIDTH} ${height}`} className="w-full h-auto" role="img" aria-label="Ranking anonimizado da turma por nota">
        {xTicks.map((t) => (
          <g key={t}>
            <line
              x1={xScale(t)}
              x2={xScale(t)}
              y1={MARGIN.top - 6}
              y2={height - MARGIN.bottom}
              style={{ stroke: 'var(--color-border)' }}
              strokeWidth={1}
            />
            <text
              x={xScale(t)}
              y={height - MARGIN.bottom + 16}
              textAnchor="middle"
              fontSize={10}
              style={{ fill: 'var(--color-text-secondary)' }}
            >
              {t}
            </text>
          </g>
        ))}

        {ordenado.map((aluno, i) => {
          const y = MARGIN.top + i * ROW_H + (ROW_H - BAR_H) / 2
          const w = Math.max(xScale(aluno.nota) - MARGIN.left, 1)
          const acimaDaMedia = aluno.nota >= media
          const isHovered = hovered === i
          return (
            <g key={aluno.id}>
              <text
                x={MARGIN.left - 10}
                y={y + BAR_H / 2}
                textAnchor="end"
                dominantBaseline="middle"
                fontSize={11}
                style={{ fill: 'var(--color-text-secondary)' }}
              >
                {aluno.id}
              </text>
              <path
                d={roundedBarPath(MARGIN.left, y, w, BAR_H, 4)}
                fill={acimaDaMedia ? CHART_COLOR.destaque : CHART_COLOR.neutro}
                opacity={isHovered ? 1 : acimaDaMedia ? 0.95 : 0.55}
                tabIndex={0}
                role="img"
                aria-label={`${aluno.id}: nota ${aluno.nota.toFixed(1)} de 100`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                style={{ cursor: 'pointer', outline: 'none' }}
              />
              <text
                x={xScale(aluno.nota) + 6}
                y={y + BAR_H / 2}
                dominantBaseline="middle"
                fontSize={10.5}
                fontWeight={600}
                style={{ fill: 'var(--color-text-primary)' }}
              >
                {aluno.nota.toFixed(1)}
              </text>
            </g>
          )
        })}

        <line
          x1={xScale(media)}
          x2={xScale(media)}
          y1={MARGIN.top - 6}
          y2={height - MARGIN.bottom}
          stroke={CHART_COLOR.destaque}
          strokeWidth={2}
          strokeDasharray="5 3"
        />
        <text x={xScale(media)} y={MARGIN.top - 10} textAnchor="middle" fontSize={10} fontWeight={600} fill={CHART_COLOR.destaque}>
          Média {media.toFixed(1)}
        </text>
      </svg>

      <ChartTooltip
        xPct={hovered !== null ? (xScale(ordenado[hovered].nota) / WIDTH) * 100 : 0}
        yPct={hovered !== null ? ((MARGIN.top + hovered * ROW_H) / height) * 100 : 0}
        visible={hovered !== null}
      >
        {hovered !== null && (
          <>
            <strong>{ordenado[hovered].id}</strong> · nota {ordenado[hovered].nota.toFixed(1)} · Pedagógica {ordenado[hovered].pedagogica} ·
            Química {ordenado[hovered].quimica}
          </>
        )}
      </ChartTooltip>

      <div className="flex items-center gap-4 mt-2 text-xs text-[var(--color-text-secondary)]">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: CHART_COLOR.destaque }} />
          Igual ou acima da média
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: CHART_COLOR.neutro, opacity: 0.55 }} />
          Abaixo da média
        </span>
      </div>
    </div>
  )
}
