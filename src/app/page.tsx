import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Gem, Shield, Sparkles, Palette, Building2, Wine, Users, Brush, Compass, Heart, Eye } from 'lucide-react';
import { IMAGES } from '@/lib/images';
import FooterNewsletter from '@/components/newsletter/FooterNewsletter';

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
      <section className="relative h-[92vh] min-h-[640px] flex items-center justify-center overflow-hidden pt-36 md:pt-0">
        <Image
          src={IMAGES.hero}
          alt="AndyArt Cultural House"
          fill
          className="object-cover hero-image"
          priority
        />

        {/* Top gradient for nav readability */}
        <div
          className="absolute top-0 left-0 right-0 z-[5] pointer-events-none"
          style={{
            height: '220px',
            background: 'linear-gradient(to bottom, rgba(15,13,10,.28) 0%, rgba(15,13,10,.02) 100%)',
          }}
        />

        {/* Center veil */}
        <div
          className="absolute inset-0 z-[3] pointer-events-none"
          style={{ background: 'rgba(18,16,12,.22)' }}
        />

        {/* Bottom gradient */}
        <div
          className="absolute inset-0 z-[4] pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(15,13,10,.03) 0%, rgba(15,13,10,.18) 100%)',
          }}
        />

        {/* Vignette */}
        <div className="absolute inset-0 hero-vignette z-[6] pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <p
            className="text-[#C6A66B] text-[13px] md:text-sm tracking-[0.05em] mb-6 font-[560]"
          >
            Premium African Art & Cultural Living
          </p>
          <h1
            className="font-serif text-4xl md:text-6xl lg:text-[76px] font-bold text-[#FFFDF9] mb-6 leading-[1.02] editorial-headline mx-auto"
            style={{
              textShadow: '0 10px 30px rgba(0,0,0,.18)',
              maxWidth: '900px',
            }}
          >
            Collect culture.
            <br />
            <span style={{ color: 'rgba(255,253,249,0.82)' }}>Live beautifully.</span>
            <br />
            Leave legacy.
          </h1>
          <p
            className="text-base md:text-lg text-[rgba(255,253,249,.92)] mb-10 mx-auto leading-[1.6]"
            style={{ maxWidth: '760px' }}
          >
            Premium African art, curated experiences, bespoke commissions, and timeless cultural living for every generation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/gallery"
              className="bg-[#C6A66B] text-[#171614] px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide hover:bg-[#D2B37C] transition-all duration-300 shadow-[0_12px_32px_rgba(198,166,107,.24)] inline-flex items-center justify-center gap-2"
            >
              Explore Collection
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/consult"
              className="text-[#FFFDF9] px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide transition-all duration-300 inline-flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,.10)',
                backdropFilter: 'blur(22px) saturate(150%)',
                WebkitBackdropFilter: 'blur(22px) saturate(150%)',
                border: '1px solid rgba(255,255,255,.18)',
                boxShadow: '0 8px 28px rgba(0,0,0,.10), inset 0 1px 0 rgba(255,255,255,.20)',
              }}
            >
              Book Private Viewing
            </Link>
              <Link
                href="/circle"
                className="bg-transparent text-[#FFFDF9] border border-[rgba(255,255,255,.12)] px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide hover:bg-[rgba(255,255,255,.06)] transition-all duration-300 inline-flex items-center justify-center"
              >
                Join Circle
              </Link>
          </div>

          {/* Trust Strip */}
          <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-12">
            {trustStrip.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5">
                <item.icon size={18} className="text-[#C6A66B]" />
                <span className="text-[13px] text-[rgba(255,253,249,.90)] tracking-wide font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONA GATEWAY — Five Ways to Begin */}
      <section
        className="relative px-4 overflow-hidden"
        style={{
          paddingTop: '72px',
          paddingBottom: '84px',
          background: 'linear-gradient(180deg, #F6F1E7 0%, #EDE2CF 100%)',
        }}
      >
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.03,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
          }}
        />

        {/* Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 40%, rgba(255,248,232,.45) 0%, transparent 60%)',
          }}
        />

        <div
          className="relative mx-auto"
          style={{
            maxWidth: '1480px',
            paddingLeft: '56px',
            paddingRight: '56px',
          }}
        >
          {/* Header */}
          <div className="mb-[38px]">
            <p className="text-[#A57B3A] text-[15px] font-semibold tracking-[0.12em] mb-[14px]">How we serve</p>
            <h2
              className="font-serif font-[650] text-[#171410] editorial-headline"
              style={{
                fontSize: 'clamp(60px, 7vw, 110px)',
                lineHeight: 0.95,
                letterSpacing: '-0.035em',
              }}
            >
              Five ways to begin
            </h2>
          </div>

          {/* Desktop: 3-Column Gallery Editorial */}
          <div className="hidden md:grid" style={{ gridTemplateColumns: '1.25fr 1fr 1fr', gap: '28px', alignItems: 'stretch' }}>
            {/* Column 1 — Collect */}
            <Link
              href="/gallery"
              className="group relative flex flex-col overflow-hidden"
              style={{
                minHeight: '760px',
                borderRadius: '34px',
                padding: '44px',
                background: 'rgba(255,252,245,.74)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(210,188,152,.22)',
                boxShadow: '0 22px 50px rgba(91,64,31,.08)',
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '18px',
                  background: 'rgba(184,141,69,.10)',
                  border: '1px solid rgba(184,141,69,.18)',
                }}
              >
                <Palette size={24} style={{ color: '#A57B3A' }} />
              </div>

              <h3
                className="font-serif font-[650] text-[#171410] mt-[34px]"
                style={{
                  fontSize: 'clamp(26px, 1.8vw, 40px)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.02em',
                  wordBreak: 'normal',
                  overflowWrap: 'normal',
                  hyphens: 'none',
                }}
              >
                Collect
              </h3>

              <p className="text-[18px] text-[#7A6E60] leading-[1.55] mt-[26px]" style={{ maxWidth: '24ch' }}>
                Acquire exceptional works from Africa's most compelling artists.
              </p>

              <div className="mt-auto pt-8 flex items-center gap-2 text-[#9E7435] text-[17px] font-semibold">
                <span>Explore Collection</span>
                <ArrowRight size={16} />
              </div>

              {/* Artwork bottom half */}
              <div
                className="relative w-full overflow-hidden mt-auto"
                style={{
                  height: '48%',
                  borderRadius: '26px',
                  marginTop: '34px',
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=800&q=80"
                  alt="Curated art collection"
                  fill
                  className="object-cover"
                  sizes="33vw"
                  loading="lazy"
                />
              </div>
            </Link>

            {/* Column 2 — Experience + Commission */}
            <div className="flex flex-col" style={{ gap: '28px' }}>
              {[
                { title: 'Experience', desc: 'Gather beautifully', href: '/events', icon: Wine, img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80' },
                { title: 'Commission', desc: 'Bespoke artistic creation', href: '/consult', icon: Brush, img: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80' },
              ].map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative flex flex-col overflow-hidden"
                  style={{
                    flex: '1',
                    minHeight: '366px',
                    borderRadius: '30px',
                    padding: '34px',
                    background: 'rgba(255,252,245,.74)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(210,188,152,.22)',
                    boxShadow: '0 22px 50px rgba(91,64,31,.08)',
                  }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '18px',
                      background: 'rgba(184,141,69,.10)',
                      border: '1px solid rgba(184,141,69,.18)',
                    }}
                  >
                    <card.icon size={24} style={{ color: '#A57B3A' }} />
                  </div>

                  <h3
                    className="font-serif font-[650] text-[#171410] mt-[18px]"
                    style={{
                      fontSize: 'clamp(26px, 1.8vw, 40px)',
                      lineHeight: 1.02,
                      letterSpacing: '-0.02em',
                      wordBreak: 'normal',
                      overflowWrap: 'normal',
                      hyphens: 'none',
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Inline thumbnail below title */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      height: '130px',
                      borderRadius: '18px',
                      marginTop: '18px',
                      marginBottom: '22px',
                    }}
                  >
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="33vw"
                      loading="lazy"
                    />
                  </div>

                  <p className="text-[18px] text-[#7A6E60] leading-[1.55]" style={{ maxWidth: '24ch' }}>
                    {card.desc}
                  </p>

                  <div className="mt-auto pt-4 flex items-center gap-2 text-[#9E7435] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>

            {/* Column 3 — Transform Spaces + Join Circle */}
            <div className="flex flex-col" style={{ gap: '28px' }}>
              {[
                { title: 'Transform Spaces', displayTitle: <>Transform<br />Spaces</>, desc: 'Curate environments', href: '/spaces', icon: Building2, img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=600&q=80' },
                { title: 'Join Circle', displayTitle: <>Join<br />Circle</>, desc: 'Prestige membership', href: '/circle', icon: Star, img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600&q=80' },
              ].map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative flex flex-col overflow-hidden"
                  style={{
                    flex: '1',
                    minHeight: '366px',
                    borderRadius: '30px',
                    padding: '34px',
                    background: 'rgba(255,252,245,.74)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(210,188,152,.22)',
                    boxShadow: '0 22px 50px rgba(91,64,31,.08)',
                  }}
                >
                  <div
                    className="flex items-center justify-center"
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '18px',
                      background: 'rgba(184,141,69,.10)',
                      border: '1px solid rgba(184,141,69,.18)',
                    }}
                  >
                    <card.icon size={24} style={{ color: '#A57B3A' }} />
                  </div>

                  <h3
                    className="font-serif font-[650] text-[#171410] mt-[18px]"
                    style={{
                      fontSize: 'clamp(26px, 1.8vw, 40px)',
                      lineHeight: 1.02,
                      letterSpacing: '-0.02em',
                      wordBreak: 'normal',
                      overflowWrap: 'normal',
                      hyphens: 'none',
                    }}
                  >
                    {card.displayTitle || card.title}
                  </h3>

                  {/* Inline thumbnail below title */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      height: '130px',
                      borderRadius: '18px',
                      marginTop: '18px',
                      marginBottom: '22px',
                    }}
                  >
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      className="object-cover"
                      sizes="33vw"
                      loading="lazy"
                    />
                  </div>

                  <p className="text-[18px] text-[#7A6E60] leading-[1.55]" style={{ maxWidth: '24ch' }}>
                    {card.desc}
                  </p>

                  <div className="mt-auto pt-4 flex items-center gap-2 text-[#9E7435] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Explore</span>
                    <ArrowRight size={14} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile: Vertical Stack */}
          <div className="md:hidden flex flex-col gap-6">
            {personaCards.map((card, idx) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative flex items-center gap-5"
                style={{
                  borderRadius: '28px',
                  padding: '28px',
                  background: 'rgba(255,252,245,.74)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(210,188,152,.22)',
                  boxShadow: '0 22px 50px rgba(91,64,31,.08)',
                }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '18px',
                    background: 'rgba(198,166,107,.10)',
                    border: '1px solid rgba(198,166,107,.18)',
                  }}
                >
                  <card.icon size={24} style={{ color: '#A78345' }} />
                </div>
                <div>
                  <h3
                    className="font-serif font-semibold text-[#171410] mb-1"
                    style={{ fontSize: idx === 0 ? '28px' : '22px' }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-[15px] text-[#7A6E60] leading-relaxed">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section Transition Band */}
      <div
        className="hidden md:block"
        style={{
          height: '110px',
          background: 'linear-gradient(180deg, rgba(230,214,189,.55) 0%, #FCF8F2 100%)',
        }}
      />

      {/* FEATURED COLLECTION */}
      <section className="pt-[92px] pb-[110px] px-4 bg-[#FCFAF6]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-[46px]">
            <div>
              <p className="text-[#A78345] text-[13px] tracking-[0.04em] mb-3 font-medium">Curated Selection</p>
              <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#171614] editorial-headline leading-[1.1]">
                Featured Works
              </h2>
            </div>
            <Link href="/gallery" className="hidden md:flex items-center gap-2 text-[#211D18] font-medium text-sm hover:text-[#A78345] transition-colors duration-300">
              View Collection <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
            {IMAGES.artworks.slice(0, 3).map((artwork, index) => (
              <Link key={artwork.id} href={`/gallery/${artwork.title.toLowerCase().replace(/\s+/g, '-')}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#D7CEC1]/40 mb-5 shadow-[0_8px_24px_rgba(0,0,0,0.05)] group-hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.30)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-9 h-9 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-subtle">
                      <Heart size={16} className="text-[#171614]" />
                    </div>
                  </div>
                </div>
                <h3 className="font-serif text-base font-semibold text-[#171614] group-hover:text-[#A78345] transition-colors duration-300">
                  {artwork.title}
                </h3>
                <p className="text-sm text-[#5D4633]">{index % 2 === 0 ? 'Ngozi Okeke' : 'Kofi Asante'}</p>
                <p className="text-sm font-semibold text-[#C6A66B] mt-1">
                  {index % 3 === 0 ? 'Price on request' : `$${(index + 1) * 2500}`}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/gallery" className="inline-flex items-center gap-2 text-[#211D18] font-medium text-sm">
              View Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* HERITAGE / MODERN BRIDGE */}
      <section className="pt-[96px] pb-[110px] px-4 bg-[#171614] text-[#FFFDF9]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-[34px]">
            <p className="text-[#C6A66B] text-[13px] tracking-[0.04em] mb-[10px] font-medium">Our Curation Philosophy</p>
            <h2 className="font-serif text-3xl md:text-[44px] font-bold editorial-headline leading-[1.1]">
              Heritage informs.
              <br />
              <span className="text-[#FFFDF9]/70">Modern excites.</span>
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
                  <div className="w-8 h-px bg-[#C6A66B] mb-3" />
                  <h3 className="font-serif text-lg font-bold text-[#FFFDF9] mb-1">{pillar.name}</h3>
                  <p className="text-xs text-[#FFFDF9]/55 leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNATURE EXPERIENCES */}
      <section className="pt-[88px] pb-[96px] px-4 bg-[#F7F2E8]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-[42px]">
            <div>
              <p className="text-[#A78345] text-[13px] tracking-[0.04em] mb-[10px] font-medium">Gatherings</p>
              <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#171614] editorial-headline leading-[1.1]">
                AndyArt Experiences
              </h2>
            </div>
            <Link href="/events" className="hidden md:flex items-center gap-2 text-[#211D18] font-medium text-sm hover:text-[#A78345] transition-colors duration-300">
              All Experiences <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {experiences.map((exp) => (
              <Link key={exp.title} href="/events" className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_14px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500">
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
                  <h3 className="font-serif text-lg font-bold text-[#FFFDF9]">{exp.title}</h3>
                  <div className="mt-2 flex items-center gap-2 text-[#C6A66B] text-[13px] tracking-wide font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
      <section className="pt-[82px] pb-[96px] px-4 bg-[#FFFDF9]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-[#A78345] text-[13px] tracking-[0.04em] mb-[10px] font-medium">B2B Curation</p>
              <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#171614] editorial-headline leading-[1.1] mb-[32px]">
                Spaces by AndyArt
              </h2>
              <p className="text-[#5D4633] leading-[1.7] mb-6 text-[15px]">
                We curate art environments for offices, hotels, executive suites, and hospitality spaces.
                From single statement pieces to rotating leasing programs, we transform how your space speaks.
              </p>
              <div className="space-y-3 mb-6">
                {['Office Curation', 'Hospitality Art Programs', 'Executive Suite Collections', 'Rotating Leasing', 'Bespoke Installations', 'Luxury Gifting'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-[5px] h-[5px] rounded-full bg-[#C6A66B]" />
                    <span className="text-sm text-[#211D18] font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/spaces"
                  className="bg-[#171614] text-[#FFFDF9] px-7 py-[14px] rounded-full font-medium text-sm tracking-wide hover:bg-[#211D18] transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  Explore Spaces
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/consult"
                  className="border border-[rgba(0,0,0,0.08)] text-[#171614] px-7 py-[14px] rounded-full font-medium text-sm tracking-wide hover:bg-[rgba(0,0,0,0.02)] transition-all duration-300 inline-flex items-center justify-center"
                >
                  Request Consultation
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.08)]">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
                alt="Corporate art curation"
                fill
                className="object-cover"
                sizes="50vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(0,0,0,0.30)] to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ARTIST STORY */}
      <section className="pt-[82px] pb-[96px] px-4 bg-[#F7F2E8]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,0.08)] order-2 md:order-1">
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
              <p className="text-[#A78345] text-[13px] tracking-[0.04em] mb-[10px] font-medium">Artist Spotlight</p>
              <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#171614] editorial-headline leading-[1.1] mb-[32px]">
                Ngozi Okeke
              </h2>
              <p className="text-[#5D4633] leading-[1.7] mb-4 text-[15px]">
                Born in Enugu and trained in London, Ngozi Okeke works in bronze and reclaimed timber to create
                sculptures that speak to identity, memory, and the quiet strength of women across generations.
              </p>
              <p className="text-[#5D4633] leading-[1.7] mb-6 text-[15px]">
                Her work has been acquired by collectors in Lagos, New York, and Paris.
                We are honored to represent her latest collection, <em>Roots That Whisper</em>.
              </p>
              <Link
                href="/artists"
                className="inline-flex items-center gap-2 text-[#171614] font-medium text-sm hover:text-[#A78345] transition-colors duration-300"
              >
                View Artist Profile <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVATE VIEWING ROOMS */}
      <section className="pt-[84px] pb-[96px] px-4 bg-[#171614] text-[#FFFDF9]">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#C6A66B] text-[13px] tracking-[0.04em] mb-[10px] font-medium">Exclusive Access</p>
          <h2 className="font-serif text-3xl md:text-[44px] font-bold editorial-headline leading-[1.1] mb-[18px]">
            Private Viewing Rooms
          </h2>
          <p className="text-[#FFFDF9]/50 max-w-[640px] mx-auto mb-[30px] leading-[1.7] text-[15px]">
            Experience art in an intimate setting. Our private viewing rooms are available
            by appointment for collectors, corporate clients, and Circle members.
          </p>
          <div className="grid md:grid-cols-3 gap-5 mb-[30px]">
            {[
              { title: 'The Heritage Room', desc: 'Traditional and classical works in a quiet, contemplative space.' },
              { title: 'The Contemporary Room', desc: 'Bold, modern pieces with dramatic lighting and scale.' },
              { title: 'The Commission Suite', desc: 'Private consultations for bespoke commissions and large acquisitions.' },
            ].map((room) => (
              <div key={room.title} className="bg-[#FFFDF9]/[0.03] border border-[#FFFDF9]/[0.06] rounded-xl p-7 text-left hover:border-[rgba(198,166,107,0.20)] hover:bg-[#FFFDF9]/[0.05] transition-all duration-300">
                <h3 className="font-serif text-xl font-bold text-[#FFFDF9] mb-2">{room.title}</h3>
                <p className="text-[13px] text-[#FFFDF9]/45 leading-relaxed">{room.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/consult"
            className="bg-[#C6A66B] text-[#171614] px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide hover:bg-[#D2B37C] transition-all duration-300 inline-flex items-center gap-2"
          >
            <Eye size={16} />
            Book a Private Viewing
          </Link>
        </div>
      </section>

      {/* COLLECTOR TESTIMONIALS */}
      <section className="pt-[84px] pb-[96px] px-4 bg-[#FFFDF9]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-[34px]">
            <p className="text-[#A78345] text-[13px] tracking-[0.04em] mb-[10px] font-medium">Voices</p>
            <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#171614] editorial-headline leading-[1.1]">
              From Our Collectors
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[#F7F2E8] rounded-2xl p-8 border border-[rgba(0,0,0,0.03)] shadow-[0_14px_35px_rgba(0,0,0,0.04)]">
                <div className="w-10 h-px bg-[#C6A66B] mb-6" />
                <blockquote className="font-serif text-lg text-[#211D18] leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-semibold text-[#171614] text-sm">{t.name}</p>
                  <p className="text-[13px] text-[#A78345] font-medium">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNAL EDITORIAL */}
      <section className="pt-[80px] pb-[96px] px-4 bg-[#F7F2E8]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-[42px]">
            <div>
              <p className="text-[#A78345] text-[13px] tracking-[0.04em] mb-[10px] font-medium">Authority Engine</p>
              <h2 className="font-serif text-3xl md:text-[44px] font-bold text-[#171614] editorial-headline leading-[1.1]">
                The Journal
              </h2>
            </div>
            <Link href="/journal" className="hidden md:flex items-center gap-2 text-[#211D18] font-medium text-sm hover:text-[#A78345] transition-colors duration-300">
              All Stories <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {journalTeasers.map((article) => (
              <Link key={article.title} href="/journal" className="group">
                <div className="bg-[#FFFDF9] rounded-2xl p-8 border border-[rgba(0,0,0,0.03)] shadow-[0_14px_35px_rgba(0,0,0,0.04)] hover:border-[rgba(198,166,107,0.18)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] transition-all duration-500 h-full">
                  <p className="text-[#C6A66B] text-[12px] tracking-[0.04em] font-semibold mb-3">{article.category}</p>
                  <h3 className="font-serif text-xl font-bold text-[#171614] mb-3 group-hover:text-[#A78345] transition-colors duration-300 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-[13px] text-[#5D4633] leading-relaxed mb-5">{article.excerpt}</p>
                  <span className="text-[13px] text-[#171614] font-medium group-hover:text-[#C6A66B] transition-colors duration-300 flex items-center gap-2">
                    Read Story <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONCIERGE BANNER */}
      <section className="pt-[84px] pb-[96px] px-4 bg-[#30463A] text-[#FFFDF9]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#C6A66B] text-[13px] tracking-[0.04em] mb-[10px] font-medium">White Glove Service</p>
          <h2 className="font-serif text-3xl md:text-[44px] font-bold editorial-headline leading-[1.1] mb-[18px]">
            Collector Concierge
          </h2>
          <p className="text-[#FFFDF9]/50 max-w-[640px] mx-auto mb-[30px] leading-[1.7] text-[15px]">
            Sourcing, commissioning, gifting, installation, framing, private viewings, and advisory.
            Our concierge team is available via chat, WhatsApp, or callback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/consult"
              className="bg-[#C6A66B] text-[#171614] px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide hover:bg-[#D2B37C] transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              <Compass size={16} />
              Start a Conversation
            </Link>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[rgba(255,255,255,0.05)] text-[#FFFDF9] border border-[rgba(255,255,255,.14)] px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 inline-flex items-center justify-center gap-2"
            >
              WhatsApp Concierge
            </a>
          </div>
        </div>
      </section>

      {/* LUXURY FOOTER */}
      <footer className="pt-[68px] pb-[76px] px-4 bg-[#171614] text-[#FFFDF9] border-t border-[#FFFDF9]/[0.05]">
        <div className="max-w-6xl mx-auto">
          {/* Newsletter in footer */}
          <div className="mb-12 pb-10 border-b border-[#FFFDF9]/[0.06]">
            <h3 className="font-serif text-lg font-bold text-[#FFFDF9] mb-2 text-center">Join the Circle</h3>
            <p className="text-[#FFFDF9]/40 text-sm text-center mb-6">Collector stories, artist insights, and exclusive access.</p>
            <FooterNewsletter />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-20">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-5">
                <span className="font-serif text-[22px] font-bold tracking-tight text-[#FFFDF9]">AndyArt</span>
                <span className="block text-[10px] tracking-[0.18em] text-[#C6A66B] font-medium mt-1">
                  Cultural House
                </span>
              </div>
              <p className="text-[13px] text-[#FFFDF9]/35 leading-relaxed">
                A premium cultural house where collecting, gathering, gifting, commissioning, and living with art converge.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-[13px] font-semibold text-[#FFFDF9] mb-4 tracking-[0.04em]">Collect</h4>
              <ul className="space-y-2.5 text-[13px] text-[#FFFDF9]/35">
                <li><Link href="/gallery" className="hover:text-[#C6A66B] transition-colors duration-300">All Works</Link></li>
                <li><Link href="/artists" className="hover:text-[#C6A66B] transition-colors duration-300">Artists</Link></li>
                <li><Link href="/viewing-rooms" className="hover:text-[#C6A66B] transition-colors duration-300">Viewing Rooms</Link></li>
                <li><Link href="/circle" className="hover:text-[#C6A66B] transition-colors duration-300">Circle Membership</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-[13px] font-semibold text-[#FFFDF9] mb-4 tracking-[0.04em]">Experience</h4>
              <ul className="space-y-2.5 text-[13px] text-[#FFFDF9]/35">
                <li><Link href="/events" className="hover:text-[#C6A66B] transition-colors duration-300">Upcoming</Link></li>
                <li><Link href="/events/past" className="hover:text-[#C6A66B] transition-colors duration-300">Past Events</Link></li>
                <li><Link href="/events/host" className="hover:text-[#C6A66B] transition-colors duration-300">Host an Event</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-[13px] font-semibold text-[#FFFDF9] mb-4 tracking-[0.04em]">Concierge</h4>
              <ul className="space-y-2.5 text-[13px] text-[#FFFDF9]/35">
                <li><Link href="/services" className="hover:text-[#C6A66B] transition-colors duration-300">All Services</Link></li>
                <li><Link href="/consult" className="hover:text-[#C6A66B] transition-colors duration-300">Private Viewing</Link></li>
                <li><Link href="/spaces" className="hover:text-[#C6A66B] transition-colors duration-300">Corporate Curation</Link></li>
                <li><Link href="/partners/apply" className="hover:text-[#C6A66B] transition-colors duration-300">Partnerships</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-[13px] font-semibold text-[#FFFDF9] mb-4 tracking-[0.04em]">Connect</h4>
              <ul className="space-y-2.5 text-[13px] text-[#FFFDF9]/35">
                <li><a href="mailto:hello@andyart.gallery" className="hover:text-[#C6A66B] transition-colors duration-300">hello@andyart.gallery</a></li>
                <li><a href="https://instagram.com/andyart" target="_blank" rel="noopener noreferrer" className="hover:text-[#C6A66B] transition-colors duration-300">@andyart</a></li>
                <li><a href="https://linkedin.com/company/andyart" target="_blank" rel="noopener noreferrer" className="hover:text-[#C6A66B] transition-colors duration-300">LinkedIn</a></li>
                <li><a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-[#C6A66B] transition-colors duration-300">WhatsApp</a></li>
                <li><Link href="/auth/signin" className="hover:text-[#C6A66B] transition-colors duration-300">Member Access</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#FFFDF9]/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-[#FFFDF9]/25">
              &copy; 2026 AndyArt Cultural House. All rights reserved.
            </p>
            <div className="flex gap-6 text-[12px] text-[#FFFDF9]/25">
              <Link href="/legal/terms" className="hover:text-[#C6A66B] transition-colors duration-300">Terms</Link>
              <Link href="/legal/privacy" className="hover:text-[#C6A66B] transition-colors duration-300">Privacy</Link>
              <Link href="/journal" className="hover:text-[#C6A66B] transition-colors duration-300">Journal</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
