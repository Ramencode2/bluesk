"use client"

import { motion } from "framer-motion"
import SearchForm from "@/components/search-form"
import { Cloud } from "lucide-react"

export default function SearchPage() {
  return (
    <main className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 text-center"
      >
        <div className="space-y-4">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 3,
            }}
            className="mx-auto"
          >
            <Cloud className="h-16 w-16 text-primary mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-extrabold tracking-tight">Skeet Sentiment Analysis</h1>
          <p className="text-muted-foreground">Enter a topic, hashtag, or keyword to analyze Bluesky sentiment</p>
        </div>
        <SearchForm />
      </motion.div>
    </main>
  )
}

