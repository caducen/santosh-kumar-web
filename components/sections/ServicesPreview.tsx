"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Target, Mic, GraduationCap, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Service {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

const services: Service[] = [
  {
    icon: <Target className="w-8 h-8" />,
    title: "Strategy Consulting",
    description: "Develop and execute winning business strategies",
    href: "/#services",
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: "Keynote Speaking",
    description: "Inspire your team with proven success frameworks",
    href: "/#services",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Online Courses",
    description: "Master strategy execution through structured learning",
    href: "/#services",
  },
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(`service-card-${index}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [index])

  return (
    <motion.div
      id={`service-card-${index}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
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
            ? "linear-gradient(135deg, rgba(30, 64, 175, 0.6), rgba(124, 58, 237, 0.6), rgba(212, 168, 83, 0.5))"
            : "transparent",
        }}
      >
        <Card
          className={`relative h-full p-8 bg-background/90 backdrop-blur-xl border transition-all duration-300 overflow-hidden rounded-lg ${
            isHovered
              ? "border-gold/50 shadow-2xl shadow-gold/30"
              : "border-primary/30 shadow-lg"
          }`}
        >

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <motion.div
              className={`mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br text-primary transition-all ${
                isHovered 
                  ? "from-gold/30 to-gold/20 border-2 border-gold/40" 
                  : "from-primary/20 to-secondary/20 border-2 border-primary/20"
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {service.icon}
            </motion.div>

            {/* Title */}
            <h3 className="font-heading text-2xl font-bold mb-3 text-white">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-gray-200 mb-6 leading-relaxed">
              {service.description}
            </p>

            {/* Learn More Link */}
            <Link
              href={service.href}
              className={`inline-flex items-center gap-2 font-semibold hover:gap-3 transition-all group/link ${
                isHovered ? "text-gold" : "text-primary"
              }`}
            >
              <span>Learn More</span>
              <motion.span
                animate={isHovered ? { x: 4 } : { x: 0 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
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
                "radial-gradient(circle at center, rgba(212, 168, 83, 0.15), transparent 70%)",
              zIndex: -1,
            }}
          />
        </Card>
      </motion.div>
    </motion.div>
  )
}

export function ServicesPreview() {
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

    const element = document.getElementById("services-preview")
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
      id="services-preview"
      className="relative py-24 bg-background"
    >
      {/* Gold accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-white">
            Our Services
          </h2>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Comprehensive solutions to help you scale your business and achieve
            sustainable growth
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

