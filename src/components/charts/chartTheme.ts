/**
 * Paleta e especificações dos gráficos de "Resultados da Turma".
 *
 * As cores de dado (Química / Pedagógica / destaque) são hexadecimais fixos
 * validados para contraste e distinção sob daltonismo (protanopia/deuteranopia)
 * em fundo claro e escuro — não trocar sem revalidar. Texto, eixos e grades
 * usam os tokens de cor do site (var(--color-...)) para acompanhar o tema.
 */

export const CHART_COLOR = {
  quimica: '#0071e3',
  pedagogica: '#1f8a3d',
  destaque: '#0071e3',
  neutro: '#8e8e93',
} as const

export const MARK = {
  barThickness: 22,
  barRadius: 4,
  lineWidth: 2,
  markerRadius: 6,
  markerRing: 2,
}
