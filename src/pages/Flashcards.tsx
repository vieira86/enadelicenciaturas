import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { useProgress } from '../context/ProgressContext'
import { flashcards } from '../data/questions'
import { modules } from '../data/modules'

export default function FlashcardsPage() {
  const { progress, markFlashcardReviewed } = useProgress()
  const [current, setCurrent] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [filter, setFilter] = useState<string>('all')

  const filtered = filter === 'all' ? flashcards : flashcards.filter((f) => f.moduleId === filter)
  const card = filtered[current]
  const mod = card ? modules.find((m) => m.id === card.moduleId) : undefined
  const reviewed = card ? progress.flashcardsReviewed.includes(card.id) : false

  const next = () => {
    setFlipped(false)
    setCurrent((c) => (c + 1) % filtered.length)
  }

  const prev = () => {
    setFlipped(false)
    setCurrent((c) => (c - 1 + filtered.length) % filtered.length)
  }

  const handleFlip = () => {
    setFlipped((f) => !f)
    if (!flipped && card) markFlashcardReviewed(card.id)
  }

  if (filtered.length === 0) {
    return (
      <div className="text-center py-16">
        <Layers size={48} className="mx-auto text-[var(--color-text-secondary)] mb-4" />
        <p className="text-[var(--color-text-secondary)]">Nenhum flashcard encontrado.</p>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">Flashcards</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">
          {progress.flashcardsReviewed.length}/{flashcards.length} revisados
        </p>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => { setFilter('all'); setCurrent(0); setFlipped(false) }}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${filter === 'all' ? 'bg-[#0071e3] text-white' : 'glass text-[var(--color-text-secondary)]'}`}
        >
          Todos
        </button>
        {modules.map((m) => (
          <button
            key={m.id}
            onClick={() => { setFilter(m.id); setCurrent(0); setFlipped(false) }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${filter === m.id ? 'text-white' : 'glass text-[var(--color-text-secondary)]'}`}
            style={filter === m.id ? { backgroundColor: m.color } : undefined}
          >
            {m.title}
          </button>
        ))}
      </div>

      <div className="relative h-64 cursor-pointer perspective-[1000px]" onClick={handleFlip}>
        <AnimatePresence mode="wait">
          <motion.div
            key={`${card.id}-${flipped}`}
            initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            <Card
              className="h-full flex flex-col items-center justify-center text-center p-8"
              hover={false}
              glass
            >
              {mod && (
                <Badge color={mod.color} variant="outline" >
                  {mod.title}
                </Badge>
              )}
              <p className="text-xl font-medium text-[var(--color-text-primary)] mt-4 leading-relaxed">
                {flipped ? card.back : card.front}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-6">
                {flipped ? 'Verso' : 'Clique para virar'} · {reviewed && '✓ Revisado'}
              </p>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={prev}>
          <ChevronLeft size={18} /> Anterior
        </Button>
        <span className="text-sm text-[var(--color-text-secondary)]">
          {current + 1} / {filtered.length}
        </span>
        <Button variant="ghost" size="sm" onClick={next}>
          Próximo <ChevronRight size={18} />
        </Button>
      </div>

      <div className="text-center">
        <Button variant="secondary" size="sm" onClick={() => { setFlipped(false); setCurrent(0) }}>
          <RotateCcw size={14} /> Reiniciar
        </Button>
      </div>
    </motion.div>
  )
}
