import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Target, TrendingUp, Award, Table2, ChevronDown, Info } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Histogram } from '../components/charts/Histogram'
import { RankingBar } from '../components/charts/RankingBar'
import { ScatterAreas } from '../components/charts/ScatterAreas'
import { AreaComparison } from '../components/charts/AreaComparison'
import { CHART_COLOR } from '../components/charts/chartTheme'
import { resultadosTurma, estatisticasTurma } from '../data/resultadosTurma'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function ResultadosTurma() {
  const [tabelaAberta, setTabelaAberta] = useState(false)
  const e = estatisticasTurma

  const pctQuimica = (e.mediaQuimica / e.maiorQuimica) * 100
  const pctPedagogica = (e.mediaPedagogica / e.maiorPedagogica) * 100
  const areaForte = pctQuimica >= pctPedagogica ? 'Química' : 'Pedagógica'
  const areaFraca = areaForte === 'Química' ? 'Pedagógica' : 'Química'
  const diferencaAreas = Math.abs(pctQuimica - pctPedagogica)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
      {/* Hero */}
      <motion.section variants={item} className="relative overflow-hidden rounded-[2rem] -mx-4 sm:mx-0">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[26rem] h-[26rem] rounded-full bg-[#0071e3]/20 blur-[90px]" />
          <div className="absolute bottom-[-25%] right-[-10%] w-[26rem] h-[26rem] rounded-full bg-[#1f8a3d]/15 blur-[90px]" />
          <div className="absolute inset-0 bg-[var(--color-surface)]/60 dark:bg-black/30" />
        </div>

        <div className="text-center space-y-4 px-6 py-14 sm:py-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass text-xs font-medium text-[var(--color-text-secondary)]">
            <Users size={13} className="text-[#0071e3]" />
            Simulado ENADE · resultado da turma
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.05]">
            Resultados da Turma
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Como a turma foi, em conjunto, no simulado — distribuição de notas, comparação entre as áreas e onde vale a
            pena reforçar os estudos. Os dados individuais aparecem de forma anônima (código, não nome).
          </p>
        </div>
      </motion.section>

      {/* Stat tiles */}
      <motion.section variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Estudantes', value: `${e.totalAlunos}`, color: '#0071e3' },
          { icon: Target, label: 'Média da turma', value: e.media.toFixed(1), color: '#34c759' },
          { icon: TrendingUp, label: 'Na média ou acima', value: `${e.acimaDaMedia} de ${e.totalAlunos}`, color: '#ff9500' },
          { icon: Award, label: 'Maior nota', value: e.maior.toFixed(1), color: '#af52de' },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label} padding="sm" hover={false}>
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
                <Icon size={18} style={{ color }} />
              </div>
              <div>
                <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
                <p className="text-xl font-semibold text-[var(--color-text-primary)] mt-0.5">{value}</p>
              </div>
            </div>
          </Card>
        ))}
      </motion.section>

      {/* Leitura rápida */}
      <motion.section variants={item}>
        <Card glass>
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-[#0071e3]/15">
              <Info size={18} className="text-[#0071e3]" />
            </div>
            <div className="space-y-1">
              <h2 className="font-semibold text-[var(--color-text-primary)] text-sm">O que os números mostram</h2>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                A turma teve um desempenho relativo melhor em <strong className="text-[var(--color-text-primary)]">{areaForte}</strong> do
                que em <strong className="text-[var(--color-text-primary)]">{areaFraca}</strong> — uma diferença de{' '}
                {diferencaAreas.toFixed(0)} pontos percentuais em relação ao melhor resultado de cada área. A nota média foi{' '}
                {e.media.toFixed(1)}, com {e.acimaDaMedia} de {e.totalAlunos} estudantes na média ou acima dela.
              </p>
            </div>
          </div>
        </Card>
      </motion.section>

      {/* Distribuição */}
      <motion.section variants={item} className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Distribuição das notas</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">Quantos estudantes caíram em cada faixa de nota.</p>
        </div>
        <Card>
          <Histogram dados={resultadosTurma} referencia={60} referenciaLabel="Referência: 60" />
        </Card>
      </motion.section>

      {/* Área comparison + scatter */}
      <motion.section variants={item} className="grid lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Desempenho por área</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Média da turma como % do maior resultado alcançado em cada área (as duas partes têm número de questões diferentes).
            </p>
          </div>
          <Card>
            <AreaComparison
              mediaPedagogica={e.mediaPedagogica}
              maiorPedagogica={e.maiorPedagogica}
              mediaQuimica={e.mediaQuimica}
              maiorQuimica={e.maiorQuimica}
            />
          </Card>
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Química × Pedagógica</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              Cada ponto é um estudante. As linhas tracejadas marcam a média da turma em cada eixo.
            </p>
          </div>
          <Card>
            <ScatterAreas dados={resultadosTurma} />
          </Card>
        </div>
      </motion.section>

      {/* Ranking */}
      <motion.section variants={item} className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Ranking da turma (anônimo)</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Cada estudante recebe um código — a ordem dos códigos não indica a posição no ranking.
          </p>
        </div>
        <Card>
          <RankingBar dados={resultadosTurma} media={e.media} />
        </Card>
      </motion.section>

      {/* Tabela completa */}
      <motion.section variants={item}>
        <Card>
          <button
            onClick={() => setTabelaAberta((v) => !v)}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="flex items-center gap-2 font-semibold text-[var(--color-text-primary)] text-sm">
              <Table2 size={16} />
              Ver tabela completa (anônima)
            </span>
            <ChevronDown size={18} className={`text-[var(--color-text-secondary)] transition-transform ${tabelaAberta ? 'rotate-180' : ''}`} />
          </button>

          {tabelaAberta && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--color-border)] text-left text-xs text-[var(--color-text-secondary)]">
                    <th className="py-2 pr-4 font-medium">Aluno</th>
                    <th className="py-2 pr-4 font-medium">Pedagógica</th>
                    <th className="py-2 pr-4 font-medium">Química</th>
                    <th className="py-2 pr-4 font-medium">Nota</th>
                  </tr>
                </thead>
                <tbody className="[font-variant-numeric:tabular-nums]">
                  {[...resultadosTurma]
                    .sort((a, b) => b.nota - a.nota)
                    .map((aluno) => (
                      <tr key={aluno.id} className="border-b border-[var(--color-border)] last:border-0">
                        <td className="py-2 pr-4 text-[var(--color-text-primary)]">{aluno.id}</td>
                        <td className="py-2 pr-4 text-[var(--color-text-secondary)]">{aluno.pedagogica}</td>
                        <td className="py-2 pr-4 text-[var(--color-text-secondary)]">{aluno.quimica}</td>
                        <td className="py-2 pr-4 font-medium" style={{ color: aluno.nota >= e.media ? CHART_COLOR.destaque : 'var(--color-text-secondary)' }}>
                          {aluno.nota.toFixed(1)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </motion.section>
    </motion.div>
  )
}
