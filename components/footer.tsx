"use client"

import Link from "next/link"
import { Cloud, Mail, Github } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full border-t bg-background py-6"
    >
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          <span className="font-extrabold">SkyPulse</span>
          <span className="text-sm text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
        <p className="text-sm text-muted-foreground text-center md:text-left">
          Analyze Bluesky sentiment to understand public opinion on any topic
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="mailto:contact@skypulse.example.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
          <Link href="https://bsky.app" className="text-muted-foreground hover:text-foreground transition-colors">
            <Cloud className="h-5 w-5" />
            <span className="sr-only">Bluesky</span>
          </Link>
          <Link
            href="https://github.com/skypulse"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
        </div>
      </div>
    </motion.footer>
  )
}

