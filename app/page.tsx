import Script from "next/script"
import { HeroSection } from "@/components/sections/HeroSection"
import { VideoBoxSection } from "@/components/sections/VideoBoxSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { ServicesPreview } from "@/components/sections/ServicesPreview"
import { SocialProofSection } from "@/components/sections/SocialProofSection"
import { MediaMentions } from "@/components/sections/MediaMentions"
import { BeforeAfter } from "@/components/sections/BeforeAfter"
import { CoursesSection } from "@/components/sections/CoursesSection"
import { ResourcesSection } from "@/components/sections/ResourcesSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { CTASection } from "@/components/sections/CTASection"

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Santosh Kumar",
  url: "https://www.santoshkumar.com",
  description:
    "Double your income with strategic business execution. Forbes Council Member helping 3000+ entrepreneurs scale their businesses. Expert in business strategy, consulting, and online courses.",
  areaServed: "Global",
  serviceType: [
    "Strategy Consulting",
    "Keynote Speaking",
    "Online Courses",
    "Business Coaching",
  ],
  founder: {
    "@type": "Person",
    name: "Santosh Kumar",
    jobTitle: "Forbes Council Member | Business Strategist | Entrepreneur",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "150",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "consultation",
    email: "contact@santoshkumar.com",
    telephone: "+1-234-567-890",
  },
}

export default function Home() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <HeroSection />
      <VideoBoxSection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Services Section */}
      <section id="services">
        <ServicesPreview />
      </section>

      {/* Social Proof Section */}
      <SocialProofSection />

      {/* Media Mentions Section */}
      <MediaMentions />

      {/* Before/After Results Section */}
      <BeforeAfter />

      {/* CTA Section */}
      <CTASection />
      
      {/* Courses Section */}
      <section id="courses">
        <CoursesSection />
      </section>
      
      {/* Resources Section */}
      <section id="resources">
        <ResourcesSection />
      </section>
      
      {/* Contact Section */}
      <ContactSection />
    </>
  )
}
