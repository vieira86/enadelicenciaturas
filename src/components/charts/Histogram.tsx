import { useId, useMemo, useState } from 'react'
import type { ResultadoAluno } from '../../data/resultadosTurma'
import { ChartTooltip } from './ChartTooltip'
import { CHART_COLOR } from './chartTheme'

interface HistogramProps {
  dados: ResultadoAluno[]
  /** Linha de referência opcional (ex.: 60 pontos), em pontos de 0–100. */
  referencia?: number
  referenciaLabel?: string
}

const BIN_EDGES = [40, 50, 60, 70, 80, 90]
const WIDTH = 640
const HEIGHT = 300
const MARGIN = { top: 28, right: 16, bottom: 36, left: 32 }
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right
const PLOT_H = HEIGHT - MARGIN.top - MARGIN.bottom

function niceStep(maxValue: number): number {
  if (maxValue <= 4) return 1
  if (maxValue <= 10) return 2
  if (maxValue <= 20) return 5
  return 10
}

export function Histogram({ dados, referencia = 60, referenciaLabel = 'Referência: 60' }: HistogramProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const gradientId = useId()

  const { bins, maxCount, media, xScale } = useMemo(() => {
    const notas = dados.map((a) => a.nota)
    const bins = BIN_EDGES.slice(0, -1).map((start, i) => {
      const end = BIN_EDGES[i + 1]
      const count = notas.filter((n) => n >= start && (i === BIN_EDGES.length - 2 ? n <= end : n < end)).length
      return { start, end, count }
    })
    const maxCount = Math.max(...bins.map((b) => b.count), 1)
    const media = notas.reduce((a, b) => a + b, 0) / notas.length
    const domainMin = BIN_EDGES[0]
    const domainMax = BIN_EDGES[BIN_EDGES.length - 1]
    const xScale = (value: number) => MARGIN.left + ((value - domainMin) / (domainMax - domainMin)) * PLOT_W
    return { bins, maxCount, media, xScale }
  }, [dados])

  const step = niceStep(maxCount)
  const yMax = Math.ceil((maxCount + 1) / step) * step
  const yScale = (count: number) => MARGIN.top + PLOT_H - (count / yMax) * PLOT_H
  const baselineY = MARGIN.top + PLOT_H
  const yTicks = Array.from({ length: yMax / step + 1 }, (_, i) => i * step)

  const barWidth = Math.min(48, PLOT_W / bins.length - 14)

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto" role="img" aria-label="Distribuição das notas da turma">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={CHART_COLOR.destaque} stopOpacity="1" />
            <stop offset="100%" stopColor={CHART_COLOR.destaque} stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* gridlines */}
        {yTicks.map((t) => (
          <g key={t}>
            <line
              x1={MARGIN.left}
              x2={WIDTH - MARGIN.right}
              y1={yScale(t)}
              y2={yScale(t)}
              style={{ stroke: 'var(--color-border)' }}
              strokeWidth={1}
            />
            <text
              x={MARGIN.left - 8}
              y={yScale(t)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={10}
              style={{ fill: 'var(--color-text-secondary)' }}
            >
              {t}
            </text>
          </g>
        ))}

        {/* bars */}
        {bins.map((bin, i) => {
          const cx = xScale((bin.start + bin.end) / 2)
          const h = baselineY - yScale(bin.count)
          const y = yScale(bin.count)
          const isHovered = hovered === i
          return (
            <g key={bin.start}>
              <rect
                x={cx - barWidth / 2}
                y={h === 0 ? baselineY - 0.001 : y}
                width={barWidth}
                height={Math.max(h, 0.001)}
                rx={4}
                fill={`url(#${gradientId})`}
                opacity={isHovered ? 1 : 0.92}
                tabIndex={0}
                role="img"
                aria-label={`${bin.start} a ${bin.end} pontos: ${bin.count} ${bin.count === 1 ? 'aluno' : 'alunos'}`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                style={{ cursor: 'pointer', outline: 'none' }}
              />
              {bin.count > 0 && (
                <text
                  x={cx}
                  y={y - 8}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={600}
                  style={{ fill: 'var(--color-text-primary)' }}
                >
                  {bin.count}
                </text>
              )}
              <text
                x={cx}
                y={baselineY + 18}
                textAnchor="middle"
                fontSize={10}
                style={{ fill: 'var(--color-text-secondary)' }}
              >
                {bin.start}–{bin.end}
              </text>
            </g>
          )
        })}

        {/* linha de referência */}
        {referencia >= BIN_EDGES[0] && referencia <= BIN_EDGES[BIN_EDGES.length - 1] && (
          <g>
            <line
              x1={xScale(referencia)}
              x2={xScale(referencia)}
              y1={MARGIN.top}
              y2={baselineY}
              style={{ stroke: 'var(--color-text-secondary)' }}
              strokeWidth={1.5}
              strokeDasharray="3 3"
            />
          </g>
        )}

        {/* linha da média */}
        <g>
          <line
            x1={xScale(media)}
            x2={xScale(media)}
            y1={MARGIN.top}
            y2={baselineY}
            stroke={CHART_COLOR.destaque}
            strokeWidth={2}
            strokeDasharray="5 3"
          />
          <text
            x={xScale(media)}
            y={MARGIN.top - 12}
            textAnchor="middle"
            fontSize={10}
            fontWeight={600}
            fill={CHART_COLOR.destaque}
          >
            Média: {media.toFixed(1)}
          </text>
        </g>
      </svg>

      <ChartTooltip
        xPct={bins[hovered ?? 0] ? ((MARGIN.left + ((bins[hovered ?? 0].start + bins[hovered ?? 0].end) / 2 - BIN_EDGES[0]) / (BIN_EDGES[BIN_EDGES.length - 1] - BIN_EDGES[0]) * PLOT_W) / WIDTH) * 100 : 0}
        yPct={hovered !== null ? (yScale(bins[hovered].count) / HEIGHT) * 100 : 0}
        visible={hovered !== null}
      >
        {hovered !== null && (
          <>
            <strong>{bins[hovered].count}</strong> {bins[hovered].count === 1 ? 'aluno' : 'alunos'} · {bins[hovered].start}–{bins[hovered].end} pts
          </>
        )}
      </ChartTooltip>

      <div className="flex items-center gap-4 mt-2 text-xs text-[var(--color-text-secondary)]">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: CHART_COLOR.destaque }} />
          Média da turma
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 rounded-full border-t-2 border-dashed" style={{ borderColor: 'var(--color-text-secondary)' }} />
          {referenciaLabel}
        </span>
      </div>
    </div>
  )
}
