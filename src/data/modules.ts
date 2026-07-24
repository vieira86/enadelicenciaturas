import type { Module } from '../types'

export const modules: Module[] = [
  {
    id: 'quimica-geral',
    title: 'Química Geral',
    description: 'Estrutura atômica, ligações químicas, estequiometria e tabela periódica.',
    icon: 'Atom',
    color: '#0071e3',
    topics: ['Estrutura atômica', 'Ligações químicas', 'Estequiometria', 'Tabela periódica', 'Reações químicas'],
    questionIds: ['qg-1', 'qg-2', 'qg-3', 'qg-4', 'qg-5'],
  },
  {
    id: 'quimica-organica',
    title: 'Química Orgânica',
    description: 'Hidrocarbonetos, funções orgânicas, isomeria e reações orgânicas.',
    icon: 'FlaskConical',
    color: '#34c759',
    topics: ['Hidrocarbonetos', 'Funções orgânicas', 'Isomeria', 'Reações orgânicas', 'Polímeros'],
    questionIds: ['qo-1', 'qo-2', 'qo-3', 'qo-4', 'qo-5'],
  },
  {
    id: 'quimica-inorganica',
    title: 'Química Inorgânica',
    description: 'Compostos inorgânicos, ácidos, bases, sais e equilíbrio químico.',
    icon: 'Beaker',
    color: '#ff9500',
    topics: ['Ácidos e bases', 'Sais', 'Equilíbrio químico', 'Eletroquímica', 'Compostos de coordenação'],
    questionIds: ['qi-1', 'qi-2', 'qi-3', 'qi-4', 'qi-5'],
  },
  {
    id: 'fisico-quimica',
    title: 'Físico-Química',
    description: 'Termodinâmica, cinética química, eletroquímica e propriedades coligativas.',
    icon: 'Zap',
    color: '#af52de',
    topics: ['Termodinâmica', 'Cinética química', 'Eletroquímica', 'Propriedades coligativas', 'Química nuclear'],
    questionIds: ['fq-1', 'fq-2', 'fq-3', 'fq-4', 'fq-5'],
  },
  {
    id: 'quimica-analitica',
    title: 'Química Analítica',
    description: 'Análise qualitativa, quantitativa, titulações e espectroscopia.',
    icon: 'Microscope',
    color: '#ff2d55',
    topics: ['Análise qualitativa', 'Titulações', 'Espectroscopia', 'Cromatografia', 'Gravimetria'],
    questionIds: ['qa-1', 'qa-2', 'qa-3', 'qa-4', 'qa-5'],
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
