"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  quote: string
  author: string
  company: string
  role?: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Santosh's strategic framework transformed our business. We doubled our revenue in just 10 months using his proven methodologies.",
    author: "Sarah Johnson",
    company: "Tech Innovations Inc.",
    role: "CEO",
  },
  {
    quote:
      "The clarity and actionable insights from Santosh's consulting helped us scale from startup to 7-figures. Highly recommended!",
    author: "Michael Chen",
    company: "Growth Labs",
    role: "Founder",
  },
  {
    quote:
      "Working with Santosh was a game-changer. His expertise in business strategy execution is unmatched. Our team is now more focused and profitable.",
    author: "Emily Rodriguez",
    company: "Digital Solutions Group",
    role: "COO",
  },
]

const stats = [
  { label: "Years of Experience", value: "15+" },
  { label: "Companies Advised", value: "200+" },
  { label: "Course Students", value: "3000+" },
  { label: "Investment Portfolio", value: "$50M+" },
]

interface AnimatedStatCardProps {
  label: string
  value: string
  index: number
  isVisible: boolean
}

function AnimatedStatCard({ label, value, index, isVisible }: AnimatedStatCardProps) {
  const [displayValue, setDisplayValue] = useState("0")
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isVisible || hasAnimated) return

    setHasAnimated(true)
    
    // Extract number and suffix
    const numericMatch = value.match(/^(\$?)(\d+)([A-Za-z+]*)$/)
    if (numericMatch) {
      const prefix = numericMatch[1] || ""
      const targetNum = parseInt(numericMatch[2])
      const suffix = numericMatch[3] || ""
      const duration = 2000
      const steps = 60
      const increment = targetNum / steps
      let current = 0
      let step = 0
      
      const timer = setInterval(() => {
        step++
        current += increment
        if (step >= steps || current >= targetNum) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(prefix + Math.floor(current) + suffix)
        }
      }, duration / steps)
      
      return () => clearInterval(timer)
    } else {
      setDisplayValue(value)
    }
  }, [isVisible, hasAnimated, value])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
    >
      <Card className="p-6 text-center bg-background/90 backdrop-blur-xl border-primary/30 hover:border-gold/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
          className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2"
        >
          {displayValue}
        </motion.div>
        <p className="text-sm text-white/90">{label}</p>
      </Card>
    </motion.div>
  )
}

export function SocialProofSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
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

    const element = document.getElementById("social-proof-section")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000) // Rotate every 5 seconds

    return () => clearInterval(interval)
  }, [isVisible])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section
      id="social-proof-section"
      className="relative py-24 bg-background overflow-hidden"
    >
      {/* Background Gradient - Same as About section */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(30,64,175,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(124,58,237,0.15),transparent_50%)]" />
      
      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Trusted by Forward-Thinking Entrepreneurs
          </h2>
        </motion.div>

        {/* Logo Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center opacity-60 hover:opacity-100 transition-opacity duration-300">
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isVisible
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                className="flex items-center justify-center w-24 h-16 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-white/90 text-xs font-semibold">
                  Logo {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="relative max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-background/90 backdrop-blur-xl border-primary/30 shadow-xl">
              <div className="relative">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Quote className="w-6 h-6 text-primary" />
                </div>

                {/* Testimonials */}
                <div className="relative min-h-[200px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <blockquote className="text-lg md:text-xl text-white mb-8 leading-relaxed">
                        "{testimonials[currentTestimonial].quote}"
                      </blockquote>

                      <div className="flex items-center justify-center gap-4">
                        {/* Photo Placeholder */}
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border-2 border-primary/30">
                          <span className="text-primary font-bold text-lg">
                            {testimonials[currentTestimonial].author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>

                        <div className="text-left">
                          <p className="font-semibold text-white">
                            {testimonials[currentTestimonial].author}
                          </p>
                          <p className="text-sm text-white/90">
                            {testimonials[currentTestimonial].role && (
                              <span>{testimonials[currentTestimonial].role}, </span>
                            )}
                            {testimonials[currentTestimonial].company}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Dots */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? "bg-primary w-8"
                          : "bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-background/90 backdrop-blur-sm border border-primary/30 hover:bg-background hover:border-gold/50 transition-all hidden lg:flex items-center justify-center"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-background/90 backdrop-blur-sm border border-primary/30 hover:bg-background hover:border-gold/50 transition-all hidden lg:flex items-center justify-center"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <AnimatedStatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

