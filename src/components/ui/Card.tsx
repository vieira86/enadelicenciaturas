import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  hover?: boolean
  glass?: boolean
  padding?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

const paddings = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({
  children,
  hover = true,
  glass = false,
  padding = 'md',
  className = '',
  onClick,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -2 } : undefined}
      onClick={onClick}
      className={`rounded-2xl transition-shadow duration-300 ${glass ? 'glass' : 'bg-[var(--color-surface)]'} card-shadow ${paddings[padding]} ${className}`}
    >
      {children}
    </motion.div>
  )
}
