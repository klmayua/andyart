'use client';

import Link from 'next/link';
import { Paintbrush, Building, Wine, Hammer, Clipboard, GlassWater, Gift, Compass } from 'lucide-react';

interface ServiceCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceType: string;
  price: number | null;
  icon: string;
  isActive: boolean;
}

const iconMap: Record<string, any> = {
  Paintbrush,
  Building,
  Wine,
  Hammer,
  Clipboard,
  GlassWater,
  Gift,
  Compass,
};

export default function ServiceCard({
  id,
  name,
  slug,
  description,
  priceType,
  price,
  icon,
  isActive,
}: ServiceCardProps) {
  const IconComponent = iconMap[icon] || Paintbrush;

  const formatPrice = () => {
    if (priceType === 'quote') return 'Request a quote';
    if (priceType === 'hourly' && price) return `$${price}/hour`;
    if (priceType === 'fixed' && price) return `$${price}`;
    return 'Contact for pricing';
  };

  if (!isActive) return null;

  return (
    <div className="rounded-2xl border border-andy-stone/30 bg-white p-6 hover:border-andy-gold/30 hover:shadow-premium transition-all duration-500 group hover:-translate-y-1">
      <div className="w-14 h-14 rounded-xl bg-andy-stone/30 flex items-center justify-center mb-5 group-hover:bg-andy-gold/10 transition-colors">
        <IconComponent className="w-7 h-7 text-andy-bronze group-hover:text-andy-gold transition-colors" />
      </div>

      <h3 className="font-serif text-xl font-bold text-andy-black mb-2 group-hover:text-andy-bronze transition-colors">
        {name}
      </h3>

      <p className="text-sm text-andy-bronze mb-5 leading-relaxed line-clamp-3">
        {description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-andy-stone/20">
        <div>
          <span className="text-lg font-bold text-andy-gold">
            {formatPrice()}
          </span>
        </div>
        <Link
          href={`/services/${slug}`}
          className="bg-andy-black text-andy-ivory px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-andy-black/80 transition-all"
        >
          Book
        </Link>
      </div>
    </div>
  );
}
