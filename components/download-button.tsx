"use client"

import { useState } from "react"
import { Download, FileText, FileType, Table } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { SentimentData } from "@/lib/types"
import { motion } from "framer-motion"

export default function DownloadButton({ data, query }: { data: SentimentData; query: string }) {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadCSV = () => {
    setIsDownloading(true)
    try {
      // Create CSV content
      const headers = ["id", "text", "username", "date", "likes", "reposts", "sentiment", "score"]
      const csvContent = [
        headers.join(","),
        ...data.skeets.map((skeet) =>
          [
            skeet.id,
            `"${skeet.text.replace(/"/g, '""')}"`, // Escape quotes in text
            skeet.username,
            skeet.date,
            skeet.likes,
            skeet.reposts,
            skeet.sentiment,
            skeet.score,
          ].join(","),
        ),
      ].join("\n")

      // Create and download the file
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", `${query}-sentiment-analysis.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading CSV:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const downloadPDF = () => {
    setIsDownloading(true)
    try {
      // In a real app, you would generate a PDF here
      // For this example, we'll just show an alert
      alert("PDF download would be implemented here with a library like jsPDF")
    } catch (error) {
      console.error("Error downloading PDF:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const downloadWord = () => {
    setIsDownloading(true)
    try {
      // In a real app, you would generate a Word document here
      // For this example, we'll just show an alert
      alert("Word download would be implemented here with a library like docx")
    } catch (error) {
      console.error("Error downloading Word document:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={isDownloading} className="font-bold">
            <Download className="mr-2 h-4 w-4" />
            Download Results
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={downloadCSV} className="cursor-pointer">
            <Table className="mr-2 h-4 w-4" />
            <span>CSV</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={downloadPDF} className="cursor-pointer">
            <FileText className="mr-2 h-4 w-4" />
            <span>PDF</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={downloadWord} className="cursor-pointer">
            <FileType className="mr-2 h-4 w-4" />
            <span>Word Document</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  )
}

