import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | Santosh Kumar",
  description: "Terms of Service for Santosh Kumar's website",
}

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-4xl">
      <h1 className="font-heading text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-invert max-w-none space-y-6">
        <p className="text-muted-foreground">
          <strong>Last updated:</strong> {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-muted-foreground">
            By accessing and using this website, you accept and agree to be bound by
            the terms and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            2. Use License
          </h2>
          <p className="text-muted-foreground">
            Permission is granted to temporarily access the materials on Santosh Kumar's
            website for personal, non-commercial transitory viewing only. This is the
            grant of a license, not a transfer of title.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            3. Services
          </h2>
          <p className="text-muted-foreground">
            Our services include business consulting, online courses, keynote speaking,
            and related educational resources. All services are subject to availability
            and our terms of service.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            4. Payment Terms
          </h2>
          <p className="text-muted-foreground">
            Payment for services must be made in accordance with the terms specified at
            the time of purchase. Refunds are subject to our refund policy.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            5. Intellectual Property
          </h2>
          <p className="text-muted-foreground">
            All content on this website, including but not limited to text, graphics,
            logos, and software, is the property of Santosh Kumar and is protected by
            copyright and other intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            6. Disclaimer
          </h2>
          <p className="text-muted-foreground">
            The materials on this website are provided on an 'as is' basis. Santosh
            Kumar makes no warranties, expressed or implied, and hereby disclaims and
            negates all other warranties including, without limitation, implied
            warranties or conditions of merchantability, fitness for a particular
            purpose, or non-infringement of intellectual property.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            7. Limitations
          </h2>
          <p className="text-muted-foreground">
            In no event shall Santosh Kumar or its suppliers be liable for any damages
            (including, without limitation, damages for loss of data or profit, or due
            to business interruption) arising out of the use or inability to use the
            materials on this website.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            8. Contact Information
          </h2>
          <p className="text-muted-foreground">
            If you have any questions about these Terms of Service, please contact us
            at:
          </p>
          <p className="text-muted-foreground">
            Email: contact@santoshkumar.com
          </p>
        </section>
      </div>
    </div>
  )
}

