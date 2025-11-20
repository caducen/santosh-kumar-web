"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, X, Users, TrendingUp, Award } from "lucide-react"

interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoSrc: string
  isYouTube?: boolean
}

function VideoModal({ isOpen, onClose, videoSrc, isYouTube = false }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateTime = () => setCurrentTime(video.currentTime)
    const updateDuration = () => setDuration(video.duration)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener("timeupdate", updateTime)
    video.addEventListener("loadedmetadata", updateDuration)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("timeupdate", updateTime)
      video.removeEventListener("loadedmetadata", updateDuration)
      video.removeEventListener("ended", handleEnded)
    }
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.play()
    } else {
      video.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.volume = volume
    video.muted = isMuted
  }, [volume, isMuted])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    const progressBar = progressRef.current
    if (!video || !progressBar) return

    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const clickRatio = clickX / width
    video.currentTime = clickRatio * duration
    setCurrentTime(video.currentTime)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-4xl mx-4 bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Video Player */}
        {isYouTube ? (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={videoSrc}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Business Strategy Video"
            />
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-auto"
              playsInline
            />

            {/* Custom Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
          {/* Progress Bar */}
          <div
            ref={progressRef}
            className="w-full h-2 bg-white/20 rounded-full cursor-pointer mb-4"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white" />
              )}
            </button>

            <div className="flex items-center gap-2 flex-1">
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #1E40AF 0%, #1E40AF ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`,
                }}
              />
            </div>
          </div>
        </div>
          </>
        )}
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  number: string
  label: string
  delay?: number
}

function StatCard({ icon, number, label, delay = 0 }: StatCardProps) {
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

    const element = document.getElementById(`stat-card-${number.replace(/[^a-zA-Z0-9]/g, "")}`)
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [number])

  return (
    <motion.div
      id={`stat-card-${number.replace(/[^a-zA-Z0-9]/g, "")}`}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
    >
      <Card className="p-6 bg-background/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all hover:scale-105">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div className="flex-1">
            <div className="text-2xl font-heading font-bold text-primary mb-1">
              {number}
            </div>
            <p className="text-sm text-muted-foreground">{label}</p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export function VideoBoxSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
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

    const element = document.getElementById("video-box-section")
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  // YouTube video about business strategy and scaling businesses
  // This is a popular video about business growth strategies
  const youtubeVideoId = "f6yA3t0n0NY" // "How to Build a Business That Works" by Alex Hormozi
  const videoSrc = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`
  const isYouTube = true
  
  // Alternative: Use a local video file
  // const videoSrc = "/videos/business-strategy-video.mp4"
  // const isYouTube = false

  return (
    <section
      id="about"
      className="relative py-12 lg:py-16 bg-gradient-to-b from-background to-background/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[60%_40%] gap-12 items-center">
          {/* Left Column - Video */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
              onClick={() => setIsModalOpen(true)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-primary via-secondary to-accent">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:bg-white transition-colors"
                  >
                    <Play className="w-10 h-10 text-primary ml-1" fill="currentColor" />
                  </motion.div>
                </div>
              </div>

              {/* Video Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white font-heading text-xl font-semibold">
                  How I Help Businesses Double Their Income in 12 Months
                </h3>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Stats & Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Section Heading */}
            <div>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
                Proven Track Record
              </h2>
            </div>

            {/* Stat Cards */}
            <div className="space-y-4">
              <StatCard
                icon={<Users className="w-6 h-6" />}
                number="3000+"
                label="Students Trained"
                delay={0.1}
              />
              <StatCard
                icon={<TrendingUp className="w-6 h-6" />}
                number="50+"
                label="Businesses Scaled to 6-Figures"
                delay={0.2}
              />
              <StatCard
                icon={<Award className="w-6 h-6" />}
                number="Official"
                label="Forbes Council Member"
                delay={0.3}
              />
            </div>

            {/* Testimonial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="text-4xl text-primary/30">"</div>
                  <div className="flex-1">
                    <p className="text-base text-foreground italic mb-4">
                      Working with Santosh transformed our business. We doubled our
                      revenue in just 10 months using his strategic framework.
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-primary font-semibold">JD</span>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">John Doe</p>
                        <p className="text-sm text-muted-foreground">CEO, Tech Startup</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button
                size="lg"
                className="w-full text-base px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Start Your Growth Journey
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoSrc={videoSrc}
        isYouTube={isYouTube}
      />
    </section>
  )
}

