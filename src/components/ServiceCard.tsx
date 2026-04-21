'use client';

import Link from 'next/link';

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
  const formatPrice = () => {
    if (priceType === 'quote') return 'Request a quote';
    if (priceType === 'hourly' && price) return `$${price}/hour`;
    if (priceType === 'fixed' && price) return `$${price}`;
    return 'Contact for pricing';
  };

  if (!isActive) return null;

  return (
    <div className="rounded-md border border-border-light bg-surface shadow-subtle p-6">
      <div className="w-14 h-14 bg-accent rounded-md flex items-center justify-center text-2xl mb-4">
        {icon}
      </div>

      <h3 className="font-serif text-xl font-semibold text-text-primary mb-2">
        {name}
      </h3>

      <p className="text-sm text-text-secondary mb-4 line-clamp-3">
        {description}
      </p>

      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-success-gold">
          {formatPrice()}
        </span>
        <Link
          href={`/services/${slug}`}
          className="bg-primary text-surface px-4 py-2 rounded-md text-sm font-medium hover:bg-text-primary transition-colors"
        >
          Book this service
        </Link>
      </div>
    </div>
  );
}
