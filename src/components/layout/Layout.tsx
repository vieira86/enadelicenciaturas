import { Outlet } from 'react-router-dom'
import { Navbar, MobileNav } from './Navbar'

export function Layout() {
  return (
    <div className="min-h-screen bg-[var(--color-surface-secondary)]">
      <Navbar />
      <main className="pt-14 pb-20 md:pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <Outlet />
        </div>
      </main>
      <MobileNav />
    </div>
  )
}
