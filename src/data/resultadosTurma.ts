/**
 * Resultados de um simulado ENADE aplicado à turma.
 *
 * Os dados são anonimizados (código "Aluno N" em vez do nome do estudante)
 * porque esta página fica publicada num site público. A ordem dos códigos
 * segue a ordem original da planilha de aplicação, não o desempenho — ou
 * seja, "Aluno 1" não é necessariamente o melhor colocado.
 *
 * Pedagógica e Química são o número de acertos em cada parte da prova;
 * Nota é a pontuação final em 0–100.
 */

export interface ResultadoAluno {
  id: string
  pedagogica: number
  quimica: number
  nota: number
}

export const resultadosTurma: ResultadoAluno[] = [
  { id: 'Aluno 1', pedagogica: 13, quimica: 20, nota: 80.49 },
  { id: 'Aluno 2', pedagogica: 14, quimica: 18, nota: 78.05 },
  { id: 'Aluno 3', pedagogica: 12, quimica: 18, nota: 73.17 },
  { id: 'Aluno 4', pedagogica: 12, quimica: 17, nota: 70.73 },
  { id: 'Aluno 5', pedagogica: 8, quimica: 18, nota: 63.41 },
  { id: 'Aluno 6', pedagogica: 10, quimica: 14, nota: 58.54 },
  { id: 'Aluno 7', pedagogica: 12, quimica: 11, nota: 56.1 },
  { id: 'Aluno 8', pedagogica: 10, quimica: 13, nota: 56.1 },
  { id: 'Aluno 9', pedagogica: 8, quimica: 15, nota: 56.1 },
  { id: 'Aluno 10', pedagogica: 5, quimica: 16, nota: 51.22 },
  { id: 'Aluno 11', pedagogica: 7, quimica: 14, nota: 51.22 },
  { id: 'Aluno 12', pedagogica: 7, quimica: 13, nota: 48.78 },
  { id: 'Aluno 13', pedagogica: 10, quimica: 9, nota: 46.34 },
]

function media(valores: number[]): number {
  return valores.reduce((soma, v) => soma + v, 0) / valores.length
}

function mediana(valores: number[]): number {
  const ordenado = [...valores].sort((a, b) => a - b)
  const meio = Math.floor(ordenado.length / 2)
  return ordenado.length % 2 !== 0 ? ordenado[meio] : (ordenado[meio - 1] + ordenado[meio]) / 2
}

function desvioPadrao(valores: number[]): number {
  const m = media(valores)
  const variancia = valores.reduce((acc, v) => acc + (v - m) ** 2, 0) / (valores.length - 1)
  return Math.sqrt(variancia)
}

const notas = resultadosTurma.map((a) => a.nota)
const pedagogicas = resultadosTurma.map((a) => a.pedagogica)
const quimicas = resultadosTurma.map((a) => a.quimica)
const mediaNota = media(notas)

export const estatisticasTurma = {
  totalAlunos: resultadosTurma.length,
  media: mediaNota,
  mediana: mediana(notas),
  desvioPadrao: desvioPadrao(notas),
  maior: Math.max(...notas),
  menor: Math.min(...notas),
  acimaDaMedia: resultadosTurma.filter((a) => a.nota >= mediaNota).length,
  mediaPedagogica: media(pedagogicas),
  maiorPedagogica: Math.max(...pedagogicas),
  mediaQuimica: media(quimicas),
  maiorQuimica: Math.max(...quimicas),
}
