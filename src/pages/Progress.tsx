import { motion } from 'framer-motion'
import { BarChart3, Trash2, Trophy, Calendar, Target } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { useProgress } from '../context/ProgressContext'
import { modules, getTotalQuestions } from '../data/modules'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function ProgressPage() {
  const { progress, getModuleProgress, resetProgress } = useProgress()
  const totalQuestions = getTotalQuestions()

  const completedQuestions = Object.values(progress.modules).reduce(
    (acc, m) => acc + m.completedQuestions.length,
    0
  )

  const correctTotal = Object.values(progress.modules).reduce(
    (acc, m) => acc + m.correctCount,
    0
  )

  const overallPct = totalQuestions > 0 ? (completedQuestions / totalQuestions) * 100 : 0
  const accuracy = completedQuestions > 0 ? Math.round((correctTotal / completedQuestions) * 100) : 0

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar todo o progresso? Esta ação não pode ser desfeita.')) {
      resetProgress()
    }
  }

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Progresso</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">
          Acompanhe seu desempenho e histórico de estudos.
        </p>
      </motion.div>

      <motion.div variants={item} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Target, label: 'Questões Respondidas', value: `${completedQuestions}/${totalQuestions}` },
          { icon: BarChart3, label: 'Taxa de Acerto', value: `${accuracy}%` },
          { icon: Trophy, label: 'Simulados Realizados', value: `${progress.simulados.length}` },
          { icon: Calendar, label: 'Sequência de Estudo', value: `${progress.streak} dias` },
        ].map(({ icon: Icon, label, value }) => (
          <Card key={label} padding="sm" hover={false}>
            <Icon size={20} className="text-[#0071e3] mb-2" />
            <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
            <p className="text-xl font-semibold text-[var(--color-text-primary)]">{value}</p>
          </Card>
        ))}
      </motion.div>

      <motion.div variants={item}>
        <Card>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">Progresso Geral</h2>
          <ProgressBar value={overallPct} showLabel />
        </Card>
      </motion.div>

      <motion.div variants={item} className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Por Módulo</h2>
        {modules.map((mod) => {
          const prog = getModuleProgress(mod.id)
          const pct = mod.questionIds.length > 0
            ? (prog.completedQuestions.length / mod.questionIds.length) * 100
            : 0
          const modAccuracy = prog.totalAttempts > 0
            ? Math.round((prog.correctCount / prog.totalAttempts) * 100)
            : 0

          return (
            <Card key={mod.id} padding="sm" hover={false}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: mod.color }} />
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{mod.title}</span>
                </div>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {prog.completedQuestions.length}/{mod.questionIds.length} · {modAccuracy}% acerto
                </span>
              </div>
              <ProgressBar value={pct} color={mod.color} size="sm" />
            </Card>
          )
        })}
      </motion.div>

      {progress.simulados.length > 0 && (
        <motion.div variants={item} className="space-y-3">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Histórico de Simulados</h2>
          {progress.simulados.map((sim) => (
            <Card key={sim.id} padding="sm" hover={false}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[var(--color-text-primary)]">
                    {Math.round((sim.score / sim.total) * 100)}% — {sim.score}/{sim.total} acertos
                  </p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {new Date(sim.date).toLocaleDateString('pt-BR', {
                      day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
                <span className="text-xs text-[var(--color-text-secondary)]">
                  {Math.floor(sim.duration / 60)}min {sim.duration % 60}s
                </span>
              </div>
            </Card>
          ))}
        </motion.div>
      )}

      <motion.div variants={item} className="pt-4">
        <Button variant="danger" size="sm" onClick={handleReset}>
          <Trash2 size={14} /> Resetar Progresso
        </Button>
      </motion.div>
    </motion.div>
  )
}
