import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Circle, Play, Video } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { ProgressBar } from '../components/ui/ProgressBar'
import { useProgress } from '../context/ProgressContext'
import { getModuleById } from '../data/modules'
import { getQuestionsByModule, getFlashcardsByModule } from '../data/questions'
import { getVideosByModule } from '../data/videos'

export default function ModuleDetail() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { getModuleProgress } = useProgress()

  const mod = moduleId ? getModuleById(moduleId) : undefined
  if (!mod) return <Navigate to="/modulos" replace />

  const questions = getQuestionsByModule(mod.id)
  const flashcards = getFlashcardsByModule(mod.id)
  const moduleVideos = getVideosByModule(mod.id)
  const prog = getModuleProgress(mod.id)
  const pct = questions.length > 0 ? (prog.completedQuestions.length / questions.length) * 100 : 0

  const difficultyLabel = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' }
  const difficultyColor = { easy: '#34c759', medium: '#ff9500', hard: '#ff2d55' }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div>
        <Link
          to="/modulos"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-4 transition-colors"
        >
          <ArrowLeft size={16} /> Voltar aos módulos
        </Link>
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${mod.color}18` }}
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: mod.color }} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">{mod.title}</h1>
            <p className="text-[var(--color-text-secondary)] mt-1">{mod.description}</p>
          </div>
        </div>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[var(--color-text-primary)]">Progresso do módulo</span>
          <span className="text-sm text-[var(--color-text-secondary)]">{Math.round(pct)}%</span>
        </div>
        <ProgressBar value={pct} color={mod.color} showLabel />
      </Card>

      <div>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Tópicos</h2>
        <div className="flex flex-wrap gap-2">
          {mod.topics.map((topic) => (
            <Badge key={topic} color={mod.color} variant="outline">{topic}</Badge>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Questões</h2>
          <Link to={`/quiz/${mod.id}`}>
            <Button size="sm">
              <Play size={14} /> Estudar
            </Button>
          </Link>
        </div>
        <div className="space-y-2">
          {questions.map((q, i) => {
            const done = prog.completedQuestions.includes(q.id)
            return (
              <Card key={q.id} hover={false} padding="sm" className="flex items-center gap-3">
                {done ? (
                  <CheckCircle2 size={18} className="text-[#34c759] shrink-0" />
                ) : (
                  <Circle size={18} className="text-[var(--color-text-secondary)] shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--color-text-primary)] truncate">
                    {i + 1}. {q.text}
                  </p>
                </div>
                <Badge color={difficultyColor[q.difficulty]} variant="outline">
                  {difficultyLabel[q.difficulty]}
                </Badge>
              </Card>
            )
          })}
        </div>
      </div>

      {moduleVideos.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
            Vídeos recomendados
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {moduleVideos.map((v) => (
              <a
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card hover padding="sm" className="h-full">
                  <div className="flex gap-3">
                    <div className="w-28 shrink-0 rounded-lg overflow-hidden bg-black/5">
                      <img
                        src={`https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg`}
                        alt={v.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Video size={13} className="text-[#ff0000] shrink-0" />
                        <span className="text-[11px] text-[var(--color-text-secondary)] truncate">{v.topic}</span>
                      </div>
                      <p className="text-sm font-medium text-[var(--color-text-primary)] mt-0.5 line-clamp-2">
                        {v.title}
                      </p>
                      <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                        {v.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}

      {flashcards.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
            Flashcards ({flashcards.length})
          </h2>
          <Link to="/flashcards">
            <Button variant="secondary" size="sm">Revisar flashcards</Button>
          </Link>
        </div>
      )}
    </motion.div>
  )
}
