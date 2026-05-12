'use client';

import { useState, useEffect } from 'react';
import { getArtistProfile, getAllArtists } from '@/lib/artist';
import type { ArtistProfile } from '@/types/artist';

export function useCurrentArtistId(): string | null {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const auth = localStorage.getItem('andyart_current_artist_id');
    if (auth) {
      setId(auth);
      return;
    }
    // fallback: first artist in system for demo
    const artists = getAllArtists();
    if (artists.length > 0) {
      const fallback = artists[0].id;
      localStorage.setItem('andyart_current_artist_id', fallback);
      setId(fallback);
    }
  }, []);
  return id;
}

export function useCurrentArtist(): ArtistProfile | null {
  const id = useCurrentArtistId();
  const [artist, setArtist] = useState<ArtistProfile | null>(null);
  useEffect(() => {
    if (!id) return;
    setArtist(getArtistProfile(id));
  }, [id]);
  return artist;
}
