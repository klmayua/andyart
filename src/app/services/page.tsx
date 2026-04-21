import ServiceCard from '@/components/ServiceCard';

// Mock data - will be replaced with API call
const services = [
  {
    id: '1',
    name: 'Art Consultation',
    slug: 'art-consultation',
    description: 'One-on-one session with our expert curators to help you find the perfect pieces for your space. We\'ll discuss your style, budget, and vision to create a personalized art acquisition plan.',
    priceType: 'hourly',
    price: 150,
    icon: '🎨',
    isActive: true,
  },
  {
    id: '2',
    name: 'Corporate Art Curation',
    slug: 'corporate-art-curation',
    description: 'Full-service art selection and installation for offices, hotels, restaurants, and commercial spaces. We handle everything from concept to installation.',
    priceType: 'quote',
    price: null,
    icon: '🏢',
    isActive: true,
  },
  {
    id: '3',
    name: 'Paint & Sip Events',
    slug: 'paint-sip-events',
    description: 'Private or public painting events with wine and expert instruction. Perfect for team building, celebrations, or just a fun night out.',
    priceType: 'fixed',
    price: 75,
    icon: '🍷',
    isActive: true,
  },
  {
    id: '4',
    name: 'Art Installation Services',
    slug: 'art-installation',
    description: 'Professional hanging and installation of artwork in your home or office. Includes proper placement consultation and all necessary hardware.',
    priceType: 'hourly',
    price: 100,
    icon: '🔨',
    isActive: true,
  },
  {
    id: '5',
    name: 'Art Collection Management',
    slug: 'collection-management',
    description: 'Ongoing management of your art collection including cataloging, condition reports, insurance documentation, and rotation scheduling.',
    priceType: 'quote',
    price: null,
    icon: '📋',
    isActive: true,
  },
  {
    id: '6',
    name: 'Private Viewing Sessions',
    slug: 'private-viewing',
    description: 'Exclusive after-hours gallery access for you and your guests. Enjoy wine, cheese, and personalized attention from our curators.',
    priceType: 'fixed',
    price: 500,
    icon: '🥂',
    isActive: true,
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Services
          </h1>
          <p className="text-text-secondary">
            From personalized art consultation to corporate curation and immersive events, we offer a full range of services to enhance your art experience.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>

        {/* Custom Service CTA */}
        <div className="mt-12 bg-accent rounded-lg p-8 text-center">
          <h2 className="font-serif text-2xl font-bold text-text-primary mb-4">
            Need something custom?
          </h2>
          <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
            We work with clients on unique projects and requests. Contact us to discuss your specific needs.
          </p>
          <a
            href="mailto:hello@andyart.gallery"
            className="bg-primary text-surface px-8 py-3 rounded-md font-medium hover:bg-text-primary transition-colors inline-block"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
