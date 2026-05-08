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
      'font-[580]',
      'tracking-[0.005em]',
      'transition-colors',
      'duration-[220ms]',
      'ease-out',
      active ? 'text-[#C6A66B]' : 'text-[#F7F2E8] hover:text-white',
    ].join(' ');
  };

  return (
    <>
      <header
        className="fixed top-[52px] left-0 right-0 z-[100] h-[78px]"
        style={{
          background: 'rgba(42,31,22,.34)',
          backdropFilter: 'blur(28px) saturate(165%)',
          WebkitBackdropFilter: 'blur(28px) saturate(165%)',
          border: '1px solid rgba(255,255,255,.14)',
          boxShadow: '0 12px 42px rgba(0,0,0,.14), inset 0 1px 0 rgba(255,255,255,.18)',
        }}
      >
        {/* Sheen overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,.08) 0%, rgba(255,255,255,.01) 100%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-8 md:px-12 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left Nav — Desktop */}
            <nav className="hidden md:flex items-center" style={{ gap: '52px' }}>
              {leftNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={navItemClass(item.href)}
                  style={{
                    textShadow: '0 1px 2px rgba(0,0,0,.18)',
                  }}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span
                      className="absolute left-[17.5%] w-[65%] h-[2px] bg-[#C6A66B] rounded-full"
                      style={{ bottom: '-12px' }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Center Logo */}
            <Link href="/" className="flex flex-col items-center scale-[1.08]">
              <span className="font-serif text-xl md:text-[22px] font-[650] tracking-tight text-white">
                AndyArt
              </span>
              <span
                className="text-[10px] md:text-[11px] tracking-[0.08em] text-[#C6A66B] font-[520]"
                style={{ opacity: 0.96 }}
              >
                Cultural House
              </span>
            </Link>

            {/* Right Nav — Desktop */}
            <nav className="hidden md:flex items-center" style={{ gap: '52px' }}>
              {rightNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={navItemClass(item.href)}
                  style={{
                    textShadow: '0 1px 2px rgba(0,0,0,.18)',
                  }}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span
                      className="absolute left-[17.5%] w-[65%] h-[2px] bg-[#C6A66B] rounded-full"
                      style={{ bottom: '-12px' }}
                    />
                  )}
                </Link>
              ))}
              <Link href="/profile" className="relative">
                <User
                  size={20}
                  strokeWidth={2.2}
                  className="text-[#F7F2E8] hover:text-white transition-colors duration-300"
                  style={{ opacity: 0.95 }}
                />
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
        <div
          className="fixed inset-0 z-40 md:hidden pt-[116px]"
          style={{
            background: 'rgba(17,15,12,.96)',
            backdropFilter: 'blur(28px)',
          }}
        >
          <nav className="flex flex-col items-center gap-8 py-12">
            {[...leftNav, ...rightNav].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-serif text-2xl tracking-wide transition-colors duration-300 ${
                  isActive(item.href) ? 'text-[#C6A66B]' : 'text-[#F7F2E8]'
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
