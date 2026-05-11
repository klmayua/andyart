'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const BREADCRUMB_MAP: Record<string, string> = {
  'ops': 'Operations',
  'crm': 'CRM',
  'leads': 'Leads',
  'pipeline': 'Pipeline',
  'subscribers': 'Subscribers',
  'insights': 'Insights',
  'concierge': 'Concierge',
  'requests': 'Requests',
  'bookings': 'Bookings',
  'commissions': 'Commissions',
  'corporate': 'Corporate',
  'vip': 'VIP Clients',
  'payments': 'Payments',
  'invoices': 'Invoices',
  'escrow': 'Escrow',
  'settlements': 'Settlements',
  'executive': 'Executive',
  'auth': 'Auth',
  'signin': 'Sign In',
  'collector': 'Collector',
  'profile': 'Profile',
  'collection': 'Collection',
  'acquisitions': 'Acquisitions',
  'certificates': 'Certificates',
  'viewings': 'Viewings',
  'wishlist': 'Wishlist',
  'vault': 'Vault',
  'transactions': 'Transactions',
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  if (!pathname || pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return null;

  const items = segments.map((seg, idx) => {
    const path = '/' + segments.slice(0, idx + 1).join('/');
    const label = BREADCRUMB_MAP[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return { path, label, isLast: idx === segments.length - 1 };
  });

  return (
    <nav className="flex items-center gap-1 text-xs text-andy-bronze mb-4">
      <Link href="/" className="flex items-center gap-1 hover:text-andy-gold transition-colors">
        <Home size={12} />
      </Link>
      {items.map((item) => (
        <span key={item.path} className="flex items-center gap-1">
          <ChevronRight size={12} className="text-andy-bronze/30" />
          {item.isLast ? (
            <span className="text-andy-black font-medium">{item.label}</span>
          ) : (
            <Link href={item.path} className="hover:text-andy-gold transition-colors">{item.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}