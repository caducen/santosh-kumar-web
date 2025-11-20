/**
 * HeroSection Component
 * 
 * A modern, animated hero section with:
 * - Full viewport height
 * - Animated gradient background (blue to purple)
 * - Two-column layout on desktop, stacked on mobile
 * - Framer Motion animations
 * - Floating stat cards with scroll animations
 * - Scroll indicator at bottom
 * 
 * To customize:
 * 1. Replace the mission statement text (line ~120)
 * 2. Update stat card numbers and labels
 * 3. Replace image placeholder with actual image
 * 4. Update CTA button links/actions
 */

"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronDown, Award } from "lucide-react"
import { useEffect, useState } from "react"

interface StatCardProps {
  number: string
  label: string
  delay?: number
}

function StatCard({ number, label, delay = 0 }: StatCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [displayNumber, setDisplayNumber] = useState("0")
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true)
          setHasAnimated(true)
          
          // Animate number if it's numeric
          const numericMatch = number.match(/^(\d+)(.*)$/)
          if (numericMatch) {
            const targetNum = parseInt(numericMatch[1])
            const suffix = numericMatch[2] || ""
            const duration = 2000 // 2 seconds
            const steps = 60
            const increment = targetNum / steps
            let current = 0
            let step = 0
            
            const timer = setInterval(() => {
              step++
              current += increment
              if (step >= steps || current >= targetNum) {
                setDisplayNumber(number)
                clearInterval(timer)
              } else {
                setDisplayNumber(Math.floor(current) + suffix)
              }
            }, duration / steps)
            
            return () => clearInterval(timer)
          } else {
            setDisplayNumber(number)
          }
        }
      },
      { threshold: 0.1 }
    )

    const elementId = `stat-${number.replace(/[^a-zA-Z0-9]/g, "")}`
    const element = document.getElementById(elementId)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [number, hasAnimated])

  return (
    <motion.div
      id={`stat-${number.replace(/[^a-zA-Z0-9]/g, "")}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="p-6 bg-background/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all hover:scale-105">
        <motion.div
          initial={{ scale: 0 }}
          animate={isVisible ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
          className="text-4xl font-heading font-bold text-primary mb-2"
        >
          {displayNumber}
        </motion.div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </Card>
    </motion.div>
  )
}

export function HeroSection() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-90" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(30, 64, 175, 0.6) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(124, 58, 237, 0.6) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(245, 158, 11, 0.6) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(30, 64, 175, 0.6) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.4) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                Double Your Income with Strategic Business Execution
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold text-sm sm:text-base">Forbes Council Member</span>
              </div>
              <p className="text-lg sm:text-xl text-white/90 font-medium">
                3000+ Students | 50+ Businesses Scaled
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="prose prose-invert max-w-none">
                <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                  {/* PASTE MISSION STATEMENT HERE */}
                  Transform your business with proven strategies that have scaled
                  over 50 businesses and trained thousands of entrepreneurs. Join
                  a community of high-achievers who have doubled their income
                  through strategic execution and expert guidance.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="text-base px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Book Free Strategy Call
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base px-8 py-6 rounded-full font-semibold border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all"
              >
                View Free Resources
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Hero Image */}
            <div className="relative w-full aspect-[4/3] max-w-lg mx-auto">
              <motion.div
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl" />
                <Image
                  src="/images/hero-image.jpg"
                  alt="Santosh Kumar with team at professional event"
                  fill
                  className="object-cover rounded-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const parent = target.parentElement?.parentElement
                    if (parent && !parent.querySelector(".image-fallback")) {
                      const fallback = document.createElement("div")
                      fallback.className = "image-fallback absolute inset-0 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                      fallback.innerHTML = `
                        <div class="text-center p-8">
                          <div class="w-32 h-32 mx-auto mb-4 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center">
                            <span class="text-4xl">👤</span>
                          </div>
                          <p class="text-white/60 text-sm">Bilden hittades inte</p>
                        </div>
                      `
                      parent.appendChild(fallback)
                    }
                  }}
                />
                {/* Subtle overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl" />
              </motion.div>
            </div>

            {/* Floating Stat Cards */}
            <div className="absolute -top-24 -right-4 hidden lg:block">
              <StatCard number="3000+" label="Students Trained" delay={0.4} />
            </div>
            <div className="absolute -bottom-8 -left-4 hidden lg:block">
              <StatCard number="50+" label="Businesses Scaled" delay={0.6} />
            </div>
            <div className="absolute top-[60%] -right-8 hidden lg:block transform -translate-y-1/2">
              <StatCard number="Forbes" label="Council Member" delay={0.8} />
            </div>

            {/* Mobile Stat Cards */}
            <div className="grid grid-cols-3 gap-4 mt-8 lg:hidden">
              <StatCard number="3000+" label="Students" delay={0.4} />
              <StatCard number="50+" label="Businesses" delay={0.5} />
              <StatCard number="Forbes" label="Member" delay={0.6} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }}
        >
          <span className="text-white/60 text-sm font-medium">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}

