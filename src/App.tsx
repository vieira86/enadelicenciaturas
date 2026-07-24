import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ProgressProvider } from './context/ProgressContext'
import { Layout } from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Modules from './pages/Modules'
import ModuleDetail from './pages/ModuleDetail'
import Quiz from './pages/Quiz'
import Simulado from './pages/Simulado'
import FlashcardsPage from './pages/Flashcards'
import ProgressPage from './pages/Progress'
import Videos from './pages/Videos'
import Sobre from './pages/Sobre'

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="modulos" element={<Modules />} />
              <Route path="modulos/:moduleId" element={<ModuleDetail />} />
              <Route path="quiz/:moduleId" element={<Quiz />} />
              <Route path="simulado" element={<Simulado />} />
              <Route path="flashcards" element={<FlashcardsPage />} />
              <Route path="videos" element={<Videos />} />
              <Route path="progresso" element={<ProgressPage />} />
              <Route path="sobre" element={<Sobre />} />
            </Route>
          </Routes>
        </HashRouter>
      </ProgressProvider>
    </ThemeProvider>
  )
}
