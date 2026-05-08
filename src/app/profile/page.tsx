'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Heart, Calendar, Package, Settings, LogOut, Mail, Phone, Star, Crown, Gem } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'collector',
  joinedDate: 'January 2024',
  tier: 'Gold',
};

const wishlistItems = [
  {
    id: '1',
    title: 'Sunset Over Mountains',
    slug: 'sunset-over-mountains',
    artist: { name: 'Ngozi Okeke', slug: 'ngozi-okeke' },
    price: 2500,
    isPriceOnRequest: false,
    images: ['/placeholder-artwork.jpg'],
  },
  {
    id: '3',
    title: 'Abstract Emotions',
    slug: 'abstract-emotions',
    artist: { name: 'Kofi Asante', slug: 'kofi-asante' },
    isPriceOnRequest: true,
    price: null,
    images: ['/placeholder-artwork.jpg'],
  },
];

const bookings = [
  {
    id: '1',
    serviceName: 'Private Viewing',
    date: '2026-05-20T14:00:00Z',
    status: 'confirmed',
  },
  {
    id: '2',
    serviceName: 'Art and Wine Evening',
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

  const tierIcon = user.tier === 'Black' ? Crown : user.tier === 'Gold' ? Gem : Star;
  const tierColor = user.tier === 'Black' ? 'text-andy-black bg-andy-gold' : user.tier === 'Gold' ? 'text-andy-black bg-andy-gold' : 'text-andy-bronze bg-andy-stone';

  return (
    <div className="min-h-screen py-8 px-4 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white border border-andy-stone/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-andy-black text-andy-ivory rounded-full flex items-center justify-center text-2xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-andy-black">{user.name}</h1>
                <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${tierColor}`}>
                  {user.tier}
                </span>
              </div>
              <p className="text-andy-bronze text-sm">{user.email}</p>
              <p className="text-xs text-andy-bronze mt-1">Circle member since {user.joinedDate}</p>
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
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium whitespace-nowrap transition-all text-sm ${
                  activeTab === tab.id
                    ? 'bg-andy-black text-andy-ivory'
                    : 'bg-white text-andy-bronze hover:bg-andy-stone/20 border border-andy-stone/20'
                }`}
              >
                <Icon size={16} />
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="bg-andy-gold text-andy-black text-xs px-2 py-0.5 rounded-full font-bold">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-andy-stone/30 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-andy-gold">{wishlist.length}</p>
                <p className="text-xs text-andy-bronze uppercase tracking-wider">Wishlist</p>
              </div>
              <div className="bg-white border border-andy-stone/30 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-andy-gold">{bookings.length}</p>
                <p className="text-xs text-andy-bronze uppercase tracking-wider">Bookings</p>
              </div>
              <div className="bg-white border border-andy-stone/30 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-andy-gold">0</p>
                <p className="text-xs text-andy-bronze uppercase tracking-wider">Orders</p>
              </div>
              <div className="bg-white border border-andy-stone/30 rounded-2xl p-4 text-center">
                <p className="text-2xl font-bold text-andy-gold">{user.tier}</p>
                <p className="text-xs text-andy-bronze uppercase tracking-wider">Tier</p>
              </div>
            </div>

            <div className="bg-white border border-andy-stone/30 rounded-2xl p-6">
              <h2 className="font-serif text-xl font-semibold text-andy-black mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {bookings.slice(0, 2).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between py-3 border-b border-andy-stone/20 last:border-0">
                    <div>
                      <p className="font-medium text-andy-black text-sm">{booking.serviceName}</p>
                      <p className="text-xs text-andy-bronze">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      booking.status === 'confirmed' ? 'bg-andy-gold/10 text-andy-bronze' :
                      booking.status === 'completed' ? 'bg-andy-green/10 text-andy-green' :
                      'bg-andy-stone/20 text-andy-bronze'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-andy-stone/30 rounded-2xl p-6">
              <h2 className="font-serif text-xl font-semibold text-andy-black mb-4">Contact</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-andy-bronze text-sm">
                  <Mail size={16} />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-andy-bronze text-sm">
                  <Phone size={16} />
                  <span>Not provided</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            {wishlist.length === 0 ? (
              <div className="bg-white border border-andy-stone/30 rounded-2xl p-8 text-center">
                <Heart className="w-16 h-16 text-andy-stone mx-auto mb-4" />
                <h3 className="font-serif text-xl font-semibold text-andy-black mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-andy-bronze mb-4 text-sm">
                  Save artworks you love to view them later
                </p>
                <Link
                  href="/gallery"
                  className="bg-andy-black text-andy-ivory px-6 py-2 rounded-full font-medium hover:bg-andy-black/80 transition-colors inline-block text-sm"
                >
                  Browse Collection
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="bg-white border border-andy-stone/30 rounded-2xl overflow-hidden">
                    <Link href={`/gallery/${item.slug}`}>
                      <div className="relative aspect-[4/5] bg-andy-stone/20">
                        <div className="absolute inset-0 flex items-center justify-center text-andy-bronze">
                          <span className="text-sm">Artwork</span>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-serif text-sm font-semibold text-andy-black truncate">{item.title}</h4>
                        <p className="text-xs text-andy-bronze">{item.artist.name}</p>
                        <p className="text-sm font-medium text-andy-gold">
                          {item.isPriceOnRequest ? 'On request' : `$${item.price?.toLocaleString()}`}
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="w-full border-t border-andy-stone/20 px-3 py-2 text-sm text-andy-wine hover:bg-andy-wine/5 transition-colors"
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
              <div key={booking.id} className="bg-white border border-andy-stone/30 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-serif text-lg font-semibold text-andy-black">{booking.serviceName}</h4>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    booking.status === 'confirmed' ? 'bg-andy-gold/10 text-andy-bronze' :
                    booking.status === 'completed' ? 'bg-andy-green/10 text-andy-green' :
                    'bg-andy-stone/20 text-andy-bronze'
                  }`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-andy-bronze">
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
            <div className="bg-white border border-andy-stone/30 rounded-2xl p-6">
              <h2 className="font-serif text-xl font-semibold text-andy-black mb-4">Account</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-andy-black mb-1">Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-andy-black mb-1">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-2 border border-andy-stone/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50"
                  />
                </div>
                <button className="bg-andy-black text-andy-ivory px-6 py-2 rounded-full font-medium hover:bg-andy-black/80 transition-colors text-sm">
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-white border border-andy-stone/30 rounded-2xl p-6">
              <h2 className="font-serif text-xl font-semibold text-andy-black mb-4">Notifications</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-andy-gold" />
                  <span className="text-andy-bronze text-sm">New artwork alerts</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-andy-gold" />
                  <span className="text-andy-bronze text-sm">Experience invitations</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-4 h-4 accent-andy-gold" />
                  <span className="text-andy-bronze text-sm">Journal updates</span>
                </label>
              </div>
            </div>

            <div className="bg-white border border-andy-stone/30 rounded-2xl p-6">
              <h2 className="font-serif text-xl font-semibold text-andy-black mb-4">Danger Zone</h2>
              <button className="text-andy-wine hover:underline text-sm">
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
