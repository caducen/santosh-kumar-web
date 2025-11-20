"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Award, ExternalLink } from "lucide-react"

const mediaMentions = [
  {
    name: "Forbes",
    logo: "Forbes",
    description: "Forbes Council Member",
    link: "#",
  },
  {
    name: "Business Insider",
    logo: "BI",
    description: "Featured Expert",
    link: "#",
  },
  {
    name: "Entrepreneur",
    logo: "ENT",
    description: "Business Strategy Contributor",
    link: "#",
  },
  {
    name: "Inc. Magazine",
    logo: "INC",
    description: "Scaling Expert",
    link: "#",
  },
]

export function MediaMentions() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById("media-mentions")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section
      id="media-mentions"
      className="relative py-24 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Award className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">As Featured In</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-white">
            Trusted by Leading Media
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Recognized expertise featured across top business publications
          </p>
        </motion.div>

        {/* Media Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mediaMentions.map((media, index) => (
            <motion.div
              key={media.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 text-center bg-background/80 backdrop-blur-xl border-white/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl group cursor-pointer shadow-lg">
                <div className="mb-4">
                  <div className="text-3xl font-heading font-bold text-primary mb-2">
                    {media.logo}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{media.name}</h3>
                  <p className="text-sm text-gray-200">{media.description}</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-medium">View</span>
                  <ExternalLink className="w-4 h-4" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

