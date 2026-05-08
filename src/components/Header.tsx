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

  return (
    <>
      <header
        className={`fixed top-[42px] left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[rgba(255,248,240,.78)] backdrop-blur-[18px] border-b border-black/[0.08] shadow-[0_6px_24px_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-[60px] md:h-[68px]">
            {/* Left Nav — Desktop */}
            <nav className="hidden md:flex items-center gap-9">
              {leftNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                    isActive(item.href)
                      ? 'text-[#b89249]'
                      : 'text-[#151515] hover:text-[#7b6334]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Center Logo */}
            <Link href="/" className="flex flex-col items-center scale-[1.08]">
              <span className="font-serif text-xl md:text-[22px] font-bold tracking-tight text-[#151515]">
                AndyArt
              </span>
              <span className="text-[10px] md:text-[11px] tracking-[0.18em] text-[#9f7b43] font-medium">
                Cultural House
              </span>
            </Link>

            {/* Right Nav — Desktop */}
            <nav className="hidden md:flex items-center gap-9">
              {rightNav.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                    isActive(item.href)
                      ? 'text-[#b89249]'
                      : 'text-[#151515] hover:text-[#7b6334]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/profile" className="relative">
                <User size={20} strokeWidth={2.2} className="text-[#151515]/[0.92] hover:text-[#151515] transition-colors" />
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} className="text-[#151515]" /> : <Menu size={24} className="text-[#151515]" />}
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
                className={`font-serif text-2xl tracking-wide transition-colors ${
                  isActive(item.href) ? 'text-[#b89249]' : 'text-[#151515]'
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
