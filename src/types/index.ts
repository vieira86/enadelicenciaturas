export interface Module {
  id: string
  title: string
  description: string
  icon: string
  color: string
  topics: string[]
  questionIds: string[]
}

export interface Question {
  id: string
  moduleId: string
  text: string
  options: string[]
  correctIndex: number
  explanation: string
  difficulty: 'easy' | 'medium' | 'hard'
  year?: number
  /** Origem da questão (ex.: "Exame Unificado de Química (EUQ) 2025/2") quando não for uma questão de demonstração. */
  source?: string
  /** Caminho (relativo a /public) de uma imagem de apoio, ex.: estrutura química, quando o enunciado depende de uma figura. */
  imageUrl?: string
}

export interface VideoResource {
  id: string
  moduleId: string
  topic: string
  title: string
  channel: string
  youtubeId: string
  description: string
}

export interface Flashcard {
  id: string
  moduleId: string
  front: string
  back: string
}

export interface QuestionAttempt {
  questionId: string
  selectedIndex: number
  correct: boolean
  timestamp: number
}

export interface ModuleProgress {
  moduleId: string
  completedQuestions: string[]
  correctCount: number
  totalAttempts: number
  lastStudied: number
}

export interface SimuladoResult {
  id: string
  date: number
  score: number
  total: number
  duration: number
  answers: QuestionAttempt[]
}

export interface UserProgress {
  modules: Record<string, ModuleProgress>
  simulados: SimuladoResult[]
  flashcardsReviewed: string[]
  streak: number
  lastVisit: number
  totalStudyTime: number
}

export const DEFAULT_PROGRESS: UserProgress = {
  modules: {},
  simulados: [],
  flashcardsReviewed: [],
  streak: 0,
  lastVisit: Date.now(),
  totalStudyTime: 0,
}
