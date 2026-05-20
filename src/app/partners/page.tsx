import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const partnerTypes = [
  {
    title: 'Interior Designers',
    description: 'Access exclusive trade pricing, priority sourcing, and dedicated support for your client projects.',
    benefits: [
      'Trade discount program (20-40% off)',
      'Priority access to new arrivals',
      'Dedicated trade account manager',
      'Custom sourcing requests',
      'Net 30 payment terms',
    ],
  },
  {
    title: 'Corporate Clients',
    description: 'Transform your office space with curated art that reflects your brand and inspires your team.',
    benefits: [
      'Full-service art curation',
      'Artwork rental programs',
      'Employee art purchase programs',
      'Installation and maintenance',
      'Tax consultation resources',
    ],
  },
  {
    title: 'Venues & Hospitality',
    description: 'Elevate your hotel, restaurant, or event space with carefully selected artwork.',
    benefits: [
      'Large-scale installation expertise',
      'Rotating exhibition programs',
      'Custom commissioning services',
      'Maintenance and insurance support',
      'Co-marketing opportunities',
    ],
  },
  {
    title: 'Art Advisors',
    description: 'Partner with us to offer your clients access to our curated collection and white-glove services.',
    benefits: [
      'Agent commission structure',
      'Exclusive artwork access',
      'White-glove shipping',
      'Client portal access',
      'Marketing support',
    ],
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16 pt-12">
          <p className="section-label animate-fade-in-up">Partnership</p>
          <h1 className="display-lg mb-6 text-[#171614] animate-fade-in-up delay-1">
            Grow with AndyArt
          </h1>
          <p className="text-md max-w-2xl leading-relaxed animate-fade-in-up delay-2" style={{ color: 'rgba(93, 70, 51, 0.8)' }}>
            Join our network of partners and offer your clients access to Africa's finest curated collection.
          </p>
        </div>

        {/* Partner Types */}
        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {partnerTypes.map((type, idx) => (
            <div
              key={type.title}
              className="bg-white rounded-2xl border p-8 card-postmodern animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.1}s`, borderColor: 'rgba(23,22,20,0.06)' }}
            >
              <h2 className="font-serif text-2xl font-bold text-[#171614] mb-3">{type.title}</h2>
              <p className="text-sm mb-6 leading-relaxed" style={{ color: 'rgba(93,70,51,0.8)' }}>{type.description}</p>
              <ul className="space-y-3 mb-8">
                {type.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: '#C6A66B' }} />
                    <span style={{ color: 'rgba(93,70,51,0.8)' }}>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/partners/apply"
                className="btn-postmodern text-sm inline-flex items-center gap-2"
              >
                Apply Now
                <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-12 text-center" style={{ background: '#171614' }}>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-4">
            Have a unique partnership in mind?
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            We welcome custom partnership proposals. Let's explore how we can create something exceptional together.
          </p>
          <Link
            href="mailto:partners@andyart.gallery"
            className="btn-postmodern-gold text-base"
          >
            Contact Partnerships
          </Link>
        </div>
      </div>
    </div>
  );
}