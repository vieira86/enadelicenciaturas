import type { Module } from '../types'

export const modules: Module[] = [
  {
    id: 'quimica-geral',
    title: 'Química Geral',
    description: 'Estrutura atômica, ligações químicas, estequiometria e tabela periódica.',
    icon: 'Atom',
    color: '#0071e3',
    topics: ['Estrutura atômica', 'Ligações químicas', 'Estequiometria', 'Tabela periódica', 'Reações químicas'],
    questionIds: ["euq1-01", "euq1-03", "euq1-08", "euq1-14", "euq1-19", "euq1-35", "euq2-01", "euq2-03", "euq2-16", "euq2-20", "euq2-33", "euq2-44"],
  },
  {
    id: 'quimica-organica',
    title: 'Química Orgânica',
    description: 'Hidrocarbonetos, funções orgânicas, isomeria e reações orgânicas.',
    icon: 'FlaskConical',
    color: '#34c759',
    topics: ['Hidrocarbonetos', 'Funções orgânicas', 'Isomeria', 'Reações orgânicas', 'Bioquímica'],
    questionIds: ["euq1-09", "euq1-10", "euq1-11", "euq1-12", "euq1-18", "euq1-25", "euq1-26", "euq1-27", "euq1-31", "euq1-32", "euq1-39", "euq1-41", "euq1-45", "euq2-09", "euq2-11", "euq2-12", "euq2-17", "euq2-18", "euq2-25", "euq2-26", "euq2-27", "euq2-31", "euq2-32", "euq2-39", "euq2-41", "euq2-45"],
  },
  {
    id: 'quimica-inorganica',
    title: 'Química Inorgânica',
    description: 'Compostos inorgânicos, ácidos, bases, sais e equilíbrio químico.',
    icon: 'Beaker',
    color: '#ff9500',
    topics: ['Ácidos e bases', 'Sais', 'Equilíbrio químico', 'Eletroquímica', 'Compostos de coordenação'],
    questionIds: ["euq1-02", "euq1-04", "euq1-05", "euq1-07", "euq1-20", "euq1-21", "euq1-33", "euq1-34", "euq2-02", "euq2-04", "euq2-19", "euq2-21", "euq2-23", "euq2-34"],
  },
  {
    id: 'fisico-quimica',
    title: 'Físico-Química',
    description: 'Termodinâmica, cinética química, eletroquímica e propriedades coligativas.',
    icon: 'Zap',
    color: '#af52de',
    topics: ['Termodinâmica', 'Cinética química', 'Eletroquímica', 'Propriedades coligativas', 'Química nuclear'],
    questionIds: ["euq1-13", "euq1-15", "euq1-16", "euq1-28", "euq1-29", "euq1-30", "euq1-43", "euq1-44", "euq2-14", "euq2-15", "euq2-24", "euq2-28", "euq2-29", "euq2-30", "euq2-35", "euq2-37", "euq2-42", "euq2-43"],
  },
  {
    id: 'quimica-analitica',
    title: 'Química Analítica',
    description: 'Análise qualitativa, quantitativa, titulações e espectroscopia.',
    icon: 'Microscope',
    color: '#ff2d55',
    topics: ['Análise qualitativa', 'Titulações', 'Espectroscopia', 'Cromatografia', 'Gravimetria'],
    questionIds: ["euq1-06", "euq1-17", "euq1-22", "euq1-23", "euq1-24", "euq1-36", "euq1-37", "euq1-38", "euq1-40", "euq2-05", "euq2-06", "euq2-07", "euq2-08", "euq2-13", "euq2-22", "euq2-36", "euq2-38"],
  },
  {
    id: 'didatica-quimica',
    title: 'Didática de Química',
    description: 'Metodologias de ensino, experimentação e formação de conceitos científicos.',
    icon: 'GraduationCap',
    color: '#5856d6',
    topics: ['Metodologias ativas', 'Experimentação', 'Concepções alternativas', 'Avaliação', 'Tecnologias educacionais'],
    questionIds: ['dq-1', 'dq-2', 'dq-3', 'dq-4', 'dq-5'],
  },
  {
    id: 'metodologia-cientifica',
    title: 'Metodologia Científica',
    description: 'Método científico, pesquisa em educação e análise de dados.',
    icon: 'Search',
    color: '#00c7be',
    topics: ['Método científico', 'Pesquisa em educação', 'Análise de dados', 'Ética na pesquisa', 'Revisão bibliográfica'],
    questionIds: ['mc-1', 'mc-2', 'mc-3', 'mc-4', 'mc-5'],
  },
  {
    id: 'legislacao-educacional',
    title: 'Legislação Educacional',
    description: 'BNCC, LDB, diretrizes curriculares e políticas públicas de educação.',
    icon: 'Scale',
    color: '#86868b',
    topics: ['BNCC', 'LDB', 'Diretrizes curriculares', 'Políticas públicas', 'Formação docente'],
    questionIds: ['le-1', 'le-2', 'le-3', 'le-4', 'le-5'],
  },
]

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id)
}

export function getTotalQuestions(): number {
  return modules.reduce((acc, m) => acc + m.questionIds.length, 0)
}
