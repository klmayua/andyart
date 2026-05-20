import Link from 'next/link';
import Image from 'next/image';
import { Star, Gem, Crown, Check } from 'lucide-react';

const tiers = [
  {
    name: 'Classic',
    icon: Star,
    price: 'Free',
    description: 'For those beginning their collecting journey.',
    perks: [
      'Access to collection previews',
      'Monthly newsletter',
      'Event invitations',
      'Wishlist & saved works',
    ],
    cta: 'Join Free',
    highlight: false,
  },
  {
    name: 'Gold',
    icon: Gem,
    price: '$299/year',
    description: 'For active collectors who want priority access.',
    perks: [
      'Everything in Classic',
      'Early access to new works',
      'Member-only pricing (10%)',
      'Private event invitations',
      'Quarterly studio visits',
      'Dedicated email support',
    ],
    cta: 'Join Gold',
    highlight: true,
  },
  {
    name: 'Black',
    icon: Crown,
    price: '$1,499/year',
    description: 'For discerning collectors who expect white-glove service.',
    perks: [
      'Everything in Gold',
      'First refusal on all new works',
      'Member-only pricing (15%)',
      'Unlimited private viewings',
      'Collector concierge access',
      'Exclusive dinners with artists',
      'Bespoke commission priority',
      'Global shipping included',
    ],
    cta: 'Apply for Black',
    highlight: false,
  },
];

const memberMoments = [
  { title: 'Collector Preview', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800' },
  { title: 'Studio Visit', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800' },
  { title: 'Private Dinner', image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800' },
];

export default function CirclePage() {
  return (
    <div className="min-h-screen">
      {/* Hero - Dark Theme */}
      <section
        className="relative h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden"
        style={{ background: '#171614' }}
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1920"
            alt="AndyArt Circle"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171614] via-[#171614]/60 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="section-label animate-fade-in-up" style={{ color: '#C6A66B' }}>Membership</p>
          <h1 className="display-lg text-white mb-6 animate-fade-in-up delay-1">
            AndyArt Circle
          </h1>
          <p className="text-md max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-2" style={{ color: 'rgba(255,253,249,0.6)' }}>
            A private circle of collectors who believe art is not decoration—it is identity, legacy, and belonging.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 md:py-28 px-4" style={{ background: 'var(--warm-ivory)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label" style={{ color: '#A78345' }}>Membership Tiers</p>
            <h1 className="display-md mb-4 text-[#171614]">
              Choose your circle
            </h1>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier, idx) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 transition-all duration-500 card-postmodern animate-fade-in-up`}
                style={{
                  animationDelay: `${idx * 0.1}s`,
                  background: tier.highlight ? '#171614' : 'white',
                  color: tier.highlight ? '#FFFDF9' : '#171614',
                }}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider" style={{ background: '#C6A66B', color: '#171614' }}>
                    Most Popular
                  </div>
                )}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: tier.highlight ? 'rgba(198,166,107,0.2)' : 'rgba(93,70,51,0.1)' }}
                >
                  <tier.icon
                    size={22}
                    style={{ color: tier.highlight ? '#C6A66B' : '#A78345' }}
                  />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-2">{tier.name}</h3>
                <p className="text-lg font-semibold mb-4" style={{ color: tier.highlight ? '#C6A66B' : undefined }}>{tier.price}</p>
                <p className="text-sm mb-6 leading-relaxed" style={{ color: tier.highlight ? 'rgba(255,253,249,0.6)' : 'rgba(93,70,51,0.7)' }}>{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm">
                      <Check
                        size={16}
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: tier.highlight ? '#C6A66B' : '#A78345' }}
                      />
                      <span style={{ color: tier.highlight ? 'rgba(255,253,249,0.8)' : undefined }}>{perk}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/profile"
                  className={`block w-full text-center px-6 py-3 rounded-full font-medium text-sm tracking-wide transition-all ${
                    tier.highlight
                      ? 'bg-[#C6A66B] text-[#171614] hover:bg-[#FFFDF9]'
                      : 'bg-[#171614] text-[#FFFDF9] hover:bg-[#211D18]'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Moments */}
      <section className="py-20 md:py-28 px-4" style={{ background: 'rgba(215,206,193,0.2)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label" style={{ color: '#A78345' }}>Inside the Circle</p>
            <h1 className="display-md mb-4 text-[#171614]">
              Moments that matter
            </h1>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {memberMoments.map((moment, idx) => (
              <div
                key={moment.title}
                className="relative aspect-[4/5] rounded-xl overflow-hidden group card-postmodern animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="font-serif text-xl font-bold text-white">{moment.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 md:py-28 px-4"
        style={{ background: '#30463A' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="display-md mb-6 text-white">
            Welcome to the inner circle
          </h1>
          <p className="text-md max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,253,249,0.6)' }}>
            Membership is limited. Join today and begin your journey as a Circle collector.
          </p>
          <Link
            href="/profile"
            className="btn-postmodern-gold text-base px-8 py-4 inline-flex items-center justify-center gap-2"
          >
            <Star size={18} />
            Join AndyArt Circle
          </Link>
        </div>
      </section>
    </div>
  );
}