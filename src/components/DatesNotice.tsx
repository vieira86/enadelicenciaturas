import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, MapPin, X } from 'lucide-react'
import { Modal } from './ui/Modal'
import { Button } from './ui/Button'
import { Card } from './ui/Card'

const DATES = [
  {
    icon: CalendarDays,
    color: '#ff2d55',
    label: 'Prova do ENADE',
    value: '20 de setembro de 2026',
  },
  {
    icon: Clock,
    color: '#0071e3',
    label: 'Simulado ENADE no IFRO',
    value: '02 de setembro de 2026 às 19h',
  },
]

export function DatesNotice() {
  // Reaparece toda vez que a página inicial é carregada (sem persistir a confirmação).
  const [showModal, setShowModal] = useState(true)
  const [bannerDismissed, setBannerDismissed] = useState(false)

  const acknowledge = () => {
    setShowModal(false)
  }

  return (
    <>
      <Modal open={showModal} dismissible={false}>
        <div className="p-6 sm:p-8 text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#ff2d55]/10 flex items-center justify-center mx-auto">
            <CalendarDays size={26} className="text-[#ff2d55]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              Datas importantes
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
              Fique atento ao calendário do ENADE e do simulado preparatório.
            </p>
          </div>

          <div className="space-y-3 text-left">
            {DATES.map(({ icon: Icon, color, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--color-surface-secondary)]"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon size={16} style={{ color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 text-xs text-[var(--color-text-secondary)] leading-relaxed text-left px-1">
            <MapPin size={13} className="shrink-0 mt-0.5" />
            <span>
              O simulado do dia 02/09 será realizado presencialmente no campus IFRO Ji-Paraná.
              Confira o local exato com a coordenação do curso.
            </span>
          </div>

          <Button onClick={acknowledge} className="w-full justify-center">
            Estou ciente
          </Button>
        </div>
      </Modal>

      {!bannerDismissed && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <Card padding="sm" hover={false} className="!bg-[#ff2d55]/[0.06] border border-[#ff2d55]/15">
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <div className="w-9 h-9 rounded-xl bg-[#ff2d55]/10 flex items-center justify-center shrink-0">
                <CalendarDays size={16} className="text-[#ff2d55]" />
              </div>
              <div className="flex-1 min-w-0 flex flex-wrap items-center gap-x-5 gap-y-1">
                {DATES.map(({ label, value }) => (
                  <p key={label} className="text-xs sm:text-sm text-[var(--color-text-primary)]">
                    <span className="text-[var(--color-text-secondary)]">{label}: </span>
                    <span className="font-medium">{value}</span>
                  </p>
                ))}
              </div>
              <button
                onClick={() => setBannerDismissed(true)}
                aria-label="Fechar aviso"
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors shrink-0 cursor-pointer p-1"
              >
                <X size={15} />
              </button>
            </div>
          </Card>
        </motion.div>
      )}
    </>
  )
}
