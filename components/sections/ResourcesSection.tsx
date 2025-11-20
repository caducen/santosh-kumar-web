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
      className="relative py-24 bg-gradient-to-br from-yellow-pale/30 via-white to-yellow-light/20 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-white" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,155,0,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,225,0,0.1),transparent_50%)]" />
      
      {/* Accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Free Resources & Tools
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
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
                  ? "bg-gold text-white font-semibold"
                  : "bg-white border-2 border-gold/30 text-gray-900 hover:border-gold font-medium"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource, index) => {
            const [isHovered, setIsHovered] = useState(false)
            return (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="h-full"
              >
                <motion.div
                  className="relative h-full p-[2px] rounded-lg"
                  animate={
                    isHovered
                      ? {
                          y: -8,
                        }
                      : {
                          y: 0,
                        }
                  }
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{
                    background: isHovered
                      ? "linear-gradient(135deg, rgba(255, 155, 0, 0.2), rgba(255, 225, 0, 0.2), rgba(255, 201, 0, 0.2))"
                      : "transparent",
                  }}
                >
                  <Card className="relative h-full p-6 bg-white border-2 transition-all duration-300 overflow-hidden rounded-lg group shadow-lg hover:border-gold hover:shadow-2xl hover:shadow-gold/30">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-gold/20 text-gold flex-shrink-0 border-2 border-gold/30">
                    {getIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-gold mb-1">
                      {resource.type} • {resource.category}
                    </div>
                    <h3 className="font-heading text-xl font-bold mb-2 text-gray-900 group-hover:text-gold transition-colors">
                      {resource.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 text-sm leading-relaxed">
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
                    {/* Hover background glow */}
                    <motion.div
                      className="absolute inset-0 rounded-lg pointer-events-none opacity-0"
                      animate={
                        isHovered
                          ? {
                              opacity: 1,
                            }
                          : {
                              opacity: 0,
                            }
                      }
                      transition={{ duration: 0.3 }}
                      style={{
                        background:
                          "radial-gradient(circle at center, rgba(255, 155, 0, 0.1), transparent 70%)",
                        zIndex: -1,
                      }}
                    />
              </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Card className="p-8 bg-white border-2 border-gold/30 shadow-xl inline-block">
            <h3 className="font-heading text-2xl font-bold mb-2 text-gray-900">
              Want More Resources?
            </h3>
            <p className="text-gray-700 mb-6">
              Join our newsletter to get exclusive resources delivered to your inbox.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg">
                Subscribe to Newsletter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

