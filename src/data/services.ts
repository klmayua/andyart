export interface ServiceDetail {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceType: 'quote' | 'hourly' | 'fixed';
  price: number | null;
  icon: string;
  isActive: boolean;
  duration: string;
  availability: string;
  includes: string[];
}

export const services: ServiceDetail[] = [
  {
    id: '1',
    name: 'Art Sourcing',
    slug: 'art-sourcing',
    description: "We source exceptional works tailored to your taste, space, and collection goals. From emerging voices to blue-chip masters.\n\nOur sourcing process begins with a deep conversation about your aesthetic, your space, and your ambitions as a collector. We then search our global network of artists, galleries, and private collections to find works that match your vision. Each piece we present has been personally inspected, authenticated, and priced fairly.",
    priceType: 'quote',
    price: null,
    icon: 'Compass',
    isActive: true,
    duration: '2-4 weeks',
    availability: 'Year-round',
    includes: [
      'Personalized collection strategy',
      'Access to private inventories',
      'Authentication & provenance review',
      'Negotiation & acquisition support',
      'Framing & installation coordination',
    ],
  },
  {
    id: '2',
    name: 'Bespoke Commissions',
    slug: 'bespoke-commissions',
    description: "Commission a one-of-a-kind work created specifically for you. We match you with the right artist and manage the entire process.\n\nFrom the initial concept conversation to the final installation, our team guides every stage of the commission. We handle contracts, milestones, payments, and quality control so you can focus on the creative dialogue with your chosen artist.",
    priceType: 'quote',
    price: null,
    icon: 'Paintbrush',
    isActive: true,
    duration: '3-6 months',
    availability: 'Year-round',
    includes: [
      'Artist matchmaking',
      'Contract & milestone management',
      'Progress updates & studio visits',
      'Quality assurance & completion',
      'Delivery & installation',
    ],
  },
  {
    id: '3',
    name: 'Luxury Gifting',
    slug: 'luxury-gifting',
    description: "Art as the ultimate gift. Curated, packaged, and delivered with provenance documentation and a personal note.\n\nWhether for a wedding, anniversary, corporate milestone, or personal celebration, we source works that carry meaning beyond their market value. Each gift includes bespoke packaging, a handwritten provenance card, and the option for a private viewing before delivery.",
    priceType: 'quote',
    price: null,
    icon: 'Gift',
    isActive: true,
    duration: '1-2 weeks',
    availability: 'Year-round',
    includes: [
      'Curated selection for recipient',
      'Bespoke packaging',
      'Handwritten provenance card',
      'Private preview option',
      'White-glove delivery',
    ],
  },
  {
    id: '4',
    name: 'Installation & Hanging',
    slug: 'art-installation',
    description: "Professional installation in your home or office. Includes placement consultation, lighting advice, and all hardware.\n\nOur installation team includes trained art handlers, lighting designers, and interior specialists. We assess your walls, lighting, and viewing angles to place each work where it will be seen at its best.",
    priceType: 'hourly',
    price: 150,
    icon: 'Hammer',
    isActive: true,
    duration: '2-8 hours',
    availability: 'Monday - Saturday, 9am - 6pm',
    includes: [
      'Pre-installation site assessment',
      'Placement & lighting consultation',
      'Professional art handling',
      ' museum-quality hardware',
      'Final adjustment & cleanup',
    ],
  },
  {
    id: '5',
    name: 'Framing & Conservation',
    slug: 'framing-conservation',
    description: "Museum-quality framing and conservation services. We partner with master framers to protect and present your works.\n\nOur conservation partners have framed works for the British Museum, the Smithsonian, and the Zeitz MOCAA. We offer archival matting, UV-protective glazing, and custom frames in hardwood, metal, or acrylic.",
    priceType: 'quote',
    price: null,
    icon: 'Clipboard',
    isActive: true,
    duration: '2-4 weeks',
    availability: 'Year-round',
    includes: [
      'Conservation assessment',
      'Archival matting & mounting',
      'UV-protective glazing',
      'Custom hardwood or metal frames',
      'Condition documentation',
    ],
  },
  {
    id: '6',
    name: 'Private Viewing',
    slug: 'private-viewing',
    description: "Exclusive after-hours access to our gallery for you and your guests. Wine, canapés, and personal curation included.\n\nHost your guests in a setting designed for slow looking and real conversation. Our curator will walk your group through the collection, answer questions, and facilitate private purchases. Minimum 6 guests, maximum 24.",
    priceType: 'fixed',
    price: 500,
    icon: 'GlassWater',
    isActive: true,
    duration: '3 hours',
    availability: 'Tuesday - Saturday, 6pm - 9pm',
    includes: [
      'Exclusive gallery access',
      'Personal curator guide',
      'Wine & canapés service',
      'Private purchase facilitation',
      'Complimentary catalogues',
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}
