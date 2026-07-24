import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Flame,
  Target,
  Clock,
  TrendingUp,
  BookOpen,
  ClipboardList,
  GraduationCap,
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { DatesNotice } from '../components/DatesNotice'
import { useProgress } from '../context/ProgressContext'
import { modules, getTotalQuestions } from '../data/modules'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Dashboard() {
  const { progress, getModuleProgress } = useProgress()
  const totalQuestions = getTotalQuestions()

  const completedQuestions = Object.values(progress.modules).reduce(
    (acc, m) => acc + m.completedQuestions.length,
    0
  )

  const overallPct = totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0

  const correctTotal = Object.values(progress.modules).reduce(
    (acc, m) => acc + m.correctCount,
    0
  )

  const accuracy = completedQuestions > 0 ? Math.round((correctTotal / completedQuestions) * 100) : 0

  const recentModules = [...modules]
    .map((m) => ({ ...m, prog: getModuleProgress(m.id) }))
    .sort((a, b) => b.prog.lastStudied - a.prog.lastStudied)
    .slice(0, 3)

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10">
      {/* Hero */}
      <motion.section variants={item} className="relative overflow-hidden rounded-[2rem] -mx-4 sm:mx-0">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[26rem] h-[26rem] rounded-full bg-[#0071e3]/25 blur-[90px]" />
          <div className="absolute bottom-[-25%] right-[-10%] w-[26rem] h-[26rem] rounded-full bg-[#34c759]/20 blur-[90px]" />
          <div className="absolute top-[10%] right-[15%] w-64 h-64 rounded-full bg-[#af52de]/15 blur-[80px]" />
          <div className="absolute inset-0 bg-[var(--color-surface)]/60 dark:bg-black/30" />
        </div>

        <div className="text-center space-y-5 px-6 py-16 sm:py-24">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full glass text-xs font-medium text-[var(--color-text-secondary)]">
            <GraduationCap size={13} className="text-[#0071e3]" />
            IFRO · Campus Ji-Paraná · Licenciatura em Química
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--color-text-primary)] leading-[1.05]">
            Revisão ENADE.
            <br />
            <span className="bg-gradient-to-r from-[#0071e3] via-[#5856d6] to-[#34c759] bg-clip-text text-transparent">
              Simples assim.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed">
            Montamos questões comentadas, flashcards, simulados e vídeos selecionados para
            prepará-los para o exame — tudo em um só lugar.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link to="/simulado">
              <Button size="lg">
                <ClipboardList size={18} />
                Iniciar Estudos
              </Button>
            </Link>
            <Link to="/modulos">
              <Button variant="secondary" size="lg">
                <BookOpen size={18} />
                Ver Módulos
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Datas importantes */}
      <motion.section variants={item}>
        <DatesNotice />
      </motion.section>

      {/* Stats */}
      <motion.section variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Target, label: 'Progresso Geral', value: `${Math.round(overallPct)}%`, color: '#0071e3' },
          { icon: TrendingUp, label: 'Taxa de Acerto', value: `${accuracy}%`, color: '#34c759' },
          { icon: Flame, label: 'Sequência', value: `${progress.streak} dias`, color: '#ff9500' },
          { icon: Clock, label: 'Tempo de Estudo', value: `${progress.totalStudyTime} min`, color: '#af52de' },
        ].map(({ icon: Icon, label, value, color }) => (
          <Card key={label} padding="sm" hover={false}>
            <div className="flex items-start gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${color}18` }}
              >
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

      {/* Overall progress */}
      <motion.section variants={item}>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Seu Progresso</h2>
            <span className="text-sm text-[var(--color-text-secondary)]">
              {completedQuestions} de {totalQuestions} questões
            </span>
          </div>
          <ProgressBar value={overallPct} showLabel />
        </Card>
      </motion.section>

      {/* Recent modules */}
      <motion.section variants={item} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Módulos</h2>
          <Link to="/modulos" className="text-sm text-[#0071e3] flex items-center gap-1 hover:underline">
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(recentModules.length > 0 ? recentModules : modules.slice(0, 3)).map((mod) => {
            const prog = getModuleProgress(mod.id)
            const pct = mod.questionIds.length > 0
              ? (prog.completedQuestions.length / mod.questionIds.length) * 100
              : 0
            return (
              <Link key={mod.id} to={`/modulos/${mod.id}`}>
                <Card className="h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${mod.color}18` }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mod.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--color-text-primary)] text-sm">{mod.title}</h3>
                      <p className="text-xs text-[var(--color-text-secondary)]">{mod.questionIds.length} questões</p>
                    </div>
                  </div>
                  <ProgressBar value={pct} color={mod.color} size="sm" />
                </Card>
              </Link>
            )
          })}
        </div>
      </motion.section>

      {/* Last simulado */}
      {progress.simulados.length > 0 && (
        <motion.section variants={item}>
          <Card glass>
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Último Simulado</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-[var(--color-text-primary)]">
                  {Math.round((progress.simulados[0].score / progress.simulados[0].total) * 100)}%
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {progress.simulados[0].score}/{progress.simulados[0].total} acertos ·{' '}
                  {new Date(progress.simulados[0].date).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <Link to="/progresso">
                <Button variant="secondary" size="sm">Ver histórico</Button>
              </Link>
            </div>
          </Card>
        </motion.section>
      )}
    </motion.div>
  )
}
