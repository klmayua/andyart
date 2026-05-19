'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Artists', href: '/artists' },
  { label: 'Events', href: '/events' },
  { label: 'Services', href: '/services' },
  { label: 'Spaces', href: '/spaces' },
  { label: 'Circle', href: '/circle' },
  { label: 'Journal', href: '/journal' },
];

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
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
      <nav
        className="nav-floating-container"
        style={{
          background: scrolled
            ? 'rgba(247, 242, 232, 0.95)'
            : 'rgba(247, 242, 232, 0.85)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
        }}
      >
        {/* Brand */}
        <Link href="/" className="flex flex-col items-center">
          <span
            className="font-serif text-[22px] font-semibold tracking-tight"
            style={{ color: 'var(--ink)' }}
          >
            Andy<span style={{ color: 'var(--gold)' }}>Art</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center" style={{ gap: '24px' }}>
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-floating-link"
              style={{
                color: isActive(item.href) ? 'var(--gold)' : 'var(--soft-black)',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center" style={{ gap: '12px' }}>
          <button
            className="icon-btn"
            style={{
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'transparent',
              border: '1px solid rgba(23, 22, 20, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
            aria-label="Search"
          >
            <Search size={18} style={{ color: 'var(--soft-black)' }} />
          </button>
          <Link
            href="/auth/signin"
            className="btn-signin"
            style={{
              padding: '10px 20px',
              fontSize: '0.8rem',
              background: 'var(--ink)',
              color: 'white',
              borderRadius: '100px',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
            }}
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2"
          aria-label="Toggle menu"
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: 'transparent',
            border: '1px solid rgba(23, 22, 20, 0.1)',
          }}
        >
          {mobileOpen ? (
            <X size={20} style={{ color: 'var(--ink)' }} />
          ) : (
            <Menu size={20} style={{ color: 'var(--ink)' }} />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[999] lg:hidden"
          style={{
            background: 'rgba(17, 15, 12, 0.98)',
            backdropFilter: 'blur(28px)',
            paddingTop: '100px',
          }}
        >
          <nav className="flex flex-col items-center gap-8 py-12">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-serif text-2xl tracking-wide transition-colors duration-300"
                style={{
                  color: isActive(item.href) ? 'var(--gold)' : 'var(--warm-ivory)',
                }}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-4 mt-8">
              <Link
                href="/auth/signin"
                className="font-serif text-xl"
                style={{ color: 'var(--warm-ivory)' }}
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}