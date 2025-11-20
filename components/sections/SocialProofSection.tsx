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
  // Debug: log the received value
  console.log(`AnimatedStatCard ${label}:`, value, 'isVisible:', isVisible)
  
  // Always start with the actual value to ensure it's visible immediately
  const [displayValue, setDisplayValue] = useState(value)
  const [hasAnimated, setHasAnimated] = useState(false)

  // CRITICAL: Always ensure value is displayed, even before animation
  useEffect(() => {
    // Always show the value if it's different from current display
    if (displayValue !== value) {
      console.log(`Setting displayValue for ${label} to:`, value)
      setDisplayValue(value)
    }
  }, [value, displayValue, label])

  useEffect(() => {
    // Always show the value first, then animate if needed
    if (!isVisible || hasAnimated) {
      return
    }

    setHasAnimated(true)
    
    // Extract number and suffix - handle formats like "15+", "3000+", "$50M+"
    // Handle "M" for millions separately
    let numericMatch = value.match(/^(\$?)(\d+)([A-Za-z+]*)$/)
    let isMillions = false
    let multiplier = 1
    
    if (!numericMatch && value.includes("M")) {
      // Handle "$50M+" format
      const millionsMatch = value.match(/^(\$?)(\d+)(M\+?)$/)
      if (millionsMatch) {
        numericMatch = millionsMatch
        isMillions = true
        multiplier = 1000000
      }
    }
    
    if (numericMatch) {
      const prefix = numericMatch[1] || ""
      const targetNum = parseInt(numericMatch[2], 10) * multiplier
      const suffix = numericMatch[3] || ""
      
      // Reset to 0 for animation
      if (isMillions) {
        setDisplayValue(prefix + "0M+")
      } else {
        setDisplayValue(prefix + "0" + suffix)
      }
      
      const duration = 2000
      const steps = 60
      const increment = targetNum / steps
      let current = 0
      let step = 0
      
      // Start animation after a brief delay
      const timer = setTimeout(() => {
        const intervalTimer = setInterval(() => {
          step++
          current += increment
          if (step >= steps || current >= targetNum) {
            setDisplayValue(value)
            clearInterval(intervalTimer)
          } else {
            if (isMillions) {
              const millions = Math.floor(current / 1000000)
              setDisplayValue(prefix + millions + "M+")
            } else {
              setDisplayValue(prefix + Math.floor(current) + suffix)
            }
          }
        }, duration / steps)
        
        return () => clearInterval(intervalTimer)
      }, 100)
      
      return () => clearTimeout(timer)
    }
    // If no match, value is already set correctly from useState
  }, [isVisible, hasAnimated, value])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
    >
      <Card className="p-6 text-center bg-white border-2 border-gold/30 hover:border-gold transition-all duration-300 hover:shadow-xl hover:-translate-y-1 shadow-lg">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
          className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-2"
        >
          {displayValue}
        </motion.div>
        <p className="text-sm text-gray-700 font-medium">{label}</p>
      </Card>
    </motion.div>
  )
}

export function SocialProofSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(true) // Start as true to show values immediately

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
      // Check if already visible on mount
      const checkVisibility = () => {
        const rect = element.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(true)
        }
      }
      checkVisibility()
      // Also check after a short delay
      setTimeout(checkVisibility, 100)
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
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
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
                <div className="text-gray-700 text-xs font-semibold">
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
            <Card className="p-8 md:p-12 bg-white border-2 border-gold/30 shadow-xl">
              <div className="relative">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gold/30 border-2 border-gold flex items-center justify-center shadow-lg z-10">
                  <Quote className="w-6 h-6 text-gray-900" />
                </div>

                {/* Testimonials */}
                <div className="relative min-h-[200px] pt-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <blockquote className="text-lg md:text-xl text-gray-900 font-medium mb-8 leading-relaxed px-4">
                        "{testimonials[currentTestimonial].quote}"
                      </blockquote>

                      <div className="flex items-center justify-center gap-4">
                        {/* Photo Placeholder */}
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/40 to-yellow-light/40 flex items-center justify-center border-2 border-gold shadow-lg">
                          <span className="text-gray-900 font-bold text-lg">
                            {testimonials[currentTestimonial].author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>

                        <div className="text-left">
                          <p className="font-semibold text-gray-900 text-base">
                            {testimonials[currentTestimonial].author}
                          </p>
                          <p className="text-sm text-gray-700">
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
                    <motion.button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? "bg-gold w-8"
                          : "bg-gold/30 hover:bg-gold/50"
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <motion.button
                  onClick={prevTestimonial}
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 p-2 rounded-full bg-white backdrop-blur-sm border-2 border-gold hover:bg-gold/10 hover:border-gold transition-all hidden lg:flex items-center justify-center shadow-lg"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-900" />
                </motion.button>
                <motion.button
                  onClick={nextTestimonial}
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 p-2 rounded-full bg-white backdrop-blur-sm border-2 border-gold hover:bg-gold/10 hover:border-gold transition-all hidden lg:flex items-center justify-center shadow-lg"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-gray-900" />
                </motion.button>
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
          {stats.map((stat, index) => {
            // Debug: log the stat values
            console.log(`Stat ${index}:`, stat.label, stat.value)
            return (
              <AnimatedStatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                index={index}
                isVisible={isVisible}
              />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

