"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Download,
  FileText,
  Video,
  Book,
  ArrowRight,
  ExternalLink,
  PlayCircle,
} from "lucide-react"

interface Resource {
  title: string
  description: string
  type: "PDF" | "Video" | "Guide" | "Template"
  category: string
  downloadUrl?: string
  viewUrl?: string
}

const resources: Resource[] = [
  {
    title: "Business Growth Framework Template",
    description:
      "A comprehensive framework to identify growth opportunities and create actionable strategies.",
    type: "Template",
    category: "Strategy",
    downloadUrl: "#",
  },
  {
    title: "10 Strategies to Double Your Revenue",
    description:
      "Download our free guide with proven strategies that have helped 50+ businesses scale.",
    type: "PDF",
    category: "Guide",
    downloadUrl: "#",
  },
  {
    title: "Scaling Your Business: Video Series",
    description:
      "5-part video series covering everything from startup to scale. Watch for free.",
    type: "Video",
    category: "Education",
    viewUrl: "#",
  },
  {
    title: "Financial Planning Workbook",
    description:
      "Interactive workbook to help you plan and track your business finances effectively.",
    type: "Template",
    category: "Finance",
    downloadUrl: "#",
  },
  {
    title: "Customer Acquisition Playbook",
    description:
      "Step-by-step playbook for acquiring customers at scale without breaking the bank.",
    type: "PDF",
    category: "Marketing",
    downloadUrl: "#",
  },
  {
    title: "Leadership Development Guide",
    description:
      "Essential guide for building high-performing teams and developing leadership skills.",
    type: "Guide",
    category: "Leadership",
    downloadUrl: "#",
  },
]

const categories = ["All", "Strategy", "Marketing", "Finance", "Leadership", "Education"]

export function ResourcesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById("resources-section")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  const filteredResources =
    selectedCategory === "All"
      ? resources
      : resources.filter((r) => r.category === selectedCategory)

  const getIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="w-6 h-6" />
      case "Video":
        return <PlayCircle className="w-6 h-6" />
      case "Template":
        return <Download className="w-6 h-6" />
      default:
        return <Book className="w-6 h-6" />
    }
  }

  return (
    <section
      id="resources-section"
      className="relative py-24 bg-gradient-to-b from-background/50 to-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-white">
            Free Resources & Tools
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Access our library of free resources, templates, and guides to accelerate
            your business growth.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-background/60 border border-white/20 text-gray-200 hover:border-primary/50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
            >
              <Card className="h-full p-6 bg-background/80 backdrop-blur-xl border-white/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    {getIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-primary mb-1">
                      {resource.type} • {resource.category}
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-200 mb-6 text-sm leading-relaxed">
                  {resource.description}
                </p>

                <div className="flex items-center gap-2">
                  {resource.downloadUrl ? (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="flex-1">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Watch Now
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20 inline-block">
            <h3 className="font-heading text-2xl font-bold mb-2 text-white">
              Want More Resources?
            </h3>
            <p className="text-gray-200 mb-6">
              Join our newsletter to get exclusive resources delivered to your inbox.
            </p>
            <Button size="lg">
              Subscribe to Newsletter
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

