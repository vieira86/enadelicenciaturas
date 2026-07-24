import { motion } from 'framer-motion'

interface ProgressBarProps {
  value: number
  max?: number
  color?: string
  size?: 'sm' | 'md'
  showLabel?: boolean
}

export function ProgressBar({
  value,
  max = 100,
  color = '#0071e3',
  size = 'md',
  showLabel = false,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100))

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1.5">
          <span className="text-xs text-[var(--color-text-secondary)]">Progresso</span>
          <span className="text-xs font-medium text-[var(--color-text-primary)]">{pct}%</span>
        </div>
      )}
      <div
        className={`w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden ${size === 'sm' ? 'h-1.5' : 'h-2.5'}`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}
