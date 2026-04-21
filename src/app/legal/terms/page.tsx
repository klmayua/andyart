import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <div className="prose prose-neutral max-w-none">
          <div className="space-y-6 text-text-secondary">
            <section>
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using AndyArt Gallery's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">2. Use License</h2>
              <p>
                Permission is granted to temporarily view the materials (information or software) on AndyArt's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on the website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or mirror the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">3. Artwork Purchases</h2>
              <p>
                All artwork purchases are subject to availability. Prices are subject to change without notice. Shipping and insurance costs are additional unless otherwise stated. Title and risk of loss pass to the buyer upon delivery.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">4. Event Bookings</h2>
              <p>
                Event reservations require full payment at the time of booking. Cancellations made less than 48 hours before the event are non-refundable. AndyArt reserves the right to cancel events due to low enrollment or unforeseen circumstances with full refund.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">5. Partnership Program</h2>
              <p>
                Trade partner status is subject to approval and verification of business credentials. Trade discounts may not be combined with other offers. AndyArt reserves the right to modify or terminate the partnership program at any time.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">6. Disclaimer</h2>
              <p>
                The materials on AndyArt's website are provided on an 'as is' basis. AndyArt makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">7. Limitations</h2>
              <p>
                In no event shall AndyArt or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on AndyArt's website.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">8. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-3">9. Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at hello@andyart.gallery.
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
    </div>
  );
}
