import { NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  Layers,
  BarChart3,
  FlaskConical,
  Video,
  User,
} from 'lucide-react'
import { ThemeToggle } from '../ui/ThemeToggle'

const IFRO_LOGO_URL =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Instituto_Federal_de_Rond%C3%B4nia_-_Marca_Vertical_2015.svg'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Início' },
  { to: '/modulos', icon: BookOpen, label: 'Módulos' },
  { to: '/simulado', icon: ClipboardList, label: 'Simulado' },
  { to: '/flashcards', icon: Layers, label: 'Flashcards' },
  { to: '/videos', icon: Video, label: 'Vídeos' },
  { to: '/progresso', icon: BarChart3, label: 'Progresso' },
  { to: '/sobre', icon: User, label: 'Sobre' },
]

export function Navbar() {
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--color-border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#0071e3] flex items-center justify-center shadow-sm">
            <FlaskConical size={16} className="text-white" />
          </div>
          <span className="font-semibold text-[var(--color-text-primary)] text-sm tracking-tight hidden sm:block">
            ENADE Química
          </span>
          <span className="hidden lg:block w-px h-5 bg-[var(--color-border)] mx-1" />
          <img
            src={IFRO_LOGO_URL}
            alt="IFRO"
            className="hidden lg:block h-6 w-auto opacity-80 dark:invert dark:brightness-90"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </NavLink>

        <nav className="hidden md:flex items-center gap-0.5">
          {navItems.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
            return (
              <NavLink key={to} to={to} className="relative px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors">
                {active && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative flex items-center gap-1.5 ${active ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}>
                  <Icon size={15} />
                  <span className="hidden xl:inline">{label}</span>
                </span>
              </NavLink>
            )
          })}
        </nav>

        <ThemeToggle />
      </div>
    </header>
  )
}

export function MobileNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass border-t border-[var(--color-border)]">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
          return (
            <NavLink
              key={to}
              to={to}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${active ? 'text-[#0071e3]' : 'text-[var(--color-text-secondary)]'}`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}
