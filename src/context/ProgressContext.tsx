import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from 'react'
import type { UserProgress, QuestionAttempt, SimuladoResult, ModuleProgress } from '../types'
import { DEFAULT_PROGRESS } from '../types'
import { loadFromStorage, saveToStorage, STORAGE_KEY } from '../utils/storage'

interface ProgressContextValue {
  progress: UserProgress
  recordAttempt: (attempt: QuestionAttempt, moduleId: string) => void
  recordSimulado: (result: SimuladoResult) => void
  markFlashcardReviewed: (flashcardId: string) => void
  addStudyTime: (minutes: number) => void
  resetProgress: () => void
  getModuleProgress: (moduleId: string) => ModuleProgress
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

function updateStreak(progress: UserProgress): number {
  const now = Date.now()
  const lastVisit = progress.lastVisit
  const dayMs = 86400000
  const diff = now - lastVisit

  if (diff < dayMs) return progress.streak
  if (diff < dayMs * 2) return progress.streak + 1
  return 1
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() =>
    loadFromStorage(STORAGE_KEY, DEFAULT_PROGRESS)
  )

  useEffect(() => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        streak: updateStreak(prev),
        lastVisit: Date.now(),
      }
      saveToStorage(STORAGE_KEY, updated)
      return updated
    })
  }, [])

  const persist = useCallback((next: UserProgress) => {
    setProgress(next)
    saveToStorage(STORAGE_KEY, next)
  }, [])

  const getModuleProgress = useCallback(
    (moduleId: string): ModuleProgress => {
      return (
        progress.modules[moduleId] ?? {
          moduleId,
          completedQuestions: [],
          correctCount: 0,
          totalAttempts: 0,
          lastStudied: 0,
        }
      )
    },
    [progress.modules]
  )

  const recordAttempt = useCallback(
    (attempt: QuestionAttempt, moduleId: string) => {
      setProgress((prev) => {
        const mod = prev.modules[moduleId] ?? {
          moduleId,
          completedQuestions: [],
          correctCount: 0,
          totalAttempts: 0,
          lastStudied: 0,
        }

        const alreadyDone = mod.completedQuestions.includes(attempt.questionId)
        const completedQuestions = alreadyDone
          ? mod.completedQuestions
          : [...mod.completedQuestions, attempt.questionId]

        const next: UserProgress = {
          ...prev,
          modules: {
            ...prev.modules,
            [moduleId]: {
              ...mod,
              completedQuestions,
              correctCount: mod.correctCount + (attempt.correct ? 1 : 0),
              totalAttempts: mod.totalAttempts + 1,
              lastStudied: Date.now(),
            },
          },
        }
        saveToStorage(STORAGE_KEY, next)
        return next
      })
    },
    []
  )

  const recordSimulado = useCallback((result: SimuladoResult) => {
    setProgress((prev) => {
      const next: UserProgress = {
        ...prev,
        simulados: [result, ...prev.simulados].slice(0, 20),
      }
      saveToStorage(STORAGE_KEY, next)
      return next
    })
  }, [])

  const markFlashcardReviewed = useCallback((flashcardId: string) => {
    setProgress((prev) => {
      if (prev.flashcardsReviewed.includes(flashcardId)) return prev
      const next: UserProgress = {
        ...prev,
        flashcardsReviewed: [...prev.flashcardsReviewed, flashcardId],
      }
      saveToStorage(STORAGE_KEY, next)
      return next
    })
  }, [])

  const addStudyTime = useCallback((minutes: number) => {
    setProgress((prev) => {
      const next: UserProgress = {
        ...prev,
        totalStudyTime: prev.totalStudyTime + minutes,
      }
      saveToStorage(STORAGE_KEY, next)
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    persist(DEFAULT_PROGRESS)
  }, [persist])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        recordAttempt,
        recordSimulado,
        markFlashcardReviewed,
        addStudyTime,
        resetProgress,
        getModuleProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
