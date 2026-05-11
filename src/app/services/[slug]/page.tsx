'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ChevronLeft, CheckCircle, Paintbrush, Building, Wine, Hammer, Clipboard, GlassWater, Compass, Gift } from 'lucide-react';
import { getServiceBySlug } from '@/data/services';
import { useConversionModal } from '@/hooks/useConversionModal';
import { useAnalytics } from '@/hooks/useAnalytics';

const iconMap: Record<string, React.ElementType> = {
  Paintbrush,
  Building,
  Wine,
  Hammer,
  Clipboard,
  GlassWater,
  Compass,
  Gift,
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) notFound();

  const { openCommission, openConcierge } = useConversionModal();
  const { track } = useAnalytics();

  const Icon = iconMap[service.icon] || Paintbrush;

  const formatPrice = () => {
    if (service.priceType === 'quote') return 'Custom Quote';
    if (service.priceType === 'hourly' && service.price) return `$${service.price}/hour`;
    if (service.priceType === 'fixed' && service.price) return `$${service.price.toLocaleString()}`;
    return 'Contact for pricing';
  };

  

  return (
    <div className="min-h-screen pt-24 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/services" className="inline-flex items-center gap-2 text-andy-bronze hover:text-andy-black mb-8 text-sm transition-colors">
          <ChevronLeft size={18} />
          Back to Concierge
        </Link>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2 space-y-6">
            {/* Icon and Title */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-andy-stone/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Icon size={28} className="text-andy-bronze" />
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-andy-black editorial-headline">
                  {service.name}
                </h1>
                <p className="text-lg text-andy-gold font-semibold mt-1">{formatPrice()}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-andy-bronze leading-[1.8] whitespace-pre-line">{service.description}</p>

            {/* Details */}
            <div className="space-y-4">
              <h2 className="font-serif text-xl font-semibold text-andy-black">Service Details</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="text-andy-gold" size={20} />
                  <span className="text-andy-bronze text-sm">{service.duration}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-andy-gold" size={20} />
                  <span className="text-andy-bronze text-sm">{service.availability}</span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-andy-stone/20 rounded-2xl p-6 border border-andy-stone/20">
              <h2 className="font-serif text-xl font-semibold text-andy-black mb-4">What&apos;s Included</h2>
              <ul className="space-y-3">
                {service.includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-andy-gold mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-andy-bronze text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Booking Card */}
          <div className="md:col-span-1">
            <div className="bg-white border border-andy-stone/30 rounded-2xl p-6 sticky top-24">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-andy-bronze mb-1">Starting at</p>
                  <p className="text-3xl font-bold text-andy-gold">{formatPrice()}</p>
                </div>

                <button
                  onClick={() => { track('service_book', { page: 'service_detail', slug: service.slug, serviceName: service.name }); openCommission({ serviceName: service.name, serviceSlug: service.slug }); }}
                  className="w-full bg-andy-black text-andy-ivory py-3 rounded-full font-medium hover:bg-andy-black/80 transition-all text-sm"
                >
                  Book this service
                </button>

                <button
                  onClick={() => { track('service_call_concierge', { page: 'service_detail', slug: service.slug, channel: 'whatsapp' }); openConcierge({ context: `Service inquiry: ${service.name}` }); }}
                  className="w-full text-center text-xs text-andy-bronze hover:text-andy-gold transition-colors pt-1"
                >
                  Chat with Concierge first
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


