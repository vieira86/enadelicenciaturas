# ENADE Química

Plataforma estática de revisão para o **Exame Nacional de Desempenho dos Estudantes (ENADE)** — Licenciatura em Química.

## Características

- 100% estática — funciona no GitHub Pages sem backend
- 8 módulos de conteúdo com 40 questões e 10 flashcards
- Simulado cronometrado com 10 questões aleatórias
- Progresso salvo automaticamente no LocalStorage
- Dark mode, design Apple-inspired, totalmente responsivo

## Desenvolvimento

```bash
npm install
npm run dev
```

## Deploy no GitHub Pages

```bash
npm run build
git add .
git commit -m "Atualização"
git push
npm run deploy
```

Ou manualmente:

```bash
npm run build
# Publique o conteúdo da pasta dist/ no GitHub Pages
```

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- React Router (HashRouter)
- Framer Motion
- Lucide React

## Estrutura

```
src/
  components/   # UI e layout
  context/      # Theme e Progress (LocalStorage)
  data/         # Módulos, questões e flashcards
  pages/        # Dashboard, Módulos, Quiz, Simulado, etc.
  types/        # TypeScript interfaces
  utils/        # Helpers de storage
```

## Licença

Projeto educacional — uso livre para estudo.
