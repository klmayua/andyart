import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
        >
          <ChevronLeft size={20} />
          Back to Home
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-text-secondary">
          <section>
            <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">1. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Name and contact information (email, phone number, address)</li>
              <li>Payment and billing information</li>
              <li>Artwork preferences and purchase history</li>
              <li>Event registrations and booking information</li>
              <li>Communications with us (emails, chat messages, inquiries)</li>
              <li>Device and usage information when you visit our website</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">2. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Process and fulfill your artwork purchases and service bookings</li>
              <li>Send you event confirmations and updates</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Service providers who assist in our operations (payment processors, shipping companies)</li>
              <li>Artists whose work you purchase (for commission and delivery purposes)</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">4. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">6. Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data in a portable format</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">7. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">9. Contact Us</h2>
            <p>
              For questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="mt-2">
              Email: hello@andyart.gallery
            </p>
          </section>

          <div className="pt-8 border-t border-border-light">
            <p className="text-sm">
              Last updated: April 21, 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
