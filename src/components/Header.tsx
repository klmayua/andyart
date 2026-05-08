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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      'font-[550]',
      'tracking-[0.01em]',
      'transition-colors',
      'duration-300',
      active ? 'text-[#c39a56]' : 'text-[#111111]/[0.95] hover:text-[#8c6a34]',
    ].join(' ');
  };

  return (
    <>
      <header
        className={`fixed top-[42px] left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[rgba(248,244,236,.78)] backdrop-blur-[24px] border-b border-black/[0.06] shadow-[0_10px_34px_rgba(0,0,0,0.08)]'
            : 'bg-transparent'
        }`}
        style={isScrolled ? {
          background: 'linear-gradient(to bottom, rgba(248,244,236,0.85) 0%, rgba(248,244,236,0.78) 100%)',
        } : undefined}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="flex items-center justify-between h-[60px] md:h-[68px]">
            {/* Left Nav — Desktop */}
            <nav className="hidden md:flex items-center gap-12">
              {leftNav.map((item) => (
                <Link key={item.label} href={item.href} className={navItemClass(item.href)}>
                  <span
                    className="relative"
                    style={{ textShadow: '0 1px 0 rgba(255,255,255,0.18)' }}
                  >
                    {item.label}
                  </span>
                  {isActive(item.href) && (
                    <span
                      className="absolute -bottom-[6px] left-[16%] w-[68%] h-[2px] bg-[#c39a56] rounded-full transition-all duration-300"
                      style={{ boxShadow: '0 0 8px rgba(195,154,86,0.35)' }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Center Logo */}
            <Link href="/" className="flex flex-col items-center scale-[1.08]">
              <span className="font-serif text-xl md:text-[22px] font-bold tracking-tight text-[#111111]">
                AndyArt
              </span>
              <span className="text-[10px] md:text-[11px] tracking-[0.18em] text-[#a27a3e] font-medium">
                Cultural House
              </span>
            </Link>

            {/* Right Nav — Desktop */}
            <nav className="hidden md:flex items-center gap-12">
              {rightNav.map((item) => (
                <Link key={item.label} href={item.href} className={navItemClass(item.href)}>
                  <span
                    className="relative"
                    style={{ textShadow: '0 1px 0 rgba(255,255,255,0.18)' }}
                  >
                    {item.label}
                  </span>
                  {isActive(item.href) && (
                    <span
                      className="absolute -bottom-[6px] left-[16%] w-[68%] h-[2px] bg-[#c39a56] rounded-full transition-all duration-300"
                      style={{ boxShadow: '0 0 8px rgba(195,154,86,0.35)' }}
                    />
                  )}
                </Link>
              ))}
              <Link href="/profile" className="relative">
                <User size={20} strokeWidth={2.1} className="text-[#111111]/[0.95] hover:text-[#111111] transition-colors duration-300" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} className="text-[#111111]" /> : <Menu size={24} className="text-[#111111]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#fbf8f2]/98 backdrop-blur-xl md:hidden pt-[110px]">
          <nav className="flex flex-col items-center gap-8 py-12">
            {[...leftNav, ...rightNav].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`font-serif text-2xl tracking-wide transition-colors duration-300 ${
                  isActive(item.href) ? 'text-[#c39a56]' : 'text-[#111111]'
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
