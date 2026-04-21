import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create Artists
  const artist1 = await prisma.artist.upsert({
    where: { slug: 'jane-doe' },
    update: {},
    create: {
      name: 'Jane Doe',
      slug: 'jane-doe',
      bio: 'Jane Doe is a contemporary artist known for her vibrant landscape paintings and abstract compositions. Her work has been featured in galleries across the country.',
      profileImage: 'https://via.placeholder.com/400x400',
      instagram: '@janedoeart',
      website: 'https://janedoe.art',
    },
  });

  const artist2 = await prisma.artist.upsert({
    where: { slug: 'john-smith' },
    update: {},
    create: {
      name: 'John Smith',
      slug: 'john-smith',
      bio: 'John Smith is a multidisciplinary artist working in painting, sculpture, and digital media. His urban-inspired work captures the energy of modern city life.',
      profileImage: 'https://via.placeholder.com/400x400',
      instagram: '@johnsmithart',
      website: 'https://johnsmith.studio',
    },
  });

  const artist3 = await prisma.artist.upsert({
    where: { slug: 'emily-chen' },
    update: {},
    create: {
      name: 'Emily Chen',
      slug: 'emily-chen',
      bio: 'Emily Chen is a sculptor and mixed media artist whose work explores the relationship between nature and technology.',
      profileImage: 'https://via.placeholder.com/400x400',
      instagram: '@emilychenart',
      website: 'https://emilychen.art',
    },
  });

  console.log('✅ Artists created');

  // Create Artworks
  const artworks = [
    {
      title: 'Sunset Over Mountains',
      slug: 'sunset-over-mountains',
      artistId: artist1.id,
      medium: 'Oil on canvas',
      dimensions: '36 x 48 inches',
      year: 2024,
      price: 2500,
      isPriceOnRequest: false,
      images: ['https://via.placeholder.com/800x1000'],
      inStock: true,
      category: 'painting',
      curatorNote: 'A stunning depiction of nature\'s beauty at golden hour.',
    },
    {
      title: 'Urban Dreams',
      slug: 'urban-dreams',
      artistId: artist2.id,
      medium: 'Acrylic on canvas',
      dimensions: '48 x 60 inches',
      year: 2024,
      price: 3200,
      isPriceOnRequest: false,
      images: ['https://via.placeholder.com/800x1000'],
      inStock: true,
      category: 'painting',
      curatorNote: 'A bold exploration of city life and modern architecture.',
    },
    {
      title: 'Abstract Emotions',
      slug: 'abstract-emotions',
      artistId: artist1.id,
      medium: 'Mixed media on canvas',
      dimensions: '30 x 40 inches',
      year: 2023,
      price: null,
      isPriceOnRequest: true,
      images: ['https://via.placeholder.com/800x1000'],
      inStock: true,
      category: 'abstract',
      curatorNote: 'An expressive piece that invites personal interpretation.',
    },
    {
      title: 'Ocean Waves',
      slug: 'ocean-waves',
      artistId: artist3.id,
      medium: 'Watercolor on paper',
      dimensions: '24 x 36 inches',
      year: 2024,
      price: 1800,
      isPriceOnRequest: false,
      images: ['https://via.placeholder.com/800x1000'],
      inStock: true,
      category: 'painting',
      curatorNote: 'A serene capture of the ocean\'s perpetual motion.',
    },
    {
      title: 'City Lights',
      slug: 'city-lights',
      artistId: artist2.id,
      medium: 'Digital photography',
      dimensions: '40 x 60 inches',
      year: 2024,
      price: 4500,
      isPriceOnRequest: false,
      images: ['https://via.placeholder.com/800x1000'],
      inStock: true,
      category: 'photography',
      curatorNote: 'A stunning night-time cityscape with brilliant light trails.',
    },
  ];

  for (const artwork of artworks) {
    await prisma.artwork.upsert({
      where: { slug: artwork.slug },
      update: {},
      create: artwork,
    });
  }

  console.log('✅ Artworks created');

  // Create Events
  const events = [
    {
      title: 'Paint & Sip: Sunset Edition',
      slug: 'paint-sip-sunset',
      description: 'Join us for an evening of painting and wine as we capture the perfect sunset on canvas. All materials provided, including professional brushes, paints, and canvas. Wine and light refreshments will be served.',
      startDatetime: new Date('2026-05-15T18:00:00Z'),
      endDatetime: new Date('2026-05-15T21:00:00Z'),
      location: 'AndyArt Studio, Downtown',
      isVirtual: false,
      ticketPrice: 75,
      totalTickets: 20,
      remainingTickets: 12,
      image: 'https://via.placeholder.com/800x450',
      isPast: false,
    },
    {
      title: 'Artist Talk: Contemporary Visions',
      slug: 'artist-talk-contemporary',
      description: 'Meet our featured artists and learn about their creative process. Q&A session included with wine and hors d\'oeuvres.',
      startDatetime: new Date('2026-05-22T19:00:00Z'),
      endDatetime: new Date('2026-05-22T21:00:00Z'),
      location: 'Virtual Event',
      isVirtual: true,
      ticketPrice: 0,
      totalTickets: 100,
      remainingTickets: 75,
      image: 'https://via.placeholder.com/800x450',
      isPast: false,
    },
    {
      title: 'Sculpture Workshop: Clay Basics',
      slug: 'sculpture-workshop-clay',
      description: 'Learn the fundamentals of clay sculpting with professional artist Emily Chen. All materials and tools provided.',
      startDatetime: new Date('2026-06-05T14:00:00Z'),
      endDatetime: new Date('2026-06-05T18:00:00Z'),
      location: 'AndyArt Studio, Downtown',
      isVirtual: false,
      ticketPrice: 120,
      totalTickets: 10,
      remainingTickets: 6,
      image: 'https://via.placeholder.com/800x450',
      isPast: false,
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: event,
    });
  }

  console.log('✅ Events created');

  // Create Services
  const services = [
    {
      name: 'Art Consultation',
      slug: 'art-consultation',
      description: 'One-on-one session with our expert curators to help you find the perfect pieces for your space.',
      priceType: 'hourly',
      price: 150,
      icon: '🎨',
      isActive: true,
    },
    {
      name: 'Corporate Art Curation',
      slug: 'corporate-art-curation',
      description: 'Full-service art selection and installation for offices, hotels, restaurants, and commercial spaces.',
      priceType: 'quote',
      price: null,
      icon: '🏢',
      isActive: true,
    },
    {
      name: 'Paint & Sip Events',
      slug: 'paint-sip-events',
      description: 'Private or public painting events with wine and expert instruction. Perfect for team building or celebrations.',
      priceType: 'fixed',
      price: 75,
      icon: '🍷',
      isActive: true,
    },
    {
      name: 'Art Installation Services',
      slug: 'art-installation',
      description: 'Professional hanging and installation of artwork in your home or office. Includes proper placement consultation.',
      priceType: 'hourly',
      price: 100,
      icon: '🔨',
      isActive: true,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    });
  }

  console.log('✅ Services created');

  // Create a test user
  await prisma.user.upsert({
    where: { email: 'test@andyart.gallery' },
    update: {},
    create: {
      email: 'test@andyart.gallery',
      name: 'Test User',
      role: 'collector',
    },
  });

  console.log('✅ Test user created');

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
