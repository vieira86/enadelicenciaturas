import { motion } from 'framer-motion'
import { Video } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { modules } from '../data/modules'
import { getVideosByModule } from '../data/videos'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function Videos() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)]">Vídeos</h1>
        <p className="text-[var(--color-text-secondary)] mt-2">
          Uma seleção de aulas em vídeo, organizadas por módulo, para complementar os estudos.
        </p>
      </motion.div>

      {modules.map((mod) => {
        const vids = getVideosByModule(mod.id)
        if (vids.length === 0) return null
        return (
          <motion.div key={mod.id} variants={item} className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: mod.color }} />
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{mod.title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {vids.map((v) => (
                <a
                  key={v.id}
                  href={`https://www.youtube.com/watch?v=${v.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Card className="h-full">
                    <div className="rounded-lg overflow-hidden mb-3 bg-black/5">
                      <img
                        src={`https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg`}
                        alt={v.title}
                        className="w-full aspect-video object-cover"
                        loading="lazy"
                      />
                    </div>
                    <Badge color={mod.color} variant="outline">{v.topic}</Badge>
                    <p className="text-sm font-medium text-[var(--color-text-primary)] mt-2 line-clamp-2">
                      {v.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">
                      {v.description}
                    </p>
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-[var(--color-text-secondary)]">
                      <Video size={13} className="text-[#ff0000]" />
                      {v.channel}
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
