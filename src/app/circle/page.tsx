import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Gem, Crown, Check, Calendar, Users, Eye, Phone } from 'lucide-react';

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
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden bg-andy-black">
        <Image
          src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1920"
          alt="AndyArt Circle"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 cinematic-overlay" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-andy-gold text-xs uppercase tracking-[0.3em] mb-4 font-medium">Membership</p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-andy-ivory mb-4 editorial-headline">
            AndyArt Circle
          </h1>
          <p className="text-base md:text-lg text-andy-ivory/60 max-w-2xl mx-auto leading-relaxed">
            A private circle of collectors who believe art is not decoration—it is identity, legacy, and belonging.
          </p>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 md:py-28 px-4 bg-andy-ivory">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-3 font-medium">Membership Tiers</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-andy-black editorial-headline">
              Choose your circle
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-2xl p-8 border transition-all duration-500 ${
                  tier.highlight
                    ? 'bg-andy-black text-andy-ivory border-andy-gold/30 shadow-premier'
                    : 'bg-white text-andy-black border-andy-stone/30 hover:border-andy-gold/30 hover:shadow-premium'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-andy-gold text-andy-black text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl bg-andy-stone/20 flex items-center justify-center mb-5">
                  <tier.icon size={22} className={tier.highlight ? 'text-andy-gold' : 'text-andy-bronze'} />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-1">{tier.name}</h3>
                <p className="text-lg font-semibold mb-3">{tier.price}</p>
                <p className="text-sm opacity-60 mb-6 leading-relaxed">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm">
                      <Check size={16} className={tier.highlight ? 'text-andy-gold mt-0.5 flex-shrink-0' : 'text-andy-bronze mt-0.5 flex-shrink-0'} />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/profile"
                  className={`block w-full text-center px-6 py-3 rounded-full font-medium text-sm tracking-wide transition-all ${
                    tier.highlight
                      ? 'bg-andy-gold text-andy-black hover:bg-andy-ivory'
                      : 'bg-andy-black text-andy-ivory hover:bg-andy-black/80'
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
      <section className="py-20 md:py-28 px-4 tactile-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-andy-bronze text-xs uppercase tracking-[0.25em] mb-3 font-medium">Inside the Circle</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-andy-black editorial-headline">
              Moments that matter
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {memberMoments.map((moment) => (
              <div key={moment.title} className="relative aspect-[4/5] rounded-xl overflow-hidden group">
                <Image
                  src={moment.image}
                  alt={moment.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-andy-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="font-serif text-xl font-bold text-andy-ivory">{moment.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 px-4 bg-andy-green text-andy-ivory">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-5xl font-bold editorial-headline mb-6">
            Welcome to the inner circle
          </h2>
          <p className="text-andy-ivory/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Membership is limited. Join today and begin your journey as a Circle collector.
          </p>
          <Link
            href="/profile"
            className="bg-andy-gold text-andy-black px-8 py-4 rounded-full font-semibold text-sm tracking-wide hover:bg-andy-ivory transition-all inline-flex items-center justify-center gap-2"
          >
            <Star size={16} />
            Join AndyArt Circle
          </Link>
        </div>
      </section>
    </div>
  );
}
