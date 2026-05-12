'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Calendar, Wrench, MessageCircle } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { useSurfaceGuard } from '@/hooks/useSurfaceGuard';

export default function BottomNav() {
  const pathname = usePathname();
  const { isPublicSurface } = useSurfaceGuard();
  const store = useAppStore();
  const openChat = store?.openChat ?? (() => {});

  // Relabeled per brand spec — routes preserved
  const navItems = [
    {
      icon: Home,
      label: 'Home',
      link: '/',
    },
    {
      icon: LayoutGrid,
      label: 'Collect',
      link: '/gallery',
    },
    {
      icon: Calendar,
      label: 'Experiences',
      link: '/events',
    },
    {
      icon: Wrench,
      label: 'Concierge',
      link: '/services',
    },
    {
      icon: MessageCircle,
      label: 'Circle',
      action: 'openChatbot',
    },
  ];

  const handleClick = (item: (typeof navItems)[0]) => {
    if (item.action === 'openChatbot') {
      openChat();
    }
  };

  // Hide on protected surfaces and checkout pages
  if (!isPublicSurface || pathname?.includes('/api')) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[70px] bg-white/90 backdrop-blur-xl border-t border-andy-stone/40 z-50 md:hidden">
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
                  ? 'text-andy-black'
                  : 'text-text-secondary hover:text-andy-black'
              }`}
            >
              {item.link ? (
                <Link
                  href={item.link}
                  className="flex flex-col items-center"
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} className={isActive ? 'text-andy-gold' : ''} />
                  <span className="text-[10px] mt-1 font-medium tracking-wide">{item.label}</span>
                </Link>
              ) : (
                <>
                  <Icon size={22} strokeWidth={1.5} />
                  <span className="text-[10px] mt-1 font-medium tracking-wide">{item.label}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
