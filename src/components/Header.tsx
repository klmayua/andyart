'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User } from 'lucide-react';

const leftNav = [
  { label: 'Home', href: '/' },
  { label: 'Collect', href: '/gallery' },
  { label: 'Experiences', href: '/events' },
  { label: 'Spaces', href: '/spaces' },
  { label: 'Artists', href: '/artists' },
];

const rightNav = [
  { label: 'Circle', href: '/circle' },
  { label: 'Journal', href: '/journal' },
  { label: 'Concierge', href: '/services' },
  { label: 'Account', href: '/profile' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  const navItemClass = (href: string) => {
    const active = isActive(href);
    return [
      'relative',
      'text-[17px]',
      'font-semibold',
      'tracking-[0.01em]',
      'transition-colors',
      'duration-300',
      active ? 'text-[#d4af6a]' : 'text-white/[0.94] hover:text-white',
    ].join(' ');
  };

  return (
    <>
      <header
        className="fixed top-[42px] left-0 right-0 z-50 bg-[rgba(15,15,15,.88)] backdrop-blur-[18px] border-b border-[rgba(212,175,106,0.20)] shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="flex items-center justify-between h-[60px] md:h-[68px]">
            {/* Left Nav — Desktop */}
            <nav className="hidden md:flex items-center gap-12">
              {leftNav.map((item) => (
                <Link key={item.label} href={item.href} className={navItemClass(item.href)}>
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-[6px] left-[16%] w-[68%] h-[2px] bg-[#d4af6a] rounded-full transition-all duration-300" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Center Logo */}
            <Link href="/" className="flex flex-col items-center scale-[1.08]">
              <span className="font-serif text-xl md:text-[22px] font-bold tracking-tight text-white">
                AndyArt
              </span>
              <span className="text-[10px] md:text-[11px] tracking-[0.18em] text-[#d4af6a] font-medium">
                Cultural House
              </span>
            </Link>

            {/* Right Nav — Desktop */}
            <nav className="hidden md:flex items-center gap-12">
              {rightNav.map((item) => (
                <Link key={item.label} href={item.href} className={navItemClass(item.href)}>
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute -bottom-[6px] left-[16%] w-[68%] h-[2px] bg-[#d4af6a] rounded-full transition-all duration-300" />
                  )}
                </Link>
              ))}
              <Link href="/profile" className="relative">
                <User size={20} strokeWidth={2.1} className="text-white/[0.94] hover:text-white transition-colors duration-300" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#111111]/98 backdrop-blur-xl md:hidden pt-[110px]">
          <nav className="flex flex-col items-center gap-8 py-12">
            {[...leftNav, ...rightNav].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-serif text-2xl tracking-wide transition-colors duration-300 ${
                  isActive(item.href) ? 'text-[#d4af6a]' : 'text-white/[0.94]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
