'use client';

import { ConversionModalProvider } from '@/hooks/useConversionModal';
import { useSurfaceGuard } from '@/hooks/useSurfaceGuard';
import InquiryModal from '@/components/conversion/InquiryModal';
import ReserveModal from '@/components/conversion/ReserveModal';
import PrivateViewingModal from '@/components/conversion/PrivateViewingModal';
import CommissionBriefModal from '@/components/conversion/CommissionBriefModal';
import ConciergeModal from '@/components/conversion/ConciergeModal';
import EventRSVPModal from '@/components/conversion/EventRSVPModal';

export default function ConversionLayer() {
  const { isPublicSurface } = useSurfaceGuard();
  if (!isPublicSurface) return null;

  return (
    <ConversionModalProvider>
      <ConversionModals />
    </ConversionModalProvider>
  );
}

function ConversionModals() {
  const { modal, close } = useConversionModal();

  if (!modal) return null;

  const d = modal.data as Record<string, string | number | boolean | undefined>;

  switch (modal.type) {
    case 'inquiry':
      return (
        <InquiryModal
          isOpen={modal.isOpen}
          onClose={close}
          artworkTitle={String(d.artworkTitle || '')}
          artworkSlug={String(d.artworkSlug || '')}
          artworkPrice={typeof d.artworkPrice === 'number' ? d.artworkPrice : null}
          isPriceOnRequest={Boolean(d.isPriceOnRequest)}
        />
      );
    case 'reserve':
      return (
        <ReserveModal
          isOpen={modal.isOpen}
          onClose={close}
          artworkTitle={String(d.artworkTitle || '')}
          artworkSlug={String(d.artworkSlug || '')}
          artworkPrice={typeof d.artworkPrice === 'number' ? d.artworkPrice : null}
        />
      );
    case 'privateViewing':
      return (
        <PrivateViewingModal
          isOpen={modal.isOpen}
          onClose={close}
          contextTitle={String(d.contextTitle || '')}
          contextSlug={d.contextSlug ? String(d.contextSlug) : undefined}
          contextType={(d.contextType as 'artwork' | 'artist' | 'collection' | 'viewing-room') || 'artwork'}
        />
      );
    case 'commission':
      return (
        <CommissionBriefModal
          isOpen={modal.isOpen}
          onClose={close}
          artistName={d.artistName ? String(d.artistName) : undefined}
          artistSlug={d.artistSlug ? String(d.artistSlug) : undefined}
          contextTitle={d.contextTitle ? String(d.contextTitle) : undefined}
        />
      );
    case 'concierge':
      return (
        <ConciergeModal
          isOpen={modal.isOpen}
          onClose={close}
          context={d.context ? String(d.context) : undefined}
        />
      );
    case 'rsvp':
      return (
        <EventRSVPModal
          isOpen={modal.isOpen}
          onClose={close}
          eventTitle={String(d.eventTitle || '')}
          eventSlug={String(d.eventSlug || '')}
          ticketPrice={typeof d.ticketPrice === 'number' ? d.ticketPrice : null}
          totalPrice={typeof d.totalPrice === 'number' ? d.totalPrice : undefined}
          remainingTickets={d.remainingTickets !== undefined ? (d.remainingTickets as number | null) : undefined}
        />
      );
    default:
      return null;
  }
}
