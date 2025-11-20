"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Users, ArrowRight, Star, Check } from "lucide-react"

interface Course {
  title: string
  description: string
  duration: string
  students: string
  rating: number
  price: string
  features: string[]
  level: "Beginner" | "Intermediate" | "Advanced"
}

const courses: Course[] = [
  {
    title: "Strategic Business Execution Masterclass",
    description:
      "Master the framework that has scaled 50+ businesses to 6-figures. Learn proven strategies for rapid growth and sustainable success.",
    duration: "8 weeks",
    students: "1,200+",
    rating: 4.9,
    price: "$997",
    level: "Intermediate",
    features: [
      "8-week comprehensive program",
      "Live Q&A sessions",
      "1-on-1 strategy sessions",
      "Access to exclusive community",
      "Lifetime course updates",
      "Certificate of completion",
    ],
  },
  {
    title: "From Startup to Scale: The Complete Guide",
    description:
      "Transform your startup into a scalable business. Learn the exact steps to go from idea to 7-figure revenue.",
    duration: "6 weeks",
    students: "850+",
    rating: 4.8,
    price: "$797",
    level: "Beginner",
    features: [
      "6-week intensive program",
      "Step-by-step frameworks",
      "Case study analysis",
      "Resource library access",
      "Community support",
      "30-day money-back guarantee",
    ],
  },
  {
    title: "Advanced Business Strategy & Leadership",
    description:
      "For experienced entrepreneurs ready to take their business to the next level. Advanced frameworks and executive-level insights.",
    duration: "10 weeks",
    students: "450+",
    rating: 5.0,
    price: "$1,497",
    level: "Advanced",
    features: [
      "10-week advanced program",
      "Executive coaching sessions",
      "Custom strategy development",
      "Peer mastermind group",
      "Priority support",
      "Exclusive networking events",
    ],
  },
]

export function CoursesSection() {
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

    const element = document.getElementById("courses-section")
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
      id="courses-section"
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
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Online Courses</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4">
            Transform Your Business Through Learning
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join 3000+ entrepreneurs who have transformed their businesses with our
            proven frameworks and strategies.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full p-8 bg-background/40 backdrop-blur-xl border-white/20 hover:border-primary/50 transition-all duration-300 hover:shadow-xl flex flex-col">
                {/* Level Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      course.level === "Beginner"
                        ? "bg-green-500/20 text-green-400"
                        : course.level === "Intermediate"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-purple-500/20 text-purple-400"
                    }`}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading text-2xl font-bold mb-3">{course.title}</h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 flex-grow">{course.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.students} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {course.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="mt-auto pt-6 border-t border-white/10">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-3xl font-bold text-primary">{course.price}</span>
                      <span className="text-muted-foreground text-sm ml-2">one-time</span>
                    </div>
                  </div>
                  <Button className="w-full" size="lg">
                    Enroll Now
                    <ArrowRight className="w-4 h-4 ml-2" />
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Not sure which course is right for you?
          </p>
          <Button variant="outline" size="lg">
            Book a Free Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

