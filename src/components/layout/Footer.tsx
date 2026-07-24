import { Link } from 'react-router-dom'

const IFRO_LOGO_URL =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Instituto_Federal_de_Rond%C3%B4nia_-_Marca_Vertical_2015.svg'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <img
            src={IFRO_LOGO_URL}
            alt="IFRO - Instituto Federal de Rondônia"
            className="h-10 w-auto shrink-0 dark:invert dark:brightness-90"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
          <div className="text-left">
            <p className="text-sm font-medium text-[var(--color-text-primary)]">
              IFRO · Campus Ji-Paraná
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Licenciatura em Química
            </p>
          </div>
        </div>

        <p className="text-xs text-[var(--color-text-secondary)] max-w-sm">
          Material de apoio independente para revisão do ENADE, sem vínculo oficial com o INEP.
        </p>

        <Link
          to="/sobre"
          className="text-sm text-[#0071e3] hover:underline font-medium"
        >
          Sobre o projeto
        </Link>
      </div>
    </footer>
  )
}
