import ServiceCard from '@/components/ServiceCard';
import ServiceChannels from '@/components/ServiceChannels';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const services = [
  {
    id: '1',
    name: 'Art Sourcing',
    slug: 'art-sourcing',
    description: 'We source exceptional works tailored to your taste, space, and collection goals. From emerging voices to blue-chip masters.',
    priceType: 'quote',
    price: null,
    icon: 'Compass',
    isActive: true,
  },
  {
    id: '2',
    name: 'Bespoke Commissions',
    slug: 'bespoke-commissions',
    description: 'Commission a one-of-a-kind work created specifically for you. We match you with the right artist and manage the entire process.',
    priceType: 'quote',
    price: null,
    icon: 'Paintbrush',
    isActive: true,
  },
  {
    id: '3',
    name: 'Luxury Gifting',
    slug: 'luxury-gifting',
    description: 'Art as the ultimate gift. Curated, packaged, and delivered with provenance documentation and a personal note.',
    priceType: 'quote',
    price: null,
    icon: 'Gift',
    isActive: true,
  },
  {
    id: '4',
    name: 'Installation & Hanging',
    slug: 'art-installation',
    description: 'Professional installation in your home or office. Includes placement consultation, lighting advice, and all hardware.',
    priceType: 'hourly',
    price: 150,
    icon: 'Hammer',
    isActive: true,
  },
  {
    id: '5',
    name: 'Framing & Conservation',
    slug: 'framing-conservation',
    description: 'Museum-quality framing and conservation services. We partner with master framers to protect and present your works.',
    priceType: 'quote',
    price: null,
    icon: 'Clipboard',
    isActive: true,
  },
  {
    id: '6',
    name: 'Private Viewing',
    slug: 'private-viewing',
    description: 'Exclusive after-hours access to our gallery for you and your guests. Wine, canapés, and personal curation included.',
    priceType: 'fixed',
    price: 500,
    icon: 'GlassWater',
    isActive: true,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-16 pt-8">
          <p className="section-label animate-fade-in-up">White Glove Service</p>
          <h1 className="display-lg mb-6 text-[#171614] animate-fade-in-up delay-1">
            Concierge
          </h1>
          <p className="text-md max-w-2xl leading-relaxed animate-fade-in-up delay-2" style={{ color: 'rgba(93, 70, 51, 0.8)' }}>
            Sourcing, commissions, gifting, installation, framing, private viewings, and advisory.
            Our concierge team is at your service.
          </p>
        </div>

        <ServiceChannels />

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, idx) => (
            <div key={service.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>

        {/* Custom CTA */}
        <div className="mt-16 rounded-2xl p-8 text-center border" style={{ background: 'rgba(215,206,193,0.2)', borderColor: 'rgba(215,206,193,0.3)' }}>
          <h2 className="font-serif text-2xl font-bold text-[#171614] mb-4">
            Something specific in mind?
          </h2>
          <p className="mb-6 max-w-2xl mx-auto" style={{ color: 'rgba(93,70,51,0.7)' }}>
            Our concierge team handles requests that don't fit a category. Tell us what you need.
          </p>
          <Link
            href="mailto:hello@andyart.gallery"
            className="btn-postmodern-primary text-sm"
          >
            Email Concierge
          </Link>
        </div>
      </div>
    </div>
  );
}