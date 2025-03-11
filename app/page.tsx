"use client"

import Link from "next/link"
import { ArrowRight, BarChart2, Download, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="flex flex-col">
      {/* Hero section */}
      <section className="w-full py-12 md:py-24 lg:py-32 sentiment-gradient relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/10 animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-white/10 animate-float-delay-1"></div>
          <div className="absolute bottom-20 left-1/3 w-24 h-24 rounded-full bg-white/10 animate-float-delay-2"></div>
        </div>
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Bluesky Sentiment Analysis
              </h1>
              <p className="mx-auto max-w-[700px] text-white md:text-xl font-medium">
                Discover how people feel about any topic on Bluesky with our powerful sentiment analysis tool
              </p>
            </div>
            <motion.div className="space-x-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold">
                <Link href="/search">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tighter md:text-4xl">How It Works</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our platform analyzes skeets to understand public sentiment on any topic
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-12"
          >
            <motion.div variants={item}>
              <Card className="card-hover border-2">
                <CardHeader>
                  <MessageCircle className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="font-extrabold">Collect Skeets</CardTitle>
                  <CardDescription>We gather relevant skeets about your topic of interest</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="card-hover border-2">
                <CardHeader>
                  <BarChart2 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="font-extrabold">Analyze Sentiment</CardTitle>
                  <CardDescription>Our AI classifies skeets as positive, neutral, or negative</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card className="card-hover border-2">
                <CardHeader>
                  <Download className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="font-extrabold">Export Results</CardTitle>
                  <CardDescription>Download your analysis in various formats for further use</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-extrabold tracking-tighter md:text-4xl">Ready to Analyze?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Start analyzing Bluesky sentiment on any topic in seconds
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" className="font-bold">
                <Link href="/search">
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

