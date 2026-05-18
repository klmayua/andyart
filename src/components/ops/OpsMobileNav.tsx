'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrendingUp, Users, Crown, CreditCard, Menu } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/ops/executive', label: 'Executive', icon: TrendingUp },
  { href: '/ops/crm', label: 'CRM', icon: Users },
  { href: '/ops/concierge', label: 'Concierge', icon: Crown },
  { href: '/ops/payments', label: 'Finance', icon: CreditCard },
  { href: '/ops', label: 'Menu', icon: Menu },
];

export default function OpsMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        height: '78px',
        background: 'rgba(14,12,11,0.92)',
        backdropFilter: 'blur(18px)',
        borderTop: '1px solid rgba(214,170,92,0.10)',
        boxShadow: '0 -8px 30px rgba(0,0,0,0.38)',
        borderRadius: '22px 22px 0 0',
        paddingBottom: 'env(safe-area-inset-bottom, 12px)',
      }}
    >
      <div className="flex items-center justify-around h-full max-w-lg mx-auto px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/ops/executive' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] py-2 px-1 rounded-xl transition-all"
              style={{
                background: isActive ? 'rgba(214,170,92,0.12)' : 'transparent',
              }}
            >
              <Icon 
                size={22} 
                strokeWidth={isActive ? 2.2 : 1.5}
                style={{
                  color: isActive ? '#D6AA5C' : '#8D7760',
                  marginBottom: '4px',
                }}
              />
              <span 
                className="text-[10px] font-medium tracking-wide"
                style={{
                  color: isActive ? '#F3E7D3' : '#7A6652',
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}