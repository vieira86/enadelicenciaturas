import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Badge } from '../components/ui/Badge'
import { useProgress } from '../context/ProgressContext'
import { getModuleById } from '../data/modules'
import { getQuestionsByModule } from '../data/questions'

export default function Quiz() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const { recordAttempt, addStudyTime } = useProgress()

  const mod = moduleId ? getModuleById(moduleId) : undefined
  const questions = mod ? getQuestionsByModule(mod.id) : []

  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => addStudyTime(1), 60000)
    return () => clearInterval(interval)
  }, [addStudyTime])

  if (!mod || questions.length === 0) return <Navigate to="/modulos" replace />

  const q = questions[current]
  const difficultyLabel = { easy: 'Fácil', medium: 'Médio', hard: 'Difícil' }
  const difficultyColor = { easy: '#34c759', medium: '#ff9500', hard: '#ff2d55' }

  const handleSelect = (index: number) => {
    if (revealed) return
    setSelected(index)
    setRevealed(true)
    const correct = index === q.correctIndex
    if (correct) setScore((s) => s + 1)
    recordAttempt(
      { questionId: q.id, selectedIndex: index, correct, timestamp: Date.now() },
      mod.id
    )
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      addStudyTime(Math.round((Date.now() - startTime) / 60000))
      setFinished(true)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center space-y-6 py-8">
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center"
          style={{ backgroundColor: pct >= 70 ? '#34c75918' : '#ff950018' }}
        >
          {pct >= 70 ? (
            <CheckCircle2 size={40} className="text-[#34c759]" />
          ) : (
            <RotateCcw size={40} className="text-[#ff9500]" />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">{pct}%</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            {score} de {questions.length} questões corretas
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => { setCurrent(0); setSelected(null); setRevealed(false); setScore(0); setFinished(false) }}>
            <RotateCcw size={16} /> Refazer
          </Button>
          <Link to={`/modulos/${mod.id}`}>
            <Button variant="secondary">Voltar ao módulo</Button>
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link
          to={`/modulos/${mod.id}`}
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft size={16} /> {mod.title}
        </Link>
        <span className="text-sm text-[var(--color-text-secondary)]">
          {current + 1} / {questions.length}
        </span>
      </div>

      <ProgressBar value={((current + (revealed ? 1 : 0)) / questions.length) * 100} color={mod.color} size="sm" />

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Badge color={difficultyColor[q.difficulty]} variant="outline">
                {difficultyLabel[q.difficulty]}
              </Badge>
              {q.source && (
                <span className="text-xs text-[var(--color-text-secondary)]">{q.source}</span>
              )}
            </div>

            <p className="text-lg font-medium text-[var(--color-text-primary)] leading-relaxed mb-4 whitespace-pre-line">
              {q.text}
            </p>

            {q.imageUrl && (
              <div className="mb-6 rounded-xl overflow-hidden border border-[var(--color-border)] bg-white">
                <img
                  src={`${import.meta.env.BASE_URL}images/questoes/${q.imageUrl}`}
                  alt="Ilustração da questão"
                  className="w-full h-auto"
                />
              </div>
            )}

            <div className="space-y-2.5">
              {q.options.map((option, i) => {
                let style = 'border border-[var(--color-border)] hover:border-[#0071e3]/40 hover:bg-[#0071e3]/5'
                if (revealed) {
                  if (i === q.correctIndex) style = 'border-[#34c759] bg-[#34c759]/10'
                  else if (i === selected) style = 'border-[#ff2d55] bg-[#ff2d55]/10'
                  else style = 'border-[var(--color-border)] opacity-50'
                } else if (selected === i) {
                  style = 'border-[#0071e3] bg-[#0071e3]/10'
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={!revealed ? { scale: 1.01 } : undefined}
                    whileTap={!revealed ? { scale: 0.99 } : undefined}
                    onClick={() => handleSelect(i)}
                    disabled={revealed}
                    className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer disabled:cursor-default ${style}`}
                  >
                    <span className="text-[var(--color-text-secondary)] mr--2">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    <span className="text-[var(--color-text-primary)]">{option}</span>
                    {revealed && i === q.correctIndex && (
                      <CheckCircle2 size={16} className="inline ml-2 text-[#34c759]" />
                    )}
                    {revealed && i === selected && i !== q.correctIndex && (
                      <XCircle size={16} className="inline ml-2 text-[#ff2d55]" />
                    )}
                  </motion.button>
                )
              })}
            </div>

            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-4 rounded-xl bg-[var(--color-surface-secondary)]"
              >
                <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">Explicação</p>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{q.explanation}</p>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {revealed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
          <Button onClick={handleNext}>
            {current + 1 >= questions.length ? 'Finalizar' : 'Próxima'}
            <ChevronRight size={16} />
          </Button>
        </motion.div>
      )}
    </div>
  )
}
