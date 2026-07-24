import type { VideoResource } from '../types'

// Vídeos reais do YouTube, selecionados por tema para complementar o estudo de cada módulo.
export const videos: VideoResource[] = [
  // Química Geral
  {
    id: 'v-qg-1',
    moduleId: 'quimica-geral',
    topic: 'Estrutura atômica',
    title: 'Curso Química Geral - Estrutura Atômica #1: O Átomo',
    channel: 'YouTube',
    youtubeId: '-e3GNeonXyU',
    description: 'Introdução ao modelo atômico: prótons, nêutrons, elétrons e número atômico.',
  },
  {
    id: 'v-qg-2',
    moduleId: 'quimica-geral',
    topic: 'Ligações químicas',
    title: 'Resumo Ligações Químicas: tudo o que você precisa saber',
    channel: 'YouTube',
    youtubeId: 'S6FtsrxYRPw',
    description: 'Panorama das ligações iônica, covalente e metálica, com exemplos e comparações.',
  },
  {
    id: 'v-qg-3',
    moduleId: 'quimica-geral',
    topic: 'Estequiometria',
    title: 'Estequiometria: o que cai no vestibular?',
    channel: 'Descomplica',
    youtubeId: 'VV6_UuhbSxU',
    description: 'Cálculo estequiométrico explicado com foco nos tipos de questão mais cobrados.',
  },

  // Química Orgânica
  {
    id: 'v-qo-1',
    moduleId: 'quimica-organica',
    topic: 'Hidrocarbonetos',
    title: 'Introdução à nomenclatura dos compostos orgânicos: os hidrocarbonetos',
    channel: 'YouTube',
    youtubeId: 'Y_mykSYj6vc',
    description: 'Nomenclatura IUPAC de alcanos, alcenos, alcinos e hidrocarbonetos aromáticos.',
  },
  {
    id: 'v-qo-2',
    moduleId: 'quimica-organica',
    topic: 'Isomeria',
    title: 'Isomeria funcional, de posição e de cadeia: tipos e exemplos',
    channel: 'Química Enem com a Larissa',
    youtubeId: 'QkzryBwB1lo',
    description: 'Diferenças entre os principais tipos de isomeria plana, com exemplos resolvidos.',
  },
  {
    id: 'v-qo-3',
    moduleId: 'quimica-organica',
    topic: 'Funções orgânicas',
    title: 'Funções orgânicas e isomeria — Super Revisão',
    channel: 'YouTube',
    youtubeId: 'z0j8g2m-aSk',
    description: 'Revisão das principais funções orgânicas (álcoois, ácidos, aminas etc.) e sua identificação.',
  },

  // Química Inorgânica
  {
    id: 'v-qi-1',
    moduleId: 'quimica-inorganica',
    topic: 'Eletroquímica',
    title: 'Eletroquímica - Pilhas: eletrodos (ânodo e cátodo), ddp e equação global',
    channel: 'Química ENEM',
    youtubeId: '84g7-ATbv2A',
    description: 'Funcionamento de pilhas galvânicas, cálculo da diferença de potencial e equação global.',
  },
  {
    id: 'v-qi-2',
    moduleId: 'quimica-inorganica',
    topic: 'Compostos de coordenação',
    title: 'Compostos de coordenação: aspectos introdutórios',
    channel: 'YouTube',
    youtubeId: 'gipk7-wMAQs',
    description: 'Conceitos básicos de química de coordenação: ligantes, número de coordenação e nomenclatura.',
  },

  // Físico-Química
  {
    id: 'v-fq-1',
    moduleId: 'fisico-quimica',
    topic: 'Termodinâmica',
    title: 'Introdução à Termodinâmica e conceitos básicos',
    channel: 'Me Salva!',
    youtubeId: '1OVibKnrHoA',
    description: 'Conceitos fundamentais de termodinâmica química: sistema, energia interna e leis da termodinâmica.',
  },
  {
    id: 'v-fq-2',
    moduleId: 'fisico-quimica',
    topic: 'Cinética química',
    title: 'Cinética química: o que é e principais conceitos',
    channel: 'Stoodi',
    youtubeId: 'gjR4WbrOjq4',
    description: 'Velocidade de reação, fatores que a influenciam e lei de velocidade.',
  },
  {
    id: 'v-fq-3',
    moduleId: 'fisico-quimica',
    topic: 'Propriedades coligativas',
    title: 'Propriedades coligativas das soluções — curso completo',
    channel: 'YouTube',
    youtubeId: 'U3lS66qTSqM',
    description: 'Tonoscopia, ebulioscopia, crioscopia e osmometria explicadas com exemplos.',
  },

  // Química Analítica
  {
    id: 'v-qa-1',
    moduleId: 'quimica-analitica',
    topic: 'Titulações',
    title: 'Curvas de titulação e indicadores ácido-base',
    channel: 'Khan Academy Brasil',
    youtubeId: 'C0F4oBBybV0',
    description: 'Como interpretar curvas de titulação e escolher o indicador ácido-base adequado.',
  },
  {
    id: 'v-qa-2',
    moduleId: 'quimica-analitica',
    topic: 'Cromatografia',
    title: 'Análise Instrumental — Introdução à cromatografia',
    channel: 'Univesp',
    youtubeId: '5HX901YGNNg',
    description: 'Fundamentos das técnicas cromatográficas de separação e identificação de substâncias.',
  },
  {
    id: 'v-qa-3',
    moduleId: 'quimica-analitica',
    topic: 'Gravimetria',
    title: 'Química Analítica — Métodos gravimétricos de análise',
    channel: 'Univesp',
    youtubeId: '4Jqa1fagJRo',
    description: 'Princípios da análise gravimétrica: precipitação, filtração e determinação de massa.',
  },

  // Didática de Química
  {
    id: 'v-dq-1',
    moduleId: 'didatica-quimica',
    topic: 'Metodologias ativas',
    title: 'Metodologias ativas: rotação por estações no ensino de Química',
    channel: 'YouTube',
    youtubeId: 'oRzNcO3U_ec',
    description: 'Exemplo prático de metodologia ativa aplicada a uma aula de Química.',
  },
  {
    id: 'v-dq-2',
    moduleId: 'didatica-quimica',
    topic: 'Ensino por investigação',
    title: 'Ensino de Ciências por Investigação — condições para implementação em sala de aula',
    channel: 'YouTube',
    youtubeId: 'ftfqKMD2D_c',
    description: 'A pesquisadora Anna Maria Pessoa de Carvalho discute o ensino por investigação em Ciências.',
  },

  // Metodologia Científica
  {
    id: 'v-mc-1',
    moduleId: 'metodologia-cientifica',
    topic: 'Pesquisa em educação',
    title: 'Pesquisa qualitativa x pesquisa quantitativa',
    channel: 'YouTube',
    youtubeId: 'NnlEvHdTx0s',
    description: 'Diferenças entre abordagens qualitativas e quantitativas na pesquisa científica.',
  },
  {
    id: 'v-mc-2',
    moduleId: 'metodologia-cientifica',
    topic: 'Método científico',
    title: 'Tipos de pesquisa científica: qualitativa, quantitativa, exploratória e mais',
    channel: 'YouTube',
    youtubeId: 'Q3Z9kt5_gjg',
    description: 'Panorama dos principais tipos e classificações da pesquisa científica.',
  },

  // Legislação Educacional
  {
    id: 'v-le-1',
    moduleId: 'legislacao-educacional',
    topic: 'LDB',
    title: 'LDB atualizada — Lei de Diretrizes e Bases da Educação Nacional nº 9.394/1996',
    channel: 'YouTube',
    youtubeId: 'izUFTsP4yGU',
    description: 'Leitura comentada dos principais pontos da LDB, lei que estrutura a educação no Brasil.',
  },
  {
    id: 'v-le-2',
    moduleId: 'legislacao-educacional',
    topic: 'BNCC',
    title: 'Qual o lugar da BNCC dentro da legislação educacional?',
    channel: 'YouTube',
    youtubeId: 'L_-LfLeWSQg',
    description: 'Como a Base Nacional Comum Curricular se relaciona com a LDB e demais normas educacionais.',
  },
]

export function getVideosByModule(moduleId: string): VideoResource[] {
  return videos.filter((v) => v.moduleId === moduleId)
}
