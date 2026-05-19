'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname() || '';
  const isDarkRoute = pathname === '/' || pathname.startsWith('/circle') || pathname.startsWith('/enterprise');

  return (
    <footer
      className="pt-[68px] pb-[76px] px-4 border-t"
      style={{
        background: isDarkRoute ? '#171614' : 'var(--warm-ivory)',
        borderColor: 'rgba(23, 22, 20, 0.06)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Newsletter Section */}
        <div
          className="mb-12 pb-10"
          style={{
            borderBottom: isDarkRoute ? '1px solid rgba(255,253,249,0.06)' : '1px solid rgba(23,22,20,0.06)',
          }}
        >
          <h3
            className="font-serif text-lg font-bold mb-2 text-center"
            style={{ color: isDarkRoute ? 'var(--warm-ivory)' : 'var(--ink)' }}
          >
            Join the Circle
          </h3>
          <p
            className="text-sm text-center mb-6"
            style={{ color: isDarkRoute ? 'rgba(255,253,249,0.4)' : 'rgba(23,22,20,0.5)' }}
          >
            Collector stories, artist insights, and exclusive access.
          </p>
          <form className="flex max-w-md mx-auto gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full text-sm"
              style={{
                background: isDarkRoute ? 'rgba(255,253,249,0.08)' : 'white',
                border: `1px solid ${isDarkRoute ? 'rgba(255,253,249,0.15)' : 'rgba(23,22,20,0.1)'}`,
                color: isDarkRoute ? 'var(--warm-ivory)' : 'var(--ink)',
              }}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap"
              style={{
                background: 'var(--ink)',
                color: 'white',
              }}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-20">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5">
              <span
                className="font-serif text-[22px] font-bold tracking-tight"
                style={{ color: isDarkRoute ? 'var(--warm-ivory)' : 'var(--ink)' }}
              >
                AndyArt
              </span>
              <span
                className="block text-[10px] tracking-[0.18em] font-medium mt-1"
                style={{ color: 'var(--gold)' }}
              >
                Cultural House
              </span>
            </div>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
            >
              A premium cultural house where collecting, gathering, gifting, commissioning, and living with art converge.
            </p>
          </div>

          {/* Collect */}
          <div>
            <h4
              className="font-serif text-[13px] font-semibold mb-4 tracking-[0.04em]"
              style={{ color: isDarkRoute ? 'var(--warm-ivory)' : 'var(--ink)' }}
            >
              Collect
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link
                  href="/gallery"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  All Works
                </Link>
              </li>
              <li>
                <Link
                  href="/artists"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  Artists
                </Link>
              </li>
              <li>
                <Link
                  href="/viewing-rooms"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  Viewing Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/circle"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  Circle Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* Experience */}
          <div>
            <h4
              className="font-serif text-[13px] font-semibold mb-4 tracking-[0.04em]"
              style={{ color: isDarkRoute ? 'var(--warm-ivory)' : 'var(--ink)' }}
            >
              Experience
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link
                  href="/events"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  Upcoming
                </Link>
              </li>
              <li>
                <Link
                  href="/events/past"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  Past Events
                </Link>
              </li>
              <li>
                <Link
                  href="/events/host"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  Host an Event
                </Link>
              </li>
            </ul>
          </div>

          {/* Concierge */}
          <div>
            <h4
              className="font-serif text-[13px] font-semibold mb-4 tracking-[0.04em]"
              style={{ color: isDarkRoute ? 'var(--warm-ivory)' : 'var(--ink)' }}
            >
              Concierge
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <Link
                  href="/services"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  href="/consult"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  Private Viewing
                </Link>
              </li>
              <li>
                <Link
                  href="/spaces"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  Corporate Curation
                </Link>
              </li>
              <li>
                <Link
                  href="/partners/apply"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4
              className="font-serif text-[13px] font-semibold mb-4 tracking-[0.04em]"
              style={{ color: isDarkRoute ? 'var(--warm-ivory)' : 'var(--ink)' }}
            >
              Connect
            </h4>
            <ul className="space-y-2.5 text-[13px]">
              <li>
                <a
                  href="mailto:hello@andyart.gallery"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  hello@andyart.gallery
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/andyart"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  @andyart
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <Link
                  href="/auth/signin"
                  style={{ color: isDarkRoute ? 'rgba(255,253,249,0.35)' : 'rgba(23,22,20,0.5)' }}
                  className="hover:text-[var(--gold)] transition-colors duration-300"
                >
                  Member Access
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            borderTop: isDarkRoute ? '1px solid rgba(255,253,249,0.05)' : '1px solid rgba(23,22,20,0.05)',
          }}
        >
          <p
            className="text-[12px]"
            style={{ color: isDarkRoute ? 'rgba(255,253,249,0.25)' : 'rgba(23,22,20,0.35)' }}
          >
            &copy; 2026 AndyArt Cultural House. All rights reserved.
          </p>
          <div className="flex gap-6 text-[12px]">
            <Link
              href="/legal/terms"
              className="hover:text-[var(--gold)] transition-colors duration-300"
              style={{ color: isDarkRoute ? 'rgba(255,253,249,0.25)' : 'rgba(23,22,20,0.35)' }}
            >
              Terms
            </Link>
            <Link
              href="/legal/privacy"
              className="hover:text-[var(--gold)] transition-colors duration-300"
              style={{ color: isDarkRoute ? 'rgba(255,253,249,0.25)' : 'rgba(23,22,20,0.35)' }}
            >
              Privacy
            </Link>
            <Link
              href="/journal"
              className="hover:text-[var(--gold)] transition-colors duration-300"
              style={{ color: isDarkRoute ? 'rgba(255,253,249,0.25)' : 'rgba(23,22,20,0.35)' }}
            >
              Journal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}