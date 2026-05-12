import { ArtistRepository, ConsignmentRepository, PayoutRepository, ExhibitionRepository, CommissionRepository, InventoryRepository } from '@/lib/repositories';
import OpsArtistsClient from './OpsArtistsClient';

export const dynamic = 'force-dynamic';

export default async function OpsArtistsPage() {
  const [artists, consignments, payouts, exhibitions, commissions] = await Promise.all([
    ArtistRepository.findAll(),
    ConsignmentRepository.findAll(),
    PayoutRepository.findAll(),
    ExhibitionRepository.findAll(),
    CommissionRepository.findAll(),
  ]);

  const inventoryHealth = await Promise.all(
    artists.map(async (a) => {
      const stats = await InventoryRepository.getStats(a.id);
      return { ...a, ...stats, health: stats.available > 0 ? 'healthy' : stats.sold > 0 ? 'sold_out' : 'empty' };
    })
  );

  const expiryAlerts = await ConsignmentRepository.findExpiringSoon(60);
  const payoutQueue = await PayoutRepository.findPending();
  const upcomingExhibitions = await ExhibitionRepository.findUpcoming(90);

  return (
    <OpsArtistsClient
      artists={artists}
      consignments={consignments}
      payouts={payouts}
      exhibitions={exhibitions}
      commissions={commissions}
      inventoryHealth={inventoryHealth}
      expiryAlerts={expiryAlerts}
      payoutQueue={payoutQueue}
      upcomingExhibitions={upcomingExhibitions}
    />
  );
}
