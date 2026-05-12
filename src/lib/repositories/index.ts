import { prisma } from '@/lib/prisma';

export const ArtistRepository = {
  async findById(id: string) {
    return prisma.artist.findUnique({
      where: { id },
      include: {
        studio: true,
        inventory: true,
        consignments: true,
        commissions: { include: { milestones: true, approvals: true } },
        exhibitions: true,
        payouts: { include: { splits: true } },
        artistAwards: true,
        artistEducations: true,
        artistExhibitions: true,
      },
    });
  },

  async findBySlug(slug: string) {
    return prisma.artist.findUnique({
      where: { slug },
      include: { studio: true, inventory: true, artworks: true },
    });
  },

  async findAll(opts?: { status?: string; limit?: number; offset?: number }) {
    return prisma.artist.findMany({
      where: opts?.status ? { status: opts.status } : undefined,
      take: opts?.limit,
      skip: opts?.offset,
      orderBy: { joinDate: 'desc' },
    });
  },

  async create(data: any) {
    return prisma.artist.create({ data });
  },

  async update(id: string, data: any) {
    return prisma.artist.update({ where: { id }, data });
  },

  async getStats(id: string) {
    const [inventory, commissions, exhibitions, payouts] = await Promise.all([
      prisma.artistInventory.groupBy({
        by: ['status'],
        where: { artistId: id },
        _count: { status: true },
      }),
      prisma.commission.count({ where: { artistId: id } }),
      prisma.exhibitionParticipation.count({ where: { artistId: id } }),
      prisma.artistPayout.aggregate({
        where: { artistId: id, status: 'completed' },
        _sum: { netAmount: true },
      }),
    ]);

    const totalWorks = inventory.reduce((s, i) => s + i._count.status, 0);
    const available = inventory.find((i) => i.status === 'artist_owned' || i.status === 'gallery_consigned')?._count.status || 0;
    const sold = inventory.find((i) => i.status === 'sold')?._count.status || 0;

    return { totalWorks, available, sold, commissions, exhibitions, totalPayouts: payouts._sum.netAmount || 0 };
  },
};

export const InventoryRepository = {
  async findByArtist(artistId: string) {
    return prisma.artistInventory.findMany({
      where: { artistId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findById(id: string) {
    return prisma.artistInventory.findUnique({ where: { id } });
  },

  async create(data: any) {
    return prisma.artistInventory.create({ data });
  },

  async update(id: string, data: any) {
    return prisma.artistInventory.update({ where: { id }, data });
  },

  async getStats(artistId: string) {
    const items = await prisma.artistInventory.findMany({ where: { artistId } });
    const available = items.filter((i) => i.status === 'artist_owned' || i.status === 'gallery_consigned');
    const sold = items.filter((i) => i.status === 'sold');
    return {
      total: items.length,
      available: available.length,
      sold: sold.length,
      totalValue: available.reduce((s, i) => s + i.price, 0),
      totalRevenue: sold.reduce((s, i) => s + (i.soldPrice || i.price), 0),
    };
  },
};

export const ConsignmentRepository = {
  async findByArtist(artistId: string) {
    return prisma.consignment.findMany({
      where: { artistId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findAll() {
    return prisma.consignment.findMany({ orderBy: { createdAt: 'desc' } });
  },

  async findExpiringSoon(days: number = 60) {
    const cutoff = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    return prisma.consignment.findMany({
      where: {
        status: 'in_gallery',
        endDate: { lte: cutoff },
      },
      orderBy: { endDate: 'asc' },
    });
  },
};

export const CommissionRepository = {
  async findByArtist(artistId: string) {
    return prisma.commission.findMany({
      where: { artistId },
      include: { milestones: true, approvals: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findAll() {
    return prisma.commission.findMany({
      include: { milestones: true, approvals: true },
      orderBy: { createdAt: 'desc' },
    });
  },
};

export const ExhibitionRepository = {
  async findByArtist(artistId: string) {
    return prisma.exhibitionParticipation.findMany({
      where: { artistId },
      orderBy: { startDate: 'desc' },
    });
  },

  async findAll() {
    return prisma.exhibitionParticipation.findMany({ orderBy: { startDate: 'desc' } });
  },

  async findUpcoming(days: number = 90) {
    const cutoff = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    return prisma.exhibitionParticipation.findMany({
      where: {
        status: 'upcoming',
        startDate: { lte: cutoff },
      },
      orderBy: { startDate: 'asc' },
    });
  },
};

export const PayoutRepository = {
  async findByArtist(artistId: string) {
    return prisma.artistPayout.findMany({
      where: { artistId },
      include: { splits: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findAll() {
    return prisma.artistPayout.findMany({
      include: { splits: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findPending() {
    return prisma.artistPayout.findMany({
      where: { status: { in: ['pending', 'processing'] } },
      include: { splits: true },
      orderBy: { createdAt: 'desc' },
    });
  },
};

export const CollectorRepository = {
  async findById(id: string) {
    return prisma.collectorProfile.findUnique({
      where: { id },
      include: { acquisitions: true, certificates: true, viewings: true, wishlist: true },
    });
  },

  async findByEmail(email: string) {
    return prisma.collectorProfile.findUnique({ where: { email } });
  },

  async findAll(opts?: { limit?: number; offset?: number }) {
    return prisma.collectorProfile.findMany({
      take: opts?.limit,
      skip: opts?.offset,
      orderBy: { joinDate: 'desc' },
    });
  },
};

export const PaymentRepository = {
  async findById(id: string) {
    return prisma.paymentIntent.findUnique({ where: { id } });
  },

  async findByCollector(collectorId: string) {
    return prisma.paymentIntent.findMany({
      where: { collectorId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findAll(opts?: { status?: string; limit?: number }) {
    return prisma.paymentIntent.findMany({
      where: opts?.status ? { status: opts.status } : undefined,
      take: opts?.limit,
      orderBy: { createdAt: 'desc' },
    });
  },

  async create(data: any) {
    return prisma.paymentIntent.create({ data });
  },

  async updateStatus(id: string, status: string, completedAt?: Date) {
    return prisma.paymentIntent.update({
      where: { id },
      data: { status, completedAt },
    });
  },
};

export const InvoiceRepository = {
  async findById(id: string) {
    return prisma.invoice.findUnique({ where: { id } });
  },

  async findByCollector(collectorId: string) {
    return prisma.invoice.findMany({
      where: { collectorId },
      orderBy: { issuedDate: 'desc' },
    });
  },

  async findAll() {
    return prisma.invoice.findMany({ orderBy: { issuedDate: 'desc' } });
  },
};

export const EscrowRepository = {
  async findById(id: string) {
    return prisma.escrowCase.findUnique({ where: { id } });
  },

  async findAll() {
    return prisma.escrowCase.findMany({ orderBy: { createdAt: 'desc' } });
  },
};

export const LeadRepository = {
  async findById(id: string) {
    return prisma.lead.findUnique({ where: { id } });
  },

  async findAll(opts?: { temperature?: string; status?: string; limit?: number }) {
    return prisma.lead.findMany({
      where: {
        temperature: opts?.temperature,
        status: opts?.status,
      },
      take: opts?.limit,
      orderBy: { createdAt: 'desc' },
    });
  },

  async create(data: any) {
    return prisma.lead.create({ data });
  },

  async update(id: string, data: any) {
    return prisma.lead.update({ where: { id }, data });
  },
};

export const ConciergeRepository = {
  async findRequests(opts?: { status?: string; priority?: string }) {
    return prisma.conciergeRequest.findMany({
      where: { status: opts?.status, priority: opts?.priority },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findBookings(opts?: { status?: string }) {
    return prisma.conciergeBooking.findMany({
      where: { status: opts?.status },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findCommissions(opts?: { status?: string }) {
    return prisma.conciergeCommission.findMany({
      where: { status: opts?.status },
      orderBy: { createdAt: 'desc' },
    });
  },

  async findVips() {
    return prisma.vipProfile.findMany({ orderBy: { totalSpent: 'desc' } });
  },
};

export const NotificationRepository = {
  async findByUser(userId: string, opts?: { unreadOnly?: boolean; limit?: number }) {
    return prisma.notification.findMany({
      where: {
        userId,
        read: opts?.unreadOnly ? false : undefined,
      },
      take: opts?.limit,
      orderBy: { createdAt: 'desc' },
    });
  },

  async markRead(id: string) {
    return prisma.notification.update({ where: { id }, data: { read: true } });
  },

  async markAllRead(userId: string) {
    return prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
  },

  async getUnreadCount(userId: string) {
    return prisma.notification.count({ where: { userId, read: false } });
  },
};

export const AuditRepository = {
  async create(data: any) {
    return prisma.auditLog.create({ data });
  },

  async findByUser(userId: string, opts?: { limit?: number }) {
    return prisma.auditLog.findMany({
      where: { userId },
      take: opts?.limit,
      orderBy: { createdAt: 'desc' },
    });
  },
};
