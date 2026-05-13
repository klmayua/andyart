'use client';

import { useCallback } from 'react';

export type AnalyticsEvent =
  | 'artwork_inquire'
  | 'artwork_reserve'
  | 'newsletter_subscribe'
  | 'artwork_private_viewing'
  | 'artwork_talk_curator'
  | 'artwork_wishlist_add'
  | 'artwork_wishlist_remove'
  | 'artist_follow'
  | 'artist_commission'
  | 'artist_acquire'
  | 'event_rsvp'
  | 'event_vip_preview'
  | 'event_sponsor_inquiry'
  | 'service_book'
  | 'service_call_concierge'
  | 'service_talk_specialist'
  | 'filter_apply'
  | 'sort_apply'
  | 'cta_click';

interface AnalyticsProperties {
  page?: string;
  slug?: string;
  title?: string;
  category?: string;
  filter?: string;
  sort?: string;
  value?: number;
  [key: string]: unknown;
}

export function useAnalytics() {
  const track = useCallback((event: AnalyticsEvent, properties: AnalyticsProperties = {}) => {
    const payload = {
      event,
      timestamp: new Date().toISOString(),
      properties: {
        url: typeof window !== 'undefined' ? window.location.href : '',
        ...properties,
      },
    };

    // Console log for development visibility
    // eslint-disable-next-line no-console
    console.log('[Analytics]', payload);

    // Window data layer for future GTM/GA4 integration
    if (typeof window !== 'undefined') {
      // @ts-expect-error dataLayer may not exist
      window.dataLayer = window.dataLayer || [];
      // @ts-expect-error dataLayer push
      window.dataLayer.push(payload);
    }
  }, []);

  return { track };
}
