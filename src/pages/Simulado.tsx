import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClipboardList, Clock, CheckCircle2, XCircle, ChevronRight, RotateCcw } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/ui/ProgressBar'
import { useProgress } from '../context/ProgressContext'
import { getRandomQuestions } from '../data/questions'
import type { Question, QuestionAttempt } from '../types'

const SIMULADO_SIZE = 10
const TIME_LIMIT = 60 * 60 // 60 minutes in seconds

type Phase = 'intro' | 'running' | 'finished'

export default function Simulado() {
  const { recordSimulado, addStudyTime } = useProgress()
  const [phase, setPhase] = useState<Phase>('intro')
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<QuestionAttempt[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT)
  const [startTime, setStartTime] = useState(0)

  const finish = useCallback((finalAnswers?: QuestionAttempt[]) => {
    const resolved = finalAnswers ?? answers
    const score = resolved.filter((a) => a.correct).length
    const duration = Math.round((Date.now() - startTime) / 1000)
    addStudyTime(Math.round(duration / 60))
    recordSimulado({
      id: crypto.randomUUID(),
      date: Date.now(),
      score,
      total: questions.length,
      duration,
      answers: resolved,
    })
    setPhase('finished')
  }, [answers, startTime, questions.length, recordSimulado, addStudyTime])

  useEffect(() => {
    if (phase !== 'running') return
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer)
          finish()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [phase, finish])

  const start = () => {
    setQuestions(getRandomQuestions(SIMULADO_SIZE))
    setCurrent(0)
    setAnswers([])
    setSelected(null)
    setTimeLeft(TIME_LIMIT)
    setStartTime(Date.now())
    setPhase('running')
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  if (phase === 'intro') {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto text-center space-y-8 py-8">
        <div className="w-20 h-20 rounded-3xl bg-[#0071e3]/10 flex items-center justify-center mx-auto">
          <ClipboardList size={36} className="text-[#0071e3]" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Simulado ENADE</h1>
          <p className="text-[var(--color-text-secondary)] mt-2 leading-relaxed">
            {SIMULADO_SIZE} questões aleatórias · {TIME_LIMIT / 60} minutos · Todas as áreas
          </p>
        </div>
        <Card glass padding="lg" className="text-left space-y-3">
          <h3 className="font-semibold text-[var(--color-text-primary)]">Instruções</h3>
          <ul className="text-sm text-[var(--color-text-secondary)] space-y-2">
            <li>• Questões de todas as 8 áreas do conhecimento</li>
            <li>• Tempo limite de 60 minutos</li>
            <li>• Resultado salvo automaticamente no seu progresso</li>
            <li>• Você pode revisar explicações após cada resposta</li>
          </ul>
        </Card>
        <Button size="lg" onClick={start}>
          <ClipboardList size={18} /> Iniciar Simulado
        </Button>
      </motion.div>
    )
  }

  if (phase === 'finished') {
    const score = answers.filter((a) => a.correct).length
    const pct = Math.round((score / questions.length) * 100)
    const duration = Math.round((Date.now() - startTime) / 1000)

    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg mx-auto text-center space-y-6 py-8">
        <div
          className="w-24 h-24 rounded-full mx-auto flex items-center justify-center"
          style={{ backgroundColor: pct >= 60 ? '#34c75918' : '#ff950018' }}
        >
          <span className="text-3xl font-bold" style={{ color: pct >= 60 ? '#34c759' : '#ff9500' }}>
            {pct}%
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Simulado Concluído</h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            {score}/{questions.length} acertos · {formatTime(duration)}
          </p>
        </div>
        <Card padding="sm" className="text-left">
          <p className="text-sm text-[var(--color-text-secondary)]">
            {pct >= 60
              ? 'Ótimo desempenho! Continue revisando os módulos com menor aproveitamento.'
              : 'Continue estudando! Revise os módulos e tente novamente.'}
          </p>
        </Card>
        <Button onClick={start}>
          <RotateCcw size={16} /> Novo Simulado
        </Button>
      </motion.div>
    )
  }

  const q = questions[current]
  const revealed = selected !== null

  const handleSelect = (index: number) => {
    if (revealed) return
    setSelected(index)
    const correct = index === q.correctIndex
    setAnswers((prev) => [
      ...prev,
      { questionId: q.id, selectedIndex: index, correct, timestamp: Date.now() },
    ])
  }

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      finish(answers)
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm">
          <Clock size={16} className={timeLeft < 300 ? 'text-[#ff2d55]' : 'text-[var(--color-text-secondary)]'} />
          <span className={`font-mono font-medium ${timeLeft < 300 ? 'text-[#ff2d55]' : 'text-[var(--color-text-primary)]'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <span className="text-sm text-[var(--color-text-secondary)]">
          {current + 1} / {questions.length}
        </span>
      </div>

      <ProgressBar value={((current + (revealed ? 1 : 0)) / questions.length) * 100} size="sm" />

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card>
            <p className="text-lg font-medium text-[var(--color-text-primary)] leading-relaxed mb-6">
              {q.text}
            </p>
            <div className="space-y-2.5">
              {q.options.map((option, i) => {
                let style = 'border border-[var(--color-border)] hover:border-[#0071e3]/40'
                if (revealed) {
                  if (i === q.correctIndex) style = 'border-[#34c759] bg-[#34c759]/10'
                  else if (i === selected) style = 'border-[#ff2d55] bg-[#ff2d55]/10'
                  else style = 'border-[var(--color-border)] opacity-50'
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleSelect(i)}
                    disabled={revealed}
                    className={`w-full text-left px-4 py-3.5 rounded-xl text-sm transition-all cursor-pointer disabled:cursor-default ${style}`}
                  >
                    <span className="text-[var(--color-text-secondary)] mr-2">{String.fromCharCode(65 + i)}.</span>
                    <span className="text-[var(--color-text-primary)]">{option}</span>
                    {revealed && i === q.correctIndex && <CheckCircle2 size={16} className="inline ml-2 text-[#34c759]" />}
                    {revealed && i === selected && i !== q.correctIndex && <XCircle size={16} className="inline ml-2 text-[#ff2d55]" />}
                  </button>
                )
              })}
            </div>
            {revealed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-5 p-4 rounded-xl bg-[var(--color-surface-secondary)]">
                <p className="text-sm text-[var(--color-text-secondary)]">{q.explanation}</p>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>

      {revealed && (
        <div className="flex justify-end">
          <Button onClick={handleNext}>
            {current + 1 >= questions.length ? 'Finalizar' : 'Próxima'}
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  )
}
