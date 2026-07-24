import { motion, AnimatePresence } from 'framer-motion'
import type { ReactNode } from 'react'

interface ModalProps {
  open: boolean
  onClose?: () => void
  children: ReactNode
  dismissible?: boolean
}

export function Modal({ open, onClose, children, dismissible = true }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={dismissible ? onClose : undefined}
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="relative w-full max-w-md rounded-[1.75rem] bg-[var(--color-surface)] card-shadow shadow-[var(--shadow-elevated)] overflow-hidden"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
