'use client';

import Link from 'next/link';
import { Paintbrush, Building, Wine, Hammer, Clipboard, GlassWater } from 'lucide-react';

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
    <div className="rounded-xl border border-white/20 bg-surface shadow-subtle p-6">
      <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mb-4">
        <IconComponent className="w-7 h-7 text-primary" />
      </div>

      <h3 className="font-serif text-xl font-semibold text-primary mb-2">
        {name}
      </h3>

      <p className="text-sm text-text-secondary mb-4 line-clamp-3">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-primary">
          {formatPrice()}
        </span>
        <Link
          href={`/services/${slug}`}
          className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-primary/80 transition-all"
        >
          Book this service
        </Link>
      </div>
    </div>
  );
}
