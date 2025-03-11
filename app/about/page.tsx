"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function AboutPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <main className="container mx-auto py-12 px-4 max-w-4xl">
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-8">
        <motion.div variants={item} className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">About SkyPulse</h1>
          <p className="text-xl text-muted-foreground">
            Understanding public opinion through Bluesky sentiment analysis
          </p>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <h2 className="text-2xl font-extrabold">Our Mission</h2>
          <p>
            SkyPulse was created to help businesses, researchers, and individuals understand public sentiment on
            Bluesky. By analyzing skeets about specific topics, we provide valuable insights into how people feel and
            what they're saying.
          </p>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <h2 className="text-2xl font-extrabold">How It Works</h2>
          <p>
            Our platform uses advanced natural language processing and machine learning algorithms to analyze skeets and
            classify them as positive, neutral, or negative. We then aggregate this data to provide a comprehensive view
            of public sentiment.
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>Enter a topic, hashtag, or keyword you want to analyze</li>
            <li>Our system collects relevant skeets from Bluesky</li>
            <li>Each skeet is analyzed for sentiment and assigned a score</li>
            <li>Results are presented in easy-to-understand charts and lists</li>
            <li>Download the data for your own analysis or reporting</li>
          </ol>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <h2 className="text-2xl font-extrabold">Use Cases</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Brand monitoring and reputation management</li>
            <li>Product feedback and customer satisfaction analysis</li>
            <li>Market research and competitive analysis</li>
            <li>Campaign effectiveness measurement</li>
            <li>Event impact assessment</li>
            <li>Research and academic studies</li>
          </ul>
        </motion.div>

        <motion.div variants={item} className="space-y-4">
          <h2 className="text-2xl font-extrabold">Get Started</h2>
          <p>
            Ready to discover what people are saying about your topic of interest? Try our sentiment analysis tool
            today.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="font-bold">
              <Link href="/search">
                Try It Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  )
}

