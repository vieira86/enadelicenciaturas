import { useMemo, useState } from 'react'
import type { ResultadoAluno } from '../../data/resultadosTurma'
import { ChartTooltip } from './ChartTooltip'
import { CHART_COLOR } from './chartTheme'

interface ScatterAreasProps {
  dados: ResultadoAluno[]
}

const WIDTH = 640
const HEIGHT = 380
const MARGIN = { top: 20, right: 20, bottom: 44, left: 44 }
const PLOT_W = WIDTH - MARGIN.left - MARGIN.right
const PLOT_H = HEIGHT - MARGIN.top - MARGIN.bottom

function ticks(max: number, step: number) {
  const out: number[] = []
  for (let v = 0; v <= max; v += step) out.push(v)
  return out
}

export function ScatterAreas({ dados }: ScatterAreasProps) {
  const [hovered, setHovered] = useState<number | null>(null)

  const { xMax, yMax, mediaX, mediaY } = useMemo(() => {
    const quimicas = dados.map((a) => a.quimica)
    const pedagogicas = dados.map((a) => a.pedagogica)
    return {
      xMax: Math.max(...quimicas) + 2,
      yMax: Math.max(...pedagogicas) + 2,
      mediaX: quimicas.reduce((a, b) => a + b, 0) / quimicas.length,
      mediaY: pedagogicas.reduce((a, b) => a + b, 0) / pedagogicas.length,
    }
  }, [dados])

  const xScale = (v: number) => MARGIN.left + (v / xMax) * PLOT_W
  const yScale = (v: number) => MARGIN.top + PLOT_H - (v / yMax) * PLOT_H

  const xTickStep = xMax > 15 ? 5 : 2
  const yTickStep = yMax > 15 ? 5 : 2

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full h-auto" role="img" aria-label="Química versus Pedagógica por aluno">
        {ticks(xMax, xTickStep).map((t) => (
          <g key={`x${t}`}>
            <line x1={xScale(t)} x2={xScale(t)} y1={MARGIN.top} y2={MARGIN.top + PLOT_H} style={{ stroke: 'var(--color-border)' }} strokeWidth={1} />
            <text x={xScale(t)} y={MARGIN.top + PLOT_H + 16} textAnchor="middle" fontSize={10} style={{ fill: 'var(--color-text-secondary)' }}>
              {t}
            </text>
          </g>
        ))}
        {ticks(yMax, yTickStep).map((t) => (
          <g key={`y${t}`}>
            <line x1={MARGIN.left} x2={MARGIN.left + PLOT_W} y1={yScale(t)} y2={yScale(t)} style={{ stroke: 'var(--color-border)' }} strokeWidth={1} />
            <text x={MARGIN.left - 8} y={yScale(t)} textAnchor="end" dominantBaseline="middle" fontSize={10} style={{ fill: 'var(--color-text-secondary)' }}>
              {t}
            </text>
          </g>
        ))}

        {/* linhas de média (quadrantes) */}
        <line x1={xScale(mediaX)} x2={xScale(mediaX)} y1={MARGIN.top} y2={MARGIN.top + PLOT_H} style={{ stroke: 'var(--color-text-secondary)' }} strokeWidth={1.5} strokeDasharray="4 3" />
        <line x1={MARGIN.left} x2={MARGIN.left + PLOT_W} y1={yScale(mediaY)} y2={yScale(mediaY)} style={{ stroke: 'var(--color-text-secondary)' }} strokeWidth={1.5} strokeDasharray="4 3" />

        <text x={xScale(mediaX)} y={MARGIN.top - 6} textAnchor="middle" fontSize={9.5} style={{ fill: 'var(--color-text-secondary)' }}>
          média Química
        </text>
        <text x={MARGIN.left + PLOT_W + 2} y={yScale(mediaY) - 4} textAnchor="end" fontSize={9.5} style={{ fill: 'var(--color-text-secondary)' }}>
          média Pedagógica
        </text>

        {dados.map((aluno, i) => {
          const cx = xScale(aluno.quimica)
          const cy = yScale(aluno.pedagogica)
          const isHovered = hovered === i
          return (
            <g key={aluno.id}>
              <circle cx={cx} cy={cy} r={6} fill={CHART_COLOR.destaque} stroke="var(--color-surface)" strokeWidth={2} opacity={isHovered ? 1 : 0.85} />
              <circle
                cx={cx}
                cy={cy}
                r={13}
                fill="transparent"
                tabIndex={0}
                role="img"
                aria-label={`${aluno.id}: ${aluno.quimica} acertos em Química, ${aluno.pedagogica} em Pedagógica`}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                style={{ cursor: 'pointer', outline: 'none' }}
              />
            </g>
          )
        })}

        <text x={MARGIN.left + PLOT_W / 2} y={HEIGHT - 6} textAnchor="middle" fontSize={11} fontWeight={600} style={{ fill: 'var(--color-text-secondary)' }}>
          Acertos em Química
        </text>
        <text
          x={12}
          y={MARGIN.top + PLOT_H / 2}
          textAnchor="middle"
          fontSize={11}
          fontWeight={600}
          style={{ fill: 'var(--color-text-secondary)' }}
          transform={`rotate(-90, 12, ${MARGIN.top + PLOT_H / 2})`}
        >
          Acertos em Pedagógica
        </text>
      </svg>

      <ChartTooltip
        xPct={hovered !== null ? (xScale(dados[hovered].quimica) / WIDTH) * 100 : 0}
        yPct={hovered !== null ? (yScale(dados[hovered].pedagogica) / HEIGHT) * 100 : 0}
        visible={hovered !== null}
      >
        {hovered !== null && (
          <>
            <strong>{dados[hovered].id}</strong> · Química {dados[hovered].quimica} · Pedagógica {dados[hovered].pedagogica} · nota{' '}
            {dados[hovered].nota.toFixed(1)}
          </>
        )}
      </ChartTooltip>
    </div>
  )
}
