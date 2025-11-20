import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | Santosh Kumar",
  description: "Privacy Policy for Santosh Kumar's website",
}

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 max-w-4xl">
      <h1 className="font-heading text-4xl font-bold mb-8">Privacy Policy</h1>
      
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
            1. Information We Collect
          </h2>
          <p className="text-muted-foreground">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Name and contact information</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Company information</li>
            <li>Any other information you choose to provide</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-muted-foreground">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Respond to your inquiries and requests</li>
            <li>Send you updates and marketing communications (with your consent)</li>
            <li>Monitor and analyze trends and usage</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            3. Information Sharing
          </h2>
          <p className="text-muted-foreground">
            We do not sell, trade, or rent your personal information to third parties.
            We may share your information only in the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and safety</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            4. Data Security
          </h2>
          <p className="text-muted-foreground">
            We implement appropriate security measures to protect your personal
            information. However, no method of transmission over the Internet is 100%
            secure.
          </p>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            5. Your Rights
          </h2>
          <p className="text-muted-foreground">
            You have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section>
          <h2 className="font-heading text-2xl font-bold mt-8 mb-4">
            6. Contact Us
          </h2>
          <p className="text-muted-foreground">
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p className="text-muted-foreground">
            Email: contact@santoshkumar.com
          </p>
        </section>
      </div>
    </div>
  )
}

