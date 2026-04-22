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
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-white shadow-xl hover:shadow-2xl transition-all duration-300 p-6 group hover:scale-[1.02] hover:border-primary/30">
      {/* Icon with gold accent background */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent via-gray-100 to-accent flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-md">
        <IconComponent className="w-8 h-8 text-primary" />
      </div>

      <h3 className="font-serif text-xl font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors">
        {name}
      </h3>

      <p className="text-sm text-text-secondary mb-5 line-clamp-3">
        {description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          <span className="text-lg font-bold text-primary">
            {formatPrice()}
          </span>
        </div>
        <Link
          href={`/services/${slug}`}
          className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:scale-105"
        >
          Book this service
        </Link>
      </div>
    </div>
  );
}
