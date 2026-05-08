import ServiceCard from '@/components/ServiceCard';
import { Paintbrush, Building, Wine, Hammer, Clipboard, GlassWater, Phone, MessageCircle, Calendar, Compass, Gift } from 'lucide-react';

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

const channels = [
  { icon: MessageCircle, label: 'Circle Chat', desc: 'Instant concierge', href: '#' },
  { icon: Phone, label: 'WhatsApp', desc: '+234 800 ANDY ART', href: 'https://wa.me/2348002649278' },
  { icon: Calendar, label: 'Callback', desc: 'Schedule a call', href: '/consult' },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-2 font-medium">White Glove Service</p>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-andy-black editorial-headline mb-3">
            Concierge
          </h1>
          <p className="text-andy-bronze max-w-xl leading-relaxed">
            Sourcing, commissions, gifting, installation, framing, private viewings, and advisory. 
            Our concierge team is at your service.
          </p>
        </div>

        {/* Channels */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {channels.map((ch) => (
            <a
              key={ch.label}
              href={ch.href}
              target={ch.href.startsWith('http') ? '_blank' : undefined}
              rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="bg-white rounded-xl p-5 border border-andy-stone/30 hover:border-andy-gold/30 hover:shadow-premium transition-all text-center"
            >
              <ch.icon size={20} className="mx-auto mb-2 text-andy-bronze" />
              <p className="text-sm font-semibold text-andy-black">{ch.label}</p>
              <p className="text-xs text-andy-bronze">{ch.desc}</p>
            </a>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>

        {/* Custom CTA */}
        <div className="mt-12 bg-andy-stone/30 rounded-2xl p-8 text-center border border-andy-stone/20">
          <h2 className="font-serif text-2xl font-bold text-andy-black mb-4">
            Something specific in mind?
          </h2>
          <p className="text-andy-bronze mb-6 max-w-2xl mx-auto">
            Our concierge team handles requests that don't fit a category. Tell us what you need.
          </p>
          <a
            href="mailto:hello@andyart.gallery"
            className="bg-andy-black text-andy-ivory px-8 py-3 rounded-full font-medium hover:bg-andy-black/80 transition-colors inline-block text-sm"
          >
            Email Concierge
          </a>
        </div>
      </div>
    </div>
  );
}
