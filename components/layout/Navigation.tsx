"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Home", id: "home" },
  { href: "/#about", label: "About", id: "about" },
  { href: "/#services", label: "Services", id: "services" },
  { href: "/#courses", label: "Courses", id: "courses" },
  { href: "/#resources", label: "Resources", id: "resources" },
  { href: "/#contact", label: "Contact", id: "contact" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Update active section based on scroll position
      const scrollPosition = window.scrollY + 150

      // If at the top, set home as active
      if (window.scrollY < 100) {
        setActiveSection("home")
        return
      }

      // Check sections in reverse order
      const sections = navItems
        .filter((item) => item.id !== "home")
        .map((item) => item.id)
        .reverse()

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop
          if (scrollPosition >= sectionTop) {
            setActiveSection(sectionId)
            return
          }
        }
      }

      // If no section matches, keep current active section
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "/") {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: "smooth" })
      setIsMobileMenuOpen(false)
    } else if (href.startsWith("/#")) {
      e.preventDefault()
      const sectionId = href.replace("/#", "")
      const section = document.getElementById(sectionId)
      if (section) {
        const headerOffset = 80
        const elementPosition = section.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
        setIsMobileMenuOpen(false)
      }
    }
  }

  const handleMobileNavClick = (href: string) => {
    if (href === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (href.startsWith("/#")) {
      const sectionId = href.replace("/#", "")
      const section = document.getElementById(sectionId)
      if (section) {
        const headerOffset = 80
        const elementPosition = section.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? "rgba(15, 23, 42, 0.95)"
            : "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(12px)",
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 border-b transition-colors"
        style={{
          borderColor: isScrolled ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
        }}
      >
        <nav
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main navigation"
        >
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md px-2 -ml-2"
              aria-label="Santosh Kumar - Home"
            >
              <motion.div
                className="relative h-32 w-32 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Logo - Försök först med bildfil, sedan SVG */}
                <Image
                  src="/images/logo.png"
                  alt="Santosh Kumar Logo"
                  width={128}
                  height={128}
                  className="object-contain h-full w-full"
                  priority
                  onError={(e) => {
                    // Fallback till SVG om PNG inte finns
                    const target = e.target as HTMLImageElement
                    target.src = "/images/logo.svg"
                  }}
                />
              </motion.div>
              <motion.span
                className={`font-heading text-xl font-bold hidden sm:block ${
                  isScrolled ? "text-white" : "text-gray-900"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                SANTOSH KUMAR
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : activeSection === item.id || pathname === item.href

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-md px-2 py-1 ${
                      isActive
                        ? "text-white"
                        : isScrolled
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-800 hover:text-gray-900"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        initial={false}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button
                size="lg"
                className="rounded-full px-6 font-semibold shadow-lg hover:shadow-xl transition-all"
                onClick={() => {
                  const contactSection = document.getElementById("contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                aria-label="Book a free strategy call"
              >
                Book a Call
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className={`lg:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                isScrolled ? "text-white" : "text-gray-900"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-background/95 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 lg:hidden overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                  <div className="flex items-center space-x-3">
                    <div className="relative h-11 w-11 flex items-center justify-center">
                      <Image
                        src="/images/logo.png"
                        alt="Santosh Kumar Logo"
                        width={44}
                        height={44}
                        className="object-contain h-full w-full"
                        priority
                        onError={(e) => {
                          // Fallback till SVG om PNG inte finns
                          const target = e.target as HTMLImageElement
                          target.src = "/images/logo.svg"
                        }}
                      />
                    </div>
                    <span className="font-heading text-lg font-bold text-white">
                      SANTOSH KUMAR
                    </span>
                  </div>
                  <button
                    type="button"
                    className="p-2 rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Close mobile menu"
                  >
                    <X className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex-1 px-6 py-8" aria-label="Mobile navigation">
                  <ul className="space-y-2">
                    {navItems.map((item, index) => {
                      const isActive =
                        item.href === "/"
                          ? pathname === "/"
                          : activeSection === item.id || pathname === item.href

                      return (
                        <motion.li
                          key={item.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => handleMobileNavClick(item.href)}
                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background ${
                              isActive
                                ? "bg-primary/10 text-primary border-l-4 border-primary"
                                : "text-gray-300 hover:bg-white/5 hover:text-white"
                            }`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            {item.label}
                          </Link>
                        </motion.li>
                      )
                    })}
                  </ul>
                </nav>

                {/* Mobile CTA */}
                <div className="p-6 border-t border-white/10">
                  <Button
                    size="lg"
                    className="w-full rounded-full font-semibold shadow-lg"
                    onClick={() => {
                      const contactSection = document.getElementById("contact")
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" })
                      }
                      setIsMobileMenuOpen(false)
                    }}
                    aria-label="Book a free strategy call"
                  >
                    Book a Call
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

