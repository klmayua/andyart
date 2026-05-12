'use client';

import { usePathname } from 'next/navigation';

/**
 * Surface Guard — Prevent public navigation components from rendering
 * on protected operational surfaces (ops, collector, artist portal, checkout).
 * 
 * This ensures the luxury public experience never bleeds into
 * institutional, private, or transactional surfaces.
 */

const PROTECTED_PREFIXES = [
  '/ops',
  '/collector',
  '/checkout',
];

const PROTECTED_ARTIST_ROUTES = [
  '/artists/portal',
  '/artists/profile',
  '/artists/inventory',
  '/artists/consignments',
  '/artists/commissions',
  '/artists/exhibitions',
  '/artists/payouts',
  '/artists/analytics',
];

export function useSurfaceGuard(): { isPublicSurface: boolean; isProtectedSurface: boolean } {
  const pathname = usePathname() || '';

  const isProtectedPrefix = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isProtectedArtist = PROTECTED_ARTIST_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedSurface = isProtectedPrefix || isProtectedArtist;
  const isPublicSurface = !isProtectedSurface;

  return { isPublicSurface, isProtectedSurface };
}
