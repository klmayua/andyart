// Image Configuration for AndyArt Gallery
// Using YOUR actual artwork images from public/images folder

export const IMAGES = {
  // Hero background - artistic abstract pattern
  hero: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1920',
  
  // Artwork images - YOUR actual images
  artworks: [
    {
      id: '1',
      title: 'Abstract Sunset',
      image: '/images/WhatsApp Image 2026-04-22 at 02.59.50.jpeg',
    },
    {
      id: '2',
      title: 'Urban Dreams',
      image: '/images/WhatsApp Image 2026-04-22 at 02.59.51.jpeg',
    },
    {
      id: '3',
      title: 'Modern Art',
      image: '/images/WhatsApp Image 2026-04-22 at 02.59.52.jpeg',
    },
    {
      id: '4',
      title: 'Contemporary Piece',
      image: '/images/WhatsApp Image 2026-04-22 at 02.59.52 (1).jpeg',
    },
    {
      id: '5',
      title: 'Artistic Vision',
      image: '/images/WhatsApp Image 2026-04-22 at 02.59.52 (2).jpeg',
    },
    {
      id: '6',
      title: 'Creative Expression',
      image: '/images/WhatsApp Image 2026-04-22 at 02.59.49.jpeg',
    },
  ],

  // Event images - artistic event backgrounds from Unsplash
  events: [
    {
      title: 'Paint & Sip: Sunset Edition',
      image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800',
    },
    {
      title: 'Artist Talk: Contemporary Visions',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
    },
  ],

  // Service icons (using Lucide React icon names)
  services: [
    { name: 'Art Consultation', icon: 'Paintbrush' },
    { name: 'Corporate Curation', icon: 'Building' },
    { name: 'Paint & Sip Events', icon: 'Wine' },
  ],
};
