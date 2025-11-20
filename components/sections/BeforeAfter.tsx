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
      className="relative py-24 bg-gradient-to-b from-background/50 to-background"
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
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Proven Results</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-white">
            Real Results, Real Impact
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            See how businesses transform with strategic execution
          </p>
        </motion.div>

        {/* Case Studies */}
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-8 bg-background/80 backdrop-blur-xl border-white/20 hover:border-primary/30 transition-all duration-300 hover:shadow-xl shadow-lg">
                <div className="mb-6">
                  <h3 className="font-heading text-2xl font-bold mb-2 text-white">{study.company}</h3>
                  <p className="text-sm text-gray-200">{study.industry} • {study.timeline}</p>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* Before */}
                  <div>
                    <div className="text-xs font-semibold text-gray-300 uppercase tracking-wide mb-3">
                      Before
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-destructive mb-1">
                          {study.before.revenue}
                        </div>
                        <div className="text-xs text-gray-300">Annual Revenue</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white mb-1">
                          {study.before.employees} Employees
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {study.before.challenges.map((challenge, i) => (
                          <li key={i} className="text-sm text-gray-200 flex items-start gap-2">
                            <span className="text-destructive mt-1">•</span>
                            <span>{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* After */}
                  <div>
                    <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
                      After
                      <ArrowRight className="w-3 h-3" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-primary mb-1">
                          {study.after.revenue}
                        </div>
                        <div className="text-xs text-gray-300">Annual Revenue</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-white mb-1">
                          {study.after.employees} Employees
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {study.after.results.map((result, i) => (
                          <li key={i} className="text-sm text-primary flex items-start gap-2">
                            <span className="text-primary mt-1">✓</span>
                            <span className="font-medium">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Growth Indicator */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-200">Growth</div>
                      <div className="text-2xl font-bold text-primary">
                        {Math.round(
                          ((parseFloat(study.after.revenue.replace(/[^0-9.]/g, "")) -
                            parseFloat(study.before.revenue.replace(/[^0-9.]/g, ""))) /
                            parseFloat(study.before.revenue.replace(/[^0-9.]/g, ""))) *
                            100
                        )}
                        %
                      </div>
                    </div>
                    <TrendingUp className="w-8 h-8 text-primary" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

