'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Heart, Calendar, Package, Settings, LogOut, Mail, Phone } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';

// Mock user data - will be replaced with actual auth
const user = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'collector',
  joinedDate: 'January 2024',
};

// Mock wishlist items
const wishlistItems = [
  {
    id: '1',
    title: 'Sunset Over Mountains',
    slug: 'sunset-over-mountains',
    artist: { name: 'Jane Doe', slug: 'jane-doe' },
    price: 2500,
    isPriceOnRequest: false,
    images: ['/placeholder-artwork.jpg'],
  },
  {
    id: '3',
    title: 'Abstract Emotions',
    slug: 'abstract-emotions',
    artist: { name: 'Jane Doe', slug: 'jane-doe' },
    isPriceOnRequest: true,
    price: null,
    images: ['/placeholder-artwork.jpg'],
  },
];

// Mock bookings
const bookings = [
  {
    id: '1',
    serviceName: 'Art Consultation',
    date: '2026-05-20T14:00:00Z',
    status: 'confirmed',
  },
  {
    id: '2',
    serviceName: 'Paint & Sip Events',
    date: '2026-04-15T18:00:00Z',
    status: 'completed',
  },
];

export default function ProfilePage() {
  const { wishlist, removeFromWishlist } = useAppStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'wishlist' | 'bookings' | 'settings'>('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen py-8 px-container-mobile">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-surface border border-border-light rounded-lg p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-primary text-surface rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <h1 className="font-serif text-2xl font-bold text-text-primary">{user.name}</h1>
              <p className="text-text-secondary">{user.email}</p>
              <p className="text-sm text-text-secondary mt-1">Member since {user.joinedDate}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-surface'
                    : 'bg-surface text-text-secondary hover:bg-background'
                }`}
              >
                <Icon size={18} />
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="bg-success-gold text-surface text-xs px-2 py-0.5 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-surface border border-border-light rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-success-gold">{wishlist.length}</p>
                <p className="text-sm text-text-secondary">Wishlist Items</p>
              </div>
              <div className="bg-surface border border-border-light rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-success-gold">{bookings.length}</p>
                <p className="text-sm text-text-secondary">Bookings</p>
              </div>
              <div className="bg-surface border border-border-light rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-success-gold">0</p>
                <p className="text-sm text-text-secondary">Orders</p>
              </div>
              <div className="bg-surface border border-border-light rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-success-gold">{user.role}</p>
                <p className="text-sm text-text-secondary">Account Type</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-surface border border-border-light rounded-lg p-6">
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {bookings.slice(0, 2).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between py-3 border-b border-border-light last:border-0">
                    <div>
                      <p className="font-medium text-text-primary">{booking.serviceName}</p>
                      <p className="text-sm text-text-secondary">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      booking.status === 'confirmed' ? 'bg-success-gold/10 text-success-gold' :
                      booking.status === 'completed' ? 'bg-primary/10 text-primary' :
                      'bg-text-secondary/10 text-text-secondary'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-surface border border-border-light rounded-lg p-6">
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-text-secondary">
                  <Mail size={18} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <Phone size={18} />
                  <span>Not provided</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            {wishlist.length === 0 ? (
              <div className="bg-surface border border-border-light rounded-lg p-8 text-center">
                <Heart className="w-16 h-16 text-text-secondary mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-text-primary mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-text-secondary mb-4">
                  Save artworks you love to view them later
                </p>
                <Link
                  href="/gallery"
                  className="bg-primary text-surface px-6 py-2 rounded-md font-medium hover:bg-text-primary transition-colors inline-block"
                >
                  Browse Gallery
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="bg-surface border border-border-light rounded-lg overflow-hidden">
                    <Link href={`/gallery/${item.slug}`}>
                      <div className="relative aspect-[4/5] bg-background">
                        <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
                          <span className="text-sm">Artwork</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-serif text-sm font-semibold text-text-primary truncate">{item.title}</h4>
                        <p className="text-xs text-text-secondary">{item.artist.name}</p>
                        <p className="text-sm font-medium text-success-gold">
                          {item.isPriceOnRequest ? 'On request' : `$${item.price?.toLocaleString()}`}
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-full border-t border-border-light px-3 py-2 text-sm text-error hover:bg-error hover:text-surface transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-surface border border-border-light rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-serif text-lg font-semibold text-text-primary">{booking.serviceName}</h4>
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    booking.status === 'confirmed' ? 'bg-success-gold/10 text-success-gold' :
                    booking.status === 'completed' ? 'bg-primary/10 text-primary' :
                    'bg-text-secondary/10 text-text-secondary'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">
                  {new Date(booking.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-surface border border-border-light rounded-lg p-6">
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-4">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-2 border border-border-light rounded-md focus:outline-none focus:ring-2 focus:ring-success-gold"
                  />
                </div>
                <button className="bg-primary text-surface px-6 py-2 rounded-md font-medium hover:bg-text-primary transition-colors">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-surface border border-border-light rounded-lg p-6">
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-4">Notifications</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-text-secondary">Email notifications for new artworks</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-text-secondary">Email notifications for events</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-text-secondary">Marketing communications</span>
                </label>
              </div>
            </div>

            <div className="bg-surface border border-border-light rounded-lg p-6">
              <h2 className="font-serif text-xl font-semibold text-text-primary mb-4">Danger Zone</h2>
              <button className="text-error hover:underline text-sm">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
