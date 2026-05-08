import Link from 'next/link';
import { ArrowRight, Building, Users, Handshake } from 'lucide-react';

export default function PartnersPage() {
  const partnerTypes = [
    {
      icon: <Building className="w-12 h-12" />,
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
      icon: <Building className="w-12 h-12" />,
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
      icon: <Users className="w-12 h-12" />,
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
  ];

  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-3 font-medium">Collaboration</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-andy-black editorial-headline mb-4">
            Partnership Program
          </h1>
          <p className="text-lg text-andy-bronze max-w-2xl mx-auto">
            Join our network of interior designers, corporate clients, and venues. Get exclusive benefits and elevate your projects with curated art.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-andy-black text-andy-ivory rounded-2xl p-8 mb-12 text-center">
          <h2 className="font-serif text-2xl font-bold mb-4">Ready to Partner With Us?</h2>
          <p className="text-andy-ivory/60 mb-6 max-w-xl mx-auto">
            Apply now to join our trade program and start enjoying exclusive benefits.
          </p>
          <Link
            href="/partners/apply"
            className="bg-andy-gold text-andy-black px-8 py-4 rounded-full font-medium hover:bg-andy-ivory transition-all inline-flex items-center gap-2 text-sm"
          >
            Apply Now
            <ArrowRight size={18} />
          </Link>
        </div>

        {/* Partner Types */}
        <div className="mb-12">
          <h2 className="font-serif text-2xl font-bold text-andy-black mb-8 text-center">
            Partnership Opportunities
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {partnerTypes.map((type, index) => (
              <div key={index} className="bg-white border border-andy-stone/30 rounded-2xl p-6 hover:border-andy-gold/30 hover:shadow-premium transition-all">
                <div className="text-andy-gold mb-4">{type.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-andy-black mb-3">
                  {type.title}
                </h3>
                <p className="text-andy-bronze mb-4 text-sm leading-relaxed">{type.description}</p>
                <ul className="space-y-2">
                  {type.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-andy-bronze">
                      <span className="text-andy-gold mt-0.5">•</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-andy-ivory rounded-2xl p-8 mb-12 border border-andy-stone/20">
          <h2 className="font-serif text-2xl font-bold text-andy-black mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Apply', description: 'Submit your application with business details' },
              { step: '2', title: 'Review', description: 'Our team reviews within 2-3 business days' },
              { step: '3', title: 'Onboard', description: 'Get access to trade portal and pricing' },
              { step: '4', title: 'Create', description: 'Start sourcing art for your projects' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-andy-black text-andy-ivory rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-andy-black mb-2">{item.title}</h3>
                <p className="text-sm text-andy-bronze">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white border border-andy-stone/30 rounded-2xl p-8 text-center">
          <div className="w-8 h-px bg-andy-gold mx-auto mb-6" />
          <blockquote className="font-serif text-xl text-andy-black mb-4 italic leading-relaxed">
            "AndyArt's trade program has transformed how we source art for our clients. The team is responsive, the collection is exceptional, and the trade pricing makes high-quality art accessible."
          </blockquote>
          <cite className="text-andy-bronze not-italic text-sm">
            — Sarah Johnson, Principal Designer at Johnson Interiors
          </cite>
        </div>
      </div>
    </div>
  );
}
