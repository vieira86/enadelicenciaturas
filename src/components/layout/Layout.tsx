import { Outlet } from 'react-router-dom'
import { Navbar, MobileNav } from './Navbar'
import { Footer } from './Footer'

export function Layout() {
  return (
    <div className="min-h-screen bg-[var(--color-surface-secondary)] flex flex-col">
      <Navbar />
      <main className="pt-14 pb-20 md:pb-8 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <Outlet />
        </div>
      </main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <MobileNav />
    </div>
  )
}
