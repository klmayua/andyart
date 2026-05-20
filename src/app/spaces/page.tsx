import Link from 'next/link';
import Image from 'next/image';
import { Building2, Briefcase, Gift, RotateCcw, Paintbrush, Phone, Mail, ArrowRight } from 'lucide-react';

const offerings = [
  {
    icon: Building2,
    title: 'Office Curation',
    description: 'Elevate your workplace with art that inspires creativity, signals culture, and impresses clients from the moment they enter.',
    features: ['Curated selection', 'Installation included', 'Rotation programs'],
  },
  {
    icon: Briefcase,
    title: 'Hospitality Curation',
    description: 'Hotels, restaurants, and lounges deserve art that creates atmosphere and becomes part of the guest experience.',
    features: ['Ambient storytelling', 'Durable framing', 'Seasonal refresh'],
  },
  {
    icon: Gift,
    title: 'Executive Suites',
    description: 'Private offices and boardrooms require statements of ambition. We source and place works that reflect leadership.',
    features: ['Statement pieces', 'Provenance documentation', 'Insurance support'],
  },
  {
    icon: RotateCcw,
    title: 'Rotating Leasing',
    description: 'Keep your spaces fresh with quarterly or biannual rotations. A living collection without the commitment of ownership.',
    features: ['Flexible terms', 'White-glove handling', 'Curated rotations'],
  },
  {
    icon: Paintbrush,
    title: 'Bespoke Installations',
    description: 'Commission site-specific works designed for your architecture, brand values, and spatial narrative.',
    features: ['Artist matching', 'Concept development', 'Full project management'],
  },
  {
    icon: Gift,
    title: 'Luxury Gifting',
    description: 'Art as corporate gifting. Curated, packaged, and delivered with a personal note and provenance card.',
    features: ['Personal curation', 'Elegant packaging', 'Global delivery'],
  },
];

const caseStudies = [
  {
    client: 'Meridian Holdings',
    location: 'Lagos, Nigeria',
    scope: '12-floor headquarters, 48 works',
    result: 'Employee satisfaction up 23%. Client retention improved.',
  },
  {
    client: 'The Olive Hotel',
    location: 'Accra, Ghana',
    scope: 'Rotating leasing, 120 works annually',
    result: 'Guest experience rating increased by 1.2 stars.',
  },
];

export default function SpacesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero - Dark Theme */}
      <section
        className="relative h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden"
        style={{ background: '#171614' }}
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
            alt="Spaces by AndyArt"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171614] via-[#171614]/60 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="section-label animate-fade-in-up" style={{ color: '#C6A66B' }}>B2B Art Curation</p>
          <h1 className="display-lg text-white mb-6 animate-fade-in-up delay-1">
            Spaces by AndyArt
          </h1>
          <p className="text-md max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-2" style={{ color: 'rgba(255,253,249,0.6)' }}>
            Art environments for offices, hospitality, and executive spaces. We don't decorate. We curate culture.
          </p>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-20 md:py-28 px-4" style={{ background: 'var(--warm-ivory)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label" style={{ color: '#A78345' }}>What We Offer</p>
            <h1 className="display-md mb-4 text-[#171614]">
              Curated for scale
            </h1>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {offerings.map((offering, idx) => (
              <div
                key={offering.title}
                className="group bg-white rounded-2xl p-8 border card-postmodern animate-fade-in-up"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                  borderColor: 'rgba(23,22,20,0.06)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors"
                  style={{ background: 'rgba(215,206,193,0.3)' }}
                >
                  <offering.icon
                    size={22}
                    className="text-[#A78345] group-hover:text-[#C6A66B] transition-colors"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#171614] mb-3">{offering.title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(93,70,51,0.8)' }}>{offering.description}</p>
                <div className="flex flex-wrap gap-2">
                  {offering.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-3 py-1 rounded-full"
                      style={{ background: 'rgba(23,22,20,0.06)', color: '#5D4633' }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 md:py-28 px-4" style={{ background: 'rgba(215,206,193,0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label" style={{ color: '#A78345' }}>Results</p>
            <h1 className="display-md mb-4 text-[#171614]">
              Spaces transformed
            </h1>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((cs, idx) => (
              <div
                key={cs.client}
                className="bg-white rounded-2xl p-8 border card-postmodern animate-fade-in-up"
                style={{
                  animationDelay: `${idx * 0.1}s`,
                  borderColor: 'rgba(23,22,20,0.06)',
                }}
              >
                <div className="w-12 h-px mb-6" style={{ background: '#C6A66B' }} />
                <h3 className="font-serif text-2xl font-bold text-[#171614] mb-2">{cs.client}</h3>
                <p className="text-sm mb-5" style={{ color: '#A78345' }}>{cs.location}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-[#171614]"><span className="font-medium">Scope:</span> {cs.scope}</p>
                  <p className="text-sm text-[#171614]"><span className="font-medium">Result:</span> {cs.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section
        className="py-20 md:py-28 px-4"
        style={{ background: '#171614' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label" style={{ color: '#C6A66B' }}>Begin the Conversation</p>
          <h1 className="display-md mb-6 text-white">
            Let's curate your space
          </h1>
          <p className="text-md max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,253,249,0.6)' }}>
            Tell us about your project. We'll respond within one business day with a tailored proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consult"
              className="btn-postmodern-gold text-base px-8 py-4 inline-flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Request Consultation
            </Link>
            <a
              href="mailto:hello@andyart.gallery"
              className="btn-postmodern text-base px-8 py-4 inline-flex items-center justify-center gap-2"
              style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              <Mail size={18} />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}