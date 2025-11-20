"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Send, CheckCircle, AlertCircle, Mail, Phone, MapPin } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type FormData = z.infer<typeof formSchema>

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setStatus("loading")
    
    // Simulate API call - replace with actual form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      // Here you would typically send data to your backend or Formspree
      console.log("Form data:", data)
      setStatus("success")
      reset()
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    } catch (error) {
      setStatus("error")
      setTimeout(() => {
        setStatus("idle")
      }, 5000)
    }
  }

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-br from-yellow-pale/30 via-white to-yellow-light/20 overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF9B00' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      {/* Accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent z-10" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
                Let's Start Your Growth Journey
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Ready to double your income? Book a free strategy call and discover
                how we can transform your business together.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gold/20 text-gold">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Email</h3>
                  <a
                    href="mailto:contact@santoshkumar.com"
                    className="text-gray-700 hover:text-gold transition-colors"
                  >
                    contact@santoshkumar.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gold/20 text-gold">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Phone</h3>
                  <a
                    href="tel:+1234567890"
                    className="text-gray-700 hover:text-gold transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gold/20 text-gold">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">Location</h3>
                  <p className="text-gray-700">
                    Available Worldwide<br />
                    Remote Consultations
                  </p>
                </div>
              </div>
            </div>

            <Card className="p-6 bg-white border-2 border-gold/30 hover:border-gold transition-all shadow-lg">
              <h3 className="font-semibold mb-2 text-gray-900">Free Strategy Call</h3>
              <p className="text-sm text-gray-700 mb-4">
                Book a 45-minute consultation and leave with insights worth 6-figures.
                No obligation, guaranteed value.
              </p>
              <Button className="w-full bg-gradient-to-r from-gold to-yellow hover:from-gold hover:to-yellow-light text-white font-semibold">Schedule Your Call</Button>
            </Card>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-white border-2 border-gold/30 hover:border-gold transition-all shadow-xl">
              <h3 className="font-heading text-2xl font-bold mb-6 text-gray-900">Send a Message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      {...register("name")}
                      placeholder="John Doe"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="john@company.com"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register("phone")}
                      placeholder="+1 (234) 567-890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      {...register("company")}
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="Tell us about your business goals..."
                    rows={6}
                    className={errors.message ? "border-destructive" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message.message}</p>
                  )}
                </div>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive"
                  >
                    <AlertCircle className="w-5 h-5" />
                    <span>Something went wrong. Please try again.</span>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

