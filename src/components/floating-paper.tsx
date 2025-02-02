"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { FileText, Book, Laptop, Code, Lightbulb, GraduationCap } from "lucide-react"

export function FloatingPaper({ count = 6 }) {
  const icons = [
    { icon: FileText, color: "text-purple-400/50" },
    { icon: Book, color: "text-blue-400/50" },
    { icon: Laptop, color: "text-green-400/50" },
    { icon: Code, color: "text-pink-400/50" },
    { icon: Lightbulb, color: "text-yellow-400/50" },
    { icon: GraduationCap, color: "text-orange-400/50" }
  ]

  const [papers, setPapers] = useState<{ x: number; y: number; iconIndex: number }[]>([])

  useEffect(() => {
    // Generate positions only on the client side
    const newPapers = Array.from({ length: count }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      iconIndex: Math.floor(Math.random() * icons.length)
    }))
    setPapers(newPapers)
  }, [count])

  if (papers.length === 0) return null // Don't render anything during SSR

  return (
    <div className="relative w-full h-full">
      {papers.map((paper, index) => {
        const IconComponent = icons[paper.iconIndex].icon
        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{ x: paper.x, y: paper.y }}
            animate={{
              x: [paper.x, paper.x + 100, paper.x],
              y: [paper.y, paper.y + 100, paper.y],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <div className="relative w-16 h-20 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center transform hover:scale-110 transition-transform">
              <IconComponent className={`w-8 h-8 ${icons[paper.iconIndex].color}`} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

