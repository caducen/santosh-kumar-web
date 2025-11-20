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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border-2 border-gold rounded-full mb-4">
            <Award className="w-5 h-5 text-gold" />
            <span className="text-sm font-semibold text-gold">As Featured In</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Trusted by Leading Media
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Recognized expertise featured across top business publications
          </p>
        </motion.div>

        {/* Media Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mediaMentions.map((media, index) => {
            const [isHovered, setIsHovered] = useState(false)
            return (
              <motion.div
                key={media.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                  <Card className="relative h-full p-8 text-center bg-white border-2 transition-all duration-300 overflow-hidden rounded-lg group cursor-pointer shadow-lg hover:border-gold hover:shadow-2xl hover:shadow-gold/30">
                    <div className="mb-4">
                      <div className="text-3xl font-heading font-bold text-gold mb-2">
                        {media.logo}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{media.name}</h3>
                      <p className="text-sm text-gray-700">{media.description}</p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gold opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      <span className="text-sm">View</span>
                      <ExternalLink className="w-4 h-4" />
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
      </div>
    </section>
  )
}

