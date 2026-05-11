export interface EventDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  startDatetime: string;
  endDatetime: string;
  location: string;
  isVirtual: boolean;
  zoomLink?: string;
  ticketPrice: number | null;
  totalTickets: number | null;
  remainingTickets: number | null;
  image: string;
  isPast: boolean;
  category: 'exhibition' | 'talk' | 'workshop' | 'private-preview' | 'corporate' | 'auction';
  featured: boolean;
  isPrivate: boolean;
  ticketState: 'available' | 'limited' | 'sold-out' | 'free' | 'invite-only';
}

export const events: EventDetail[] = [
  {
    id: '1',
    title: 'Paint & Sip: Sunset Edition',
    slug: 'paint-sip-sunset',
    description: 'Join us for an evening of painting and wine as we capture the perfect sunset on canvas. All materials provided, including professional brushes, paints, and canvas. Wine and light refreshments will be served. No experience necessary — our instructor will guide you step by step.',
    startDatetime: '2026-05-15T18:00:00Z',
    endDatetime: '2026-05-15T21:00:00Z',
    location: 'AndyArt Studio, Lagos',
    isVirtual: false,
    ticketPrice: 75,
    totalTickets: 20,
    remainingTickets: 12,
    image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&q=80',
    isPast: false,
    category: 'workshop',
    featured: true,
    isPrivate: false,
    ticketState: 'available',
  },
  {
    id: '2',
    title: 'Artist Talk: Contemporary Visions',
    slug: 'artist-talk-contemporary-visions',
    description: 'An intimate conversation with Ngozi Okeke and Kofi Asante about the future of African contemporary art. Moderated by AndyArt chief curator Amara Okafor. Followed by a Q&A and private viewing of new works.',
    startDatetime: '2026-05-22T19:00:00Z',
    endDatetime: '2026-05-22T21:00:00Z',
    location: 'AndyArt Cultural House, Victoria Island',
    isVirtual: false,
    ticketPrice: 0,
    totalTickets: 40,
    remainingTickets: 18,
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80',
    isPast: false,
    category: 'talk',
    featured: false,
    isPrivate: false,
    ticketState: 'free',
  },
  {
    id: '3',
    title: 'Collector Salon: Spring 2026',
    slug: 'collector-salon-spring-2026',
    description: 'An exclusive dinner for Circle members featuring a private viewing of works by Ngozi Okeke and Kweku Anansi. Wine, conversation, and exceptional cuisine converge in an evening designed for collectors who believe that art is best experienced with others.',
    startDatetime: '2026-06-05T19:30:00Z',
    endDatetime: '2026-06-05T23:00:00Z',
    location: 'AndyArt Cultural House',
    isVirtual: false,
    ticketPrice: 150,
    totalTickets: 24,
    remainingTickets: 6,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80',
    isPast: false,
    category: 'private-preview',
    featured: true,
    isPrivate: true,
    ticketState: 'limited',
  },
  {
    id: '4',
    title: 'Virtual Studio Visit: Ngozi Okeke',
    slug: 'virtual-studio-visit-ngozi-okeke',
    description: 'Join us for a live virtual tour of Ngozi Okeke\'s Enugu studio. See works in progress, hear about her process, and ask questions in real time. A rare opportunity to enter the private world of one of Africa\'s most important sculptors.',
    startDatetime: '2026-05-28T16:00:00Z',
    endDatetime: '2026-05-28T17:30:00Z',
    location: 'Virtual (Zoom)',
    isVirtual: true,
    zoomLink: 'https://zoom.us/j/example',
    ticketPrice: 0,
    totalTickets: 100,
    remainingTickets: 45,
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=800&q=80',
    isPast: false,
    category: 'talk',
    featured: false,
    isPrivate: false,
    ticketState: 'free',
  },
  {
    id: '5',
    title: 'Private Dinner: The Collector\'s Table',
    slug: 'private-dinner-collectors',
    description: 'An intimate dinner for twelve collectors, hosted by our founder. Each course paired with a curated artwork discussion. Invitation only — request your seat through our concierge.',
    startDatetime: '2026-06-20T19:00:00Z',
    endDatetime: '2026-06-20T23:00:00Z',
    location: 'AndyArt Gallery, Main Street',
    isVirtual: false,
    ticketPrice: 350,
    totalTickets: 12,
    remainingTickets: 4,
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    isPast: false,
    category: 'private-preview',
    featured: true,
    isPrivate: true,
    ticketState: 'invite-only',
  },
  {
    id: '6',
    title: 'Corporate Culture Night: Art & Leadership',
    slug: 'corporate-culture-leadership',
    description: 'How art shapes organizational culture. A keynote and panel discussion for senior executives and HR leaders, followed by a curated gallery walk and networking reception.',
    startDatetime: '2026-06-28T18:00:00Z',
    endDatetime: '2026-06-28T21:00:00Z',
    location: 'Meridian Holdings Auditorium',
    isVirtual: false,
    ticketPrice: 200,
    totalTickets: 80,
    remainingTickets: 32,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    isPast: false,
    category: 'corporate',
    featured: false,
    isPrivate: false,
    ticketState: 'available',
  },
];

export function getEventBySlug(slug: string): EventDetail | undefined {
  return events.find((e) => e.slug === slug);
}

export const eventCategories = [
  { value: 'all', label: 'All Experiences' },
  { value: 'exhibition', label: 'Exhibitions' },
  { value: 'talk', label: 'Artist Talks' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'private-preview', label: 'Private Previews' },
  { value: 'corporate', label: 'Corporate' },
  { value: 'auction', label: 'Auctions' },
] as const;

export type EventCategoryValue = (typeof eventCategories)[number]['value'];
