import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Gem, Shield, Sparkles, Palette, Calendar, Building2, Wine, Users, Brush, Compass, Heart, Eye } from 'lucide-react';
import { IMAGES } from '@/lib/images';

const trustStrip = [
  { icon: Gem, label: 'Curated Originals' },
  { icon: Shield, label: 'Bespoke Commissions' },
  { icon: Star, label: 'Collector Concierge' },
  { icon: Sparkles, label: 'Cultural Experiences' },
  { icon: Building2, label: 'Corporate Curation' },
];

const personaCards = [
  { title: 'Collect', desc: 'Acquire exceptional works', href: '/gallery', icon: Palette },
  { title: 'Experience', desc: 'Gather beautifully', href: '/events', icon: Wine },
  { title: 'Transform Spaces', desc: 'Curate environments', href: '/spaces', icon: Building2 },
  { title: 'Commission', desc: 'Bespoke artistic creation', href: '/consult', icon: Brush },
  { title: 'Join Circle', desc: 'Prestige membership', href: '/circle', icon: Star },
];

const collectionPillars = [
  { name: 'Heritage Collection', desc: 'Timeless works rooted in tradition', image: IMAGES.artworks[0]?.image },
  { name: 'Contemporary Collection', desc: 'Bold voices of today', image: IMAGES.artworks[1]?.image },
  { name: 'New Luxury Collection', desc: 'Emerging masters', image: IMAGES.artworks[2]?.image },
  { name: 'Family Living Collection', desc: 'Art for everyday beauty', image: IMAGES.artworks[3]?.image },
  { name: 'Corporate Prestige Collection', desc: 'Statements of ambition', image: IMAGES.artworks[4]?.image },
];

const experiences = [
  { title: 'Art and Wine Evenings', image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800' },
  { title: 'Collector Salons', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800' },
  { title: 'Artist Conversations', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800' },
  { title: 'Luxury Paint Sessions', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800' },
];

const testimonials = [
  {
    quote: "AndyArt didn't just sell me a painting. They introduced me to a story I now live with every day.",
    name: 'Amara Okafor',
    title: 'Private Collector, Lagos',
  },
  {
    quote: "The corporate curation transformed our executive floor. Clients notice. Our people feel it.",
    name: 'David Mensah',
    title: 'CEO, Meridian Holdings',
  },
  {
    quote: "Circle membership gave me access to artists I would never have discovered on my own.",
    name: 'Priya Naidoo',
    title: 'Circle Black Member',
  },
];

const journalTeasers = [
  { category: 'Artist Stories', title: 'The Quiet Revolution of Ngozi Okeke', excerpt: 'How one sculptor is redefining bronze for a new generation of collectors.' },
  { category: 'Living With Art', title: 'Curating Light: A Collector\'s Guide', excerpt: 'The overlooked art of placing works where morning light becomes part of the composition.' },
  { category: 'Collector Guides', title: 'First Acquisition: Where to Begin', excerpt: 'A thoughtful framework for buying your first serious piece without second-guessing.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* HERO CINEMATIC */}
      <section className="relative h-[92vh] min-h-[640px] flex items-center justify-center overflow-hidden">
        <Image
          src={IMAGES.hero}
          alt="AndyArt Cultural House"
          fill
          className="object-cover hero-image"
          priority
        />
        {/* Refined overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.18)] via-[rgba(0,0,0,0.34)] to-[rgba(0,0,0,0.42)]" />
        <div className="absolute inset-0 hero-vignette" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p
            className="text-[#d4af6a] text-[13px] md:text-sm tracking-[0.08em] mb-6 font-medium"
            style={{ opacity: 0.95 }}
          >
            Premium African Art & Cultural Living
          </p>
          <h1
            className="font-serif text-4xl md:text-6xl lg:text-[76px] font-bold text-white mb-6 leading-[1.02] editorial-headline"
            style={{ textShadow: '0 8px 30px rgba(0,0,0,0.25)' }}
          >
            Collect culture.
            <br />
            <span style={{ color: 'rgba(255,255,255,0.82)' }}>Live beautifully.</span>
            <br />
            Leave legacy.
          </h1>
          <p className="text-base md:text-lg text-white/[0.92] mb-10 max-w-[720px] mx-auto leading-[1.7] font-normal">
            Premium African art, curated experiences, bespoke commissions, and timeless cultural living for every generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/gallery"
              className="bg-[#caa25d] text-[#111111] px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide hover:brightness-105 transition-all shadow-[0_10px_30px_rgba(202,162,93,0.25)] inline-flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/consult"
              className="bg-[rgba(255,255,255,0.08)] text-white border border-[rgba(255,255,255,0.28)] backdrop-blur-[8px] px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide hover:bg-[rgba(255,255,255,0.14)] transition-all inline-flex items-center justify-center"
            >
              Book Private Viewing
            </Link>
            <Link
              href="/circle"
              className="bg-transparent text-white border border-[rgba(255,255,255,0.18)] px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide hover:bg-[rgba(255,255,255,0.06)] transition-all inline-flex items-center justify-center"
            >
              Join Circle
            </Link>
          </div>

          {/* Trust Strip */}
          <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-12">
            {trustStrip.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <item.icon size={18} className="text-[#d4af6a]" />
                <span className="text-[13px] text-white/[0.90] tracking-wide font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONA GATEWAY */}
      <section className="py-24 md:py-32 px-4 surface-warm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9f7b43] text-[13px] tracking-[0.04em] mb-3 font-medium">How we serve</p>
            <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#111111] editorial-headline leading-[1.1]">
              Five ways to begin
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:gap-6">
            {personaCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative bg-white rounded-2xl p-7 md:p-8 border border-[rgba(0,0,0,0.05)] shadow-[0_14px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-[6px] hover:border-[rgba(202,162,93,0.28)]"
              >
                <div className="w-14 h-14 rounded-xl bg-[#f6f1e8] flex items-center justify-center mb-5 group-hover:bg-[rgba(202,162,93,0.10)] transition-colors duration-500">
                  <card.icon size={24} className="text-[#b89249] group-hover:text-[#9f7b43] transition-colors duration-500" />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#111111] mb-1">{card.title}</h3>
                <p className="text-[13px] text-[#5c5c5c] leading-relaxed">{card.desc}</p>
                <div className="mt-5 w-10 h-px bg-[#e7e1d6] group-hover:w-14 group-hover:bg-[#caa25d] transition-all duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <section className="py-24 md:py-32 px-4 surface-rich">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[#9f7b43] text-[13px] tracking-[0.04em] mb-3 font-medium">Curated Selection</p>
              <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#111111] editorial-headline leading-[1.1]">
                Featured Works
              </h2>
            </div>
            <Link href="/gallery" className="hidden md:flex items-center gap-2 text-[#2b2b2b] font-medium text-sm hover:text-[#9f7b43] transition-colors duration-300">
              View Collection <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
            {IMAGES.artworks.slice(0, 3).map((artwork, index) => (
              <Link key={artwork.id} href={`/gallery/${artwork.title.toLowerCase().replace(/\s+/g, '-')}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#e7e1d6]/50 mb-5 shadow-[0_8px_24px_rgba(0,0,0,0.06)] group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.10)] transition-shadow duration-500">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.35)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-subtle">
                      <Heart size={16} className="text-[#111111]" />
                    </div>
                  </div>
                </div>
                <h3 className="font-serif text-base font-semibold text-[#111111] group-hover:text-[#9f7b43] transition-colors duration-300">
                  {artwork.title}
                </h3>
                <p className="text-sm text-[#5c5c5c]">{index % 2 === 0 ? 'Ngozi Okeke' : 'Kofi Asante'}</p>
                <p className="text-sm font-semibold text-[#caa25d] mt-1">
                  {index % 3 === 0 ? 'Price on request' : `$${(index + 1) * 2500}`}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-[#2b2b2b] font-medium text-sm">
              View Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* HERITAGE / MODERN BRIDGE */}
      <section className="py-24 md:py-32 px-4 bg-[#111111] text-[#fbf8f2]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#d4af6a] text-[13px] tracking-[0.04em] mb-3 font-medium">Our Curation Philosophy</p>
            <h2 className="font-serif text-3xl md:text-[44px] font-bold editorial-headline leading-[1.1]">
              Heritage informs.
              <br />
              <span className="text-[#fbf8f2]/70">Modern excites.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {collectionPillars.map((pillar) => (
              <div key={pillar.name} className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer">
                <Image
                  src={pillar.image || IMAGES.hero}
                  alt={pillar.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  sizes="20vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.25)] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="w-8 h-px bg-[#caa25d] mb-3" />
                  <h3 className="font-serif text-lg font-bold text-[#fbf8f2] mb-1">{pillar.name}</h3>
                  <p className="text-xs text-[#fbf8f2]/55 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE EXPERIENCES */}
      <section className="py-24 md:py-32 px-4 surface-warm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[#9f7b43] text-[13px] tracking-[0.04em] mb-3 font-medium">Gatherings</p>
              <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#111111] editorial-headline leading-[1.1]">
                AndyArt Experiences
              </h2>
            </div>
            <Link href="/events" className="hidden md:flex items-center gap-2 text-[#2b2b2b] font-medium text-sm hover:text-[#9f7b43] transition-colors duration-300">
              All Experiences <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {experiences.map((exp) => (
              <Link key={exp.title} href="/events" className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.10)] transition-shadow duration-500">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.70)] via-[rgba(0,0,0,0.15)] to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-lg font-bold text-[#fbf8f2]">{exp.title}</h3>
                  <div className="mt-2 flex items-center gap-2 text-[#d4af6a] text-[13px] tracking-wide font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Discover</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SPACES BY ANDYART */}
      <section className="py-24 md:py-32 px-4 tactile-surface">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[#9f7b43] text-[13px] tracking-[0.04em] mb-3 font-medium">B2B Curation</p>
              <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#111111] editorial-headline leading-[1.1] mb-6">
                Spaces by AndyArt
              </h2>
              <p className="text-[#5c5c5c] leading-[1.7] mb-8 text-[15px]">
                We curate art environments for offices, hotels, executive suites, and hospitality spaces.
                From single statement pieces to rotating leasing programs, we transform how your space speaks.
              </p>
              <div className="space-y-3 mb-8">
                {['Office Curation', 'Hospitality Art Programs', 'Executive Suite Collections', 'Rotating Leasing', 'Bespoke Installations', 'Luxury Gifting'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-[5px] h-[5px] rounded-full bg-[#caa25d]" />
                    <span className="text-sm text-[#2b2b2b] font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/spaces"
                  className="bg-[#111111] text-[#fbf8f2] px-7 py-[14px] rounded-full font-medium text-sm tracking-wide hover:bg-[#1b1b1b] transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Explore Spaces
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/consult"
                  className="border border-[rgba(0,0,0,0.10)] text-[#111111] px-7 py-[14px] rounded-full font-medium text-sm tracking-wide hover:bg-[rgba(0,0,0,0.03)] transition-all duration-300 inline-flex items-center justify-center"
                >
                  Request Consultation
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.10)]">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
                alt="Corporate art curation"
                fill
                className="object-cover"
                sizes="50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(0,0,0,0.35)] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTIST STORY */}
      <section className="py-24 md:py-32 px-4 surface-warm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.10)] order-2 md:order-1">
              <Image
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800"
                alt="Featured artist"
                fill
                className="object-cover"
                sizes="50vw"
                loading="lazy"
              />
            </div>
            <div className="order-1 md:order-2">
              <p className="text-[#9f7b43] text-[13px] tracking-[0.04em] mb-3 font-medium">Artist Spotlight</p>
              <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#111111] editorial-headline leading-[1.1] mb-6">
                Ngozi Okeke
              </h2>
              <p className="text-[#5c5c5c] leading-[1.7] mb-5 text-[15px]">
                Born in Enugu and trained in London, Ngozi Okeke works in bronze and reclaimed timber to create
                sculptures that speak to identity, memory, and the quiet strength of women across generations.
              </p>
              <p className="text-[#5c5c5c] leading-[1.7] mb-8 text-[15px]">
                Her work has been acquired by collectors in Lagos, New York, and Paris.
                We are honored to represent her latest collection, <em>Roots That Whisper</em>.
              </p>
              <Link
                href="/artists"
                className="inline-flex items-center gap-2 text-[#111111] font-medium text-sm hover:text-[#9f7b43] transition-colors duration-300"
              >
                View Artist Profile <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVATE VIEWING ROOMS */}
      <section className="py-24 md:py-32 px-4 bg-[#111111] text-[#fbf8f2]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#d4af6a] text-[13px] tracking-[0.04em] mb-3 font-medium">Exclusive Access</p>
          <h2 className="font-serif text-3xl md:text-[44px] font-bold editorial-headline leading-[1.1] mb-6">
            Private Viewing Rooms
          </h2>
          <p className="text-[#fbf8f2]/55 max-w-[640px] mx-auto mb-12 leading-[1.7] text-[15px]">
            Experience art in an intimate setting. Our private viewing rooms are available
            by appointment for collectors, corporate clients, and Circle members.
          </p>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {[
              { title: 'The Heritage Room', desc: 'Traditional and classical works in a quiet, contemplative space.' },
              { title: 'The Contemporary Room', desc: 'Bold, modern pieces with dramatic lighting and scale.' },
              { title: 'The Commission Suite', desc: 'Private consultations for bespoke commissions and large acquisitions.' },
            ].map((room) => (
              <div key={room.title} className="bg-[#fbf8f2]/[0.04] border border-[#fbf8f2]/[0.08] rounded-xl p-7 text-left hover:border-[rgba(212,175,106,0.25)] hover:bg-[#fbf8f2]/[0.06] transition-all duration-300">
                <h3 className="font-serif text-xl font-bold text-[#fbf8f2] mb-2">{room.title}</h3>
                <p className="text-[13px] text-[#fbf8f2]/50 leading-relaxed">{room.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/consult"
            className="bg-[#caa25d] text-[#111111] px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide hover:bg-[#fbf8f2] transition-all duration-300 inline-flex items-center gap-2"
          >
            <Eye size={16} />
            Book a Private Viewing
          </Link>
        </div>
      </section>

      {/* COLLECTOR TESTIMONIALS */}
      <section className="py-24 md:py-32 px-4 surface-rich">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9f7b43] text-[13px] tracking-[0.04em] mb-3 font-medium">Voices</p>
            <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#111111] editorial-headline leading-[1.1]">
              From Our Collectors
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 border border-[rgba(0,0,0,0.05)] shadow-[0_14px_35px_rgba(0,0,0,0.05)]">
                <div className="w-10 h-px bg-[#caa25d] mb-6" />
                <blockquote className="font-serif text-lg text-[#2b2b2b] leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-[#111111] text-sm">{t.name}</p>
                  <p className="text-[13px] text-[#9f7b43] font-medium">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL EDITORIAL */}
      <section className="py-24 md:py-32 px-4 surface-warm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[#9f7b43] text-[13px] tracking-[0.04em] mb-3 font-medium">Authority Engine</p>
              <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#111111] editorial-headline leading-[1.1]">
                The Journal
              </h2>
            </div>
            <Link href="/journal" className="hidden md:flex items-center gap-2 text-[#2b2b2b] font-medium text-sm hover:text-[#9f7b43] transition-colors duration-300">
              All Stories <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {journalTeasers.map((article) => (
              <Link key={article.title} href="/journal" className="group">
                <div className="bg-white rounded-2xl p-8 border border-[rgba(0,0,0,0.05)] shadow-[0_14px_35px_rgba(0,0,0,0.05)] hover:border-[rgba(202,162,93,0.25)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] transition-all duration-500 h-full">
                  <p className="text-[#caa25d] text-[12px] tracking-[0.04em] font-semibold mb-3">{article.category}</p>
                  <h3 className="font-serif text-xl font-bold text-[#111111] mb-3 group-hover:text-[#9f7b43] transition-colors duration-300 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-[13px] text-[#5c5c5c] leading-relaxed mb-5">{article.excerpt}</p>
                  <span className="text-[13px] text-[#111111] font-medium group-hover:text-[#caa25d] transition-colors duration-300 flex items-center gap-2">
                    Read Story <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONCIERGE BANNER */}
      <section className="py-24 md:py-32 px-4 bg-[#173126] text-[#fbf8f2]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#d4af6a] text-[13px] tracking-[0.04em] mb-3 font-medium">White Glove Service</p>
          <h2 className="font-serif text-3xl md:text-[44px] font-bold editorial-headline leading-[1.1] mb-6">
            Collector Concierge
          </h2>
          <p className="text-[#fbf8f2]/55 max-w-[640px] mx-auto mb-12 leading-[1.7] text-[15px]">
            Sourcing, commissioning, gifting, installation, framing, private viewings, and advisory.
            Our concierge team is available via chat, WhatsApp, or callback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consult"
              className="bg-[#caa25d] text-[#111111] px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide hover:bg-[#fbf8f2] transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Compass size={16} />
              Start a Conversation
            </Link>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[rgba(255,255,255,0.06)] text-[#fbf8f2] border border-[rgba(255,255,255,0.18)] px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide hover:bg-[rgba(255,255,255,0.10)] transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </section>

      {/* LUXURY FOOTER */}
      <footer className="py-20 md:py-24 px-4 bg-[#111111] text-[#fbf8f2] border-t border-[#fbf8f2]/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-20">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-5">
                <span className="font-serif text-[22px] font-bold tracking-tight text-[#fbf8f2]">AndyArt</span>
                <span className="block text-[10px] tracking-[0.18em] text-[#caa25d] font-medium mt-1">
                  Cultural House
                </span>
              </div>
              <p className="text-[13px] text-[#fbf8f2]/40 leading-relaxed">
                A premium cultural house where collecting, gathering, gifting, commissioning, and living with art converge.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-[13px] font-semibold text-[#fbf8f2] mb-4 tracking-[0.04em]">Collect</h4>
              <ul className="space-y-2.5 text-[13px] text-[#fbf8f2]/40">
                <li><Link href="/gallery" className="hover:text-[#caa25d] transition-colors duration-300">All Works</Link></li>
                <li><Link href="/artists" className="hover:text-[#caa25d] transition-colors duration-300">Artists</Link></li>
                <li><Link href="/viewing-rooms" className="hover:text-[#caa25d] transition-colors duration-300">Viewing Rooms</Link></li>
                <li><Link href="/circle" className="hover:text-[#caa25d] transition-colors duration-300">Circle Membership</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-[13px] font-semibold text-[#fbf8f2] mb-4 tracking-[0.04em]">Experience</h4>
              <ul className="space-y-2.5 text-[13px] text-[#fbf8f2]/40">
                <li><Link href="/events" className="hover:text-[#caa25d] transition-colors duration-300">Upcoming</Link></li>
                <li><Link href="/events/past" className="hover:text-[#caa25d] transition-colors duration-300">Past Events</Link></li>
                <li><Link href="/events/host" className="hover:text-[#caa25d] transition-colors duration-300">Host an Event</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-[13px] font-semibold text-[#fbf8f2] mb-4 tracking-[0.04em]">Concierge</h4>
              <ul className="space-y-2.5 text-[13px] text-[#fbf8f2]/40">
                <li><Link href="/services" className="hover:text-[#caa25d] transition-colors duration-300">All Services</Link></li>
                <li><Link href="/consult" className="hover:text-[#caa25d] transition-colors duration-300">Private Viewing</Link></li>
                <li><Link href="/spaces" className="hover:text-[#caa25d] transition-colors duration-300">Corporate Curation</Link></li>
                <li><Link href="/partners/apply" className="hover:text-[#caa25d] transition-colors duration-300">Partnerships</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-[13px] font-semibold text-[#fbf8f2] mb-4 tracking-[0.04em]">Connect</h4>
              <ul className="space-y-2.5 text-[13px] text-[#fbf8f2]/40">
                <li><a href="mailto:hello@andyart.gallery" className="hover:text-[#caa25d] transition-colors duration-300">hello@andyart.gallery</a></li>
                <li><a href="https://instagram.com/andyart" target="_blank" rel="noopener noreferrer" className="hover:text-[#caa25d] transition-colors duration-300">@andyart</a></li>
                <li><a href="https://linkedin.com/company/andyart" target="_blank" rel="noopener noreferrer" className="hover:text-[#caa25d] transition-colors duration-300">LinkedIn</a></li>
                <li><a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-[#caa25d] transition-colors duration-300">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#fbf8f2]/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-[#fbf8f2]/30">
              &copy; {new Date().getFullYear()} AndyArt Cultural House. All rights reserved.
            </p>
            <div className="flex gap-6 text-[12px] text-[#fbf8f2]/30">
              <Link href="/legal/terms" className="hover:text-[#caa25d] transition-colors duration-300">Terms</Link>
              <Link href="/legal/privacy" className="hover:text-[#caa25d] transition-colors duration-300">Privacy</Link>
              <Link href="/journal" className="hover:text-[#caa25d] transition-colors duration-300">Journal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
