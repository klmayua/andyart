import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Building2, Briefcase, Gift, RotateCcw, Paintbrush, Phone, Mail, Download } from 'lucide-react';

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
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-andy-black">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920"
          alt="Spaces by AndyArt"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 cinematic-overlay" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-andy-gold text-xs uppercase tracking-[0.3em] mb-4 font-medium">B2B Art Curation</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-andy-ivory mb-4 editorial-headline">
            Spaces by AndyArt
          </h1>
          <p className="text-base md:text-lg text-andy-ivory/60 max-w-2xl mx-auto leading-relaxed">
            Art environments for offices, hospitality, and executive spaces. We don't decorate. We curate culture.
          </p>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-20 md:py-28 px-4 bg-andy-ivory">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-3 font-medium">What We Offer</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-andy-black editorial-headline">
              Curated for scale
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((offering) => (
              <div key={offering.title} className="group bg-white rounded-2xl p-8 border border-andy-stone/30 hover:border-andy-gold/30 hover:shadow-premium transition-all duration-500">
                <div className="w-12 h-12 rounded-xl bg-andy-stone/40 flex items-center justify-center mb-5 group-hover:bg-andy-gold/10 transition-colors">
                  <offering.icon size={22} className="text-andy-bronze group-hover:text-andy-gold transition-colors" />
                </div>
                <h3 className="font-serif text-xl font-bold text-andy-black mb-2">{offering.title}</h3>
                <p className="text-sm text-andy-bronze leading-relaxed mb-4">{offering.description}</p>
                <div className="flex flex-wrap gap-2">
                  {offering.features.map((f) => (
                    <span key={f} className="text-xs bg-andy-stone/20 text-andy-bronze px-3 py-1 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 md:py-28 px-4 tactile-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-3 font-medium">Results</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-andy-black editorial-headline">
              Spaces transformed
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((cs) => (
              <div key={cs.client} className="bg-white rounded-2xl p-8 border border-andy-stone/30">
                <div className="w-8 h-px bg-andy-gold mb-6" />
                <h3 className="font-serif text-2xl font-bold text-andy-black mb-1">{cs.client}</h3>
                <p className="text-sm text-andy-bronze mb-4">{cs.location}</p>
                <div className="space-y-2 mb-6">
                  <p className="text-sm text-andy-black"><span className="font-medium">Scope:</span> {cs.scope}</p>
                  <p className="text-sm text-andy-black"><span className="font-medium">Result:</span> {cs.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture */}
      <section className="py-20 md:py-28 px-4 bg-andy-black text-andy-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-andy-gold text-xs uppercase tracking-[0.25em] mb-3 font-medium">Begin the Conversation</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold editorial-headline mb-6">
            Let's curate your space
          </h2>
          <p className="text-andy-ivory/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Tell us about your project. We'll respond within one business day with a tailored proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consult"
              className="bg-andy-gold text-andy-black px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-andy-ivory transition-all inline-flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              Request Consultation
            </Link>
            <a
              href="mailto:hello@andyart.gallery"
              className="border border-andy-ivory/30 text-andy-ivory px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-andy-ivory/10 transition-all inline-flex items-center justify-center gap-2"
            >
              <Mail size={16} />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
