"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { TrendingUp, ArrowRight } from "lucide-react"

interface CaseStudy {
  company: string
  industry: string
  before: {
    revenue: string
    employees: string
    challenges: string[]
  }
  after: {
    revenue: string
    employees: string
    results: string[]
  }
  timeline: string
}

const caseStudies: CaseStudy[] = [
  {
    company: "Tech Startup Inc.",
    industry: "SaaS",
    before: {
      revenue: "$500K",
      employees: "8",
      challenges: ["Struggling to scale", "Low conversion rates", "Team alignment issues"],
    },
    after: {
      revenue: "$3.2M",
      employees: "25",
      results: ["300% revenue growth", "Improved conversion by 45%", "Streamlined operations"],
    },
    timeline: "12 months",
  },
  {
    company: "Growth Labs",
    industry: "E-commerce",
    before: {
      revenue: "$1.2M",
      employees: "15",
      challenges: ["Plateaued growth", "Inefficient processes", "High customer churn"],
    },
    after: {
      revenue: "$5.8M",
      employees: "42",
      results: ["380% revenue increase", "Reduced churn by 60%", "Automated workflows"],
    },
    timeline: "10 months",
  },
]

export function BeforeAfter() {
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

    const element = document.getElementById("before-after")
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
      id="before-after"
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
            <TrendingUp className="w-5 h-5 text-gold" />
            <span className="text-sm font-semibold text-gold">Proven Results</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Real Results, Real Impact
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            See how businesses transform with strategic execution
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => {
            const [isHovered, setIsHovered] = useState(false)
            return (
              <motion.div
                key={study.company}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
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
                  <Card className="relative h-full p-8 bg-white border-2 transition-all duration-300 overflow-hidden rounded-lg shadow-lg hover:border-gold hover:shadow-2xl hover:shadow-gold/30">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold mb-2 text-gray-900">{study.company}</h3>
                  <p className="text-sm text-gray-700 font-medium">{study.industry} • {study.timeline}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Before */}
                  <div>
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-3">
                      Before
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-red-600 mb-1">
                          {study.before.revenue}
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Annual Revenue</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900 mb-1">
                          {study.before.employees} Employees
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {study.before.challenges.map((challenge, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-red-600 mt-1 font-bold">•</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* After */}
                  <div>
                    <div className="text-xs font-semibold text-gold uppercase tracking-wide mb-3 flex items-center gap-2">
                      After
                      <ArrowRight className="w-3 h-3" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-gold mb-1">
                          {study.after.revenue}
                        </div>
                        <div className="text-xs text-gray-600 font-medium">Annual Revenue</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900 mb-1">
                          {study.after.employees} Employees
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {study.after.results.map((result, i) => (
                          <li key={i} className="text-sm text-gray-900 flex items-start gap-2 font-medium">
                            <span className="text-gold mt-1 font-bold">✓</span>
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Growth Indicator */}
                <div className="pt-6 border-t border-gold/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-600 font-medium">Growth</div>
                      <div className="text-2xl font-bold text-gold">
                        {Math.round(
                          ((parseFloat(study.after.revenue.replace(/[^0-9.]/g, "")) -
                            parseFloat(study.before.revenue.replace(/[^0-9.]/g, ""))) /
                            parseFloat(study.before.revenue.replace(/[^0-9.]/g, ""))) *
                            100
                        )}
                        %
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-gold" />
                  </div>
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

