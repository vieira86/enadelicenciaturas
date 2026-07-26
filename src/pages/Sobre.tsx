import { motion } from 'framer-motion'
import { Globe, GraduationCap, FlaskConical, Mail } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'

function GithubMark({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.69.08-.69 1.16.08 1.77 1.19 1.77 1.19 1.02 1.76 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18.92-.26 1.91-.39 2.89-.39.98 0 1.97.13 2.89.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
    </svg>
  )
}

const IFRO_LOGO_URL =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Instituto_Federal_de_Rond%C3%B4nia_-_Marca_Vertical_2015.svg'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Sobre() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10 max-w-3xl mx-auto">
      <motion.div variants={item} className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--color-text-primary)]">
          Sobre o projeto
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Quem está por trás desta plataforma de revisão.
        </p>
      </motion.div>

      <motion.div variants={item}>
        <Card padding="lg" className="text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src={`${import.meta.env.BASE_URL}images/team/rafael.jpg`}
              alt="Prof. Dr. Rafael Vieira"
              className="w-32 h-32 rounded-full object-cover shrink-0 ring-4 ring-[var(--color-surface-secondary)] shadow-md"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.nextElementSibling as HTMLElement | null
                if (fallback) fallback.style.display = 'flex'
              }}
            />
            <div
              className="w-32 h-32 rounded-full shrink-0 items-center justify-center text-3xl font-bold text-white shadow-md hidden"
              style={{ background: 'linear-gradient(135deg, #0071e3, #34c759)' }}
            >
              RV
            </div>

            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Prof. Dr. Rafael Vieira
              </h2>
              <p className="text-[var(--color-text-secondary)] mt-1">
                Professor de Química · Química Orgânica · Química Computacional
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                <Badge color="#0071e3" variant="outline">Docente IFRO</Badge>
                <Badge color="#34c759" variant="outline">Química</Badge>
                <Badge color="#af52de" variant="outline">Química Computacional</Badge>
              </div>

              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mt-5">
                Presidente da Comissão Enade da Lic. em Química, Campus de Ji-Paraná, responsável pela criação e curadoria de conteúdo desta plataforma de revisão
                para o ENADE, desenvolvida para apoiar estudantes da Licenciatura em Química
                do IFRO — Campus Ji-Paraná na preparação para o exame, reunindo questões
                comentadas, flashcards, simulados e vídeos selecionados por tema.
              </p>

              <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-6">
                <a
                  href="https://github.com/vieira86"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full glass text-[var(--color-text-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <GithubMark size={15} /> GitHub
                </a>
                <a
                  href="https://www.rafaelvieira.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full glass text-[var(--color-text-primary)] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <Globe size={15} /> Site pessoal
                </a>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div variants={item} className="grid sm:grid-cols-2 gap-4">
        <Card padding="md">
          <div className="w-10 h-10 rounded-xl bg-[#0071e3]/10 flex items-center justify-center mb-3">
            <GraduationCap size={19} className="text-[#0071e3]" />
          </div>
          <h3 className="font-semibold text-[var(--color-text-primary)] text-sm mb-1">Instituição</h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            Instituto Federal de Educação, Ciência e Tecnologia de Rondônia (IFRO),
            Campus Ji-Paraná — curso de Licenciatura em Química.
          </p>
        </Card>
        <Card padding="md">
          <div className="w-10 h-10 rounded-xl bg-[#34c759]/10 flex items-center justify-center mb-3">
            <FlaskConical size={19} className="text-[#34c759]" />
          </div>
          <h3 className="font-semibold text-[var(--color-text-primary)] text-sm mb-1">Sobre o material</h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
            As questões desta plataforma têm como base o Exame Nacional de Desempenho dos Estudantes (ENADE) e foram selecionadas, comentadas e re
            reescritas com explicações próprias para fins de estudo.
          </p>
        </Card>
      </motion.div>

      <motion.div variants={item} className="text-center">
        <a
          href="https://www.rafaelvieira.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <Mail size={14} /> Dúvidas ou sugestões sobre o conteúdo? Entre em contato pelo site pessoal.
        </a>
      </motion.div>

      <motion.div variants={item} className="flex items-center justify-center gap-3 pt-4 opacity-80">
        <img
          src={IFRO_LOGO_URL}
          alt="IFRO"
          className="h-12 w-auto dark:invert dark:brightness-90"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </motion.div>
    </motion.div>
  )
}
