/**
 * AboutSection Component
 * 
 * A compelling About section showcasing Santosh Kumar's story, achievements, and expertise.
 * Features:
 * - Two-column layout (image + content)
 * - Key achievements and credentials
 * - Personal story and mission
 * - Framer Motion animations
 * - Responsive design
 */

"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, Users, TrendingUp, BookOpen, Target, Zap } from "lucide-react"

const achievements = [
  {
    icon: Award,
    number: "Forbes",
    label: "Council Member",
    description: "Recognized thought leader in business strategy",
  },
  {
    icon: Users,
    number: "3000+",
    label: "Students Trained",
    description: "Entrepreneurs transformed through strategic guidance",
  },
  {
    icon: TrendingUp,
    number: "50+",
    label: "Businesses Scaled",
    description: "Companies scaled to 6-figure revenue and beyond",
  },
  {
    icon: BookOpen,
    number: "10+",
    label: "Years Experience",
    description: "Dedicated to helping entrepreneurs succeed",
  },
]

const values = [
  {
    icon: Target,
    title: "Strategic Execution",
    description: "Turning vision into actionable, results-driven strategies that deliver measurable outcomes.",
  },
  {
    icon: Zap,
    title: "Proven Frameworks",
    description: "Battle-tested methodologies that have scaled hundreds of businesses across industries.",
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(30,64,175,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(124,58,237,0.1),transparent_50%)]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-4">
            About Santosh Kumar
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            From Startup to{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Forbes
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A proven business strategist dedicated to helping entrepreneurs double their income
            through strategic execution and expert guidance.
          </p>
        </motion.div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
          {/* Left Column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-2xl z-10" />
              <Image
                src="/images/hero-image.jpg"
                alt="Santosh Kumar - Business Strategist and Forbes Council Member"
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Decorative Badge */}
              <div className="absolute top-6 right-6 z-20">
                <Card className="px-4 py-2 bg-background/90 backdrop-blur-sm border-primary/30 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-white">Forbes Council</span>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Story */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white">
                The Journey
              </h3>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Santosh Kumar's journey began with a simple belief: every entrepreneur has the
                  potential to build a thriving, scalable business. What separates the successful
                  from the struggling isn't talent or luck—it's strategic execution.
                </p>
                <p>
                  Over the past decade, Santosh has dedicated himself to developing and refining
                  frameworks that transform businesses. His approach combines proven methodologies
                  with personalized guidance, helping entrepreneurs navigate the complexities of
                  scaling from startup to success.
                </p>
                <p>
                  As a Forbes Council Member, Santosh brings a unique perspective to business
                  strategy, drawing from real-world experience scaling 50+ businesses and training
                  over 3000 entrepreneurs. His insights have been featured in leading business
                  publications, and his courses have become the go-to resource for ambitious
                  business owners ready to take their companies to the next level.
                </p>
              </div>
            </div>

            {/* Mission */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border-primary/20 backdrop-blur-sm">
              <h4 className="text-xl font-heading font-bold text-white mb-3">
                The Mission
              </h4>
              <p className="text-gray-200 leading-relaxed">
                "My mission is to democratize business success. I believe that with the right
                strategy, framework, and guidance, any entrepreneur can double their income and
                build a business that not only survives but thrives. Every business owner deserves
                access to the tools and insights that can transform their future."
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Achievements Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon
            return (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="p-6 h-full bg-background/60 backdrop-blur-sm border-white/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-heading font-bold text-white">
                        {achievement.number}
                      </div>
                      <div className="text-sm font-semibold text-primary">
                        {achievement.label}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <Card className="p-8 bg-background/60 backdrop-blur-sm border-white/10 hover:border-primary/30 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-heading font-bold text-white mb-2">
                        {value.title}
                      </h4>
                      <p className="text-gray-300 leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Card className="p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border-primary/20 backdrop-blur-sm inline-block">
            <h3 className="text-2xl font-heading font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl">
              Join 3000+ entrepreneurs who have doubled their income through strategic execution.
              Book a free strategy call and discover how we can help you scale your business.
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              onClick={() => {
                const contactSection = document.getElementById("contact")
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Book Your Free Strategy Call
            </Button>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

