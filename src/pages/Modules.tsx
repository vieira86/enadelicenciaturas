import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Atom,
  FlaskConical,
  Beaker,
  Zap,
  Microscope,
  GraduationCap,
  Search,
  Scale,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import { ProgressBar } from '../components/ui/ProgressBar'
import { useProgress } from '../context/ProgressContext'
import { modules } from '../data/modules'

const iconMap: Record<string, LucideIcon> = {
  Atom,
  FlaskConical,
  Beaker,
  Zap,
  Microscope,
  GraduationCap,
  Search,
  Scale,
  BookOpen,
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

function ModuleIcon({ name, color }: { name: string; color: string }) {
  const Icon = iconMap[name] ?? BookOpen
  return (
    <div
      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
      style={{ backgroundColor: `${color}18` }}
    >
      <Icon size={22} style={{ color }} />
    </div>
  )
}

export default function Modules() {
  const { getModuleProgress } = useProgress()

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Módulos</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">
          8 áreas de conhecimento para revisão completa do ENADE.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4">
        {modules.map((mod) => {
          const prog = getModuleProgress(mod.id)
          const pct = mod.questionIds.length > 0
            ? (prog.completedQuestions.length / mod.questionIds.length) * 100
            : 0

          return (
            <motion.div key={mod.id} variants={item}>
              <Link to={`/modulos/${mod.id}`}>
                <Card className="h-full group">
                  <div className="flex items-start gap-4">
                    <ModuleIcon name={mod.icon} color={mod.color} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="font-semibold text-[var(--color-text-primary)]">{mod.title}</h2>
                        <ArrowRight
                          size={16}
                          className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-transform group-hover:translate-x-0.5 shrink-0"
                        />
                      </div>
                      <p className="text-sm text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                        {mod.description}
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between text-xs text-[var(--color-text-secondary)]">
                          <span>{prog.completedQuestions.length}/{mod.questionIds.length} questões</span>
                          <span>{Math.round(pct)}%</span>
                        </div>
                        <ProgressBar value={pct} color={mod.color} size="sm" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
