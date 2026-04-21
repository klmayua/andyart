'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAppStore } from '@/stores/useAppStore';
import { LayoutGrid, Calendar, Wrench, User, MessageCircle } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const store = useAppStore();
  const openChat = store?.openChat ?? (() => {});

  const navItems = [
    {
      icon: LayoutGrid,
      label: 'Gallery',
      link: '/gallery',
    },
    {
      icon: Calendar,
      label: 'Events',
      link: '/events',
    },
    {
      icon: Wrench,
      label: 'Services',
      link: '/services',
    },
    {
      icon: MessageCircle,
      label: 'Chat',
      action: 'openChatbot',
    },
    {
      icon: User,
      label: 'Profile',
      link: '/profile',
    },
  ];

  const handleClick = (item: (typeof navItems)[0]) => {
    if (item.action === 'openChatbot') {
      openChat();
    }
  };

  // Hide on checkout pages
  if (pathname?.includes('/checkout') || pathname?.includes('/api')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[70px] bg-white/95 backdrop-blur-md border-t border-border-light z-50">
      <div className="flex items-center justify-around h-full max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive =
            item.link && pathname?.startsWith(item.link);
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => handleClick(item)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive
                  ? 'text-success-gold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {item.link ? (
                <Link
                  href={item.link}
                  className="flex flex-col items-center"
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-success-gold' : ''} />
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </Link>
              ) : (
                <>
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-success-gold' : ''} />
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
