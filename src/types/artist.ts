export type ArtistStatus = 'active' | 'inactive' | 'pending_onboarding' | 'suspended';
export type AvailabilityStatus = 'available' | 'in_studio' | 'traveling' | 'commission_only' | 'not_accepting';
export type ArtworkOwnershipStatus = 'artist_owned' | 'gallery_consigned' | 'sold' | 'reserved' | 'on_loan' | 'in_transit';
export type ConsignmentStatus = 'intake_pending' | 'in_gallery' | 'sold' | 'returned' | 'expired';
export type CommissionStatus = 'inquiry' | 'brief_pending' | 'contract_sent' | 'in_progress' | 'milestone_1' | 'milestone_2' | 'milestone_3' | 'review' | 'approved' | 'delivered' | 'cancelled';
export type ExhibitionStatus = 'upcoming' | 'active' | 'past' | 'cancelled';
export type PayoutStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'on_hold';
export type MediumCategory = 'painting' | 'sculpture' | 'photography' | 'digital' | 'mixed_media' | 'installation' | 'ceramics' | 'textile' | 'printmaking' | 'drawing';

export interface ArtistProfile {
  id: string;
  userId: string;
  email: string;
  name: string;
  slug: string;
  avatar?: string;
  biography: string;
  artistStatement: string;
  mediums: MediumCategory[];
  yearsActive: number;
  birthYear?: number;
  birthPlace?: string;
  basedIn: string;
  studioLocation: string;
  availabilityStatus: AvailabilityStatus;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    website?: string;
    linkedin?: string;
  };
  exhibitions: {
    title: string;
    venue: string;
    location: string;
    year: number;
    type: 'solo' | 'group' | 'fair' | 'biennial';
  }[];
  awards: {
    title: string;
    organization: string;
    year: number;
    description?: string;
  }[];
  collectionsFeaturedIn: string[];
  education?: {
    institution: string;
    degree: string;
    year: number;
  }[];
  status: ArtistStatus;
  joinDate: string;
  lastActive: string;
  totalWorks: number;
  totalSold: number;
  totalRevenue: number;
  averageWorkPrice: number;
  collectorCount: number;
  commissionRate: number; // gallery split %
  insuranceCoverage: boolean;
  verifiedIdentity: boolean;
  contractSigned: boolean;
  notes?: string;
}

export interface StudioProfile {
  id: string;
  artistId: string;
  name: string;
  address: string;
  city: string;
  country: string;
  size?: string;
  type: 'private' | 'shared' | 'residency' | 'commercial';
  accessibleToVisitors: boolean;
  hasClimateControl: boolean;
  hasSecurity: boolean;
  photoUrls?: string[];
  description?: string;
  openingHours?: string;
  contactPhone?: string;
  contactEmail?: string;
}

export interface ArtworkInventory {
  id: string;
  artistId: string;
  title: string;
  slug: string;
  medium: MediumCategory;
  dimensions?: string;
  year: number;
  edition?: string;
  price: number;
  currency: string;
  status: ArtworkOwnershipStatus;
  consignmentId?: string;
  images: string[];
  description?: string;
  provenance: string;
  createdAt: string;
  updatedAt: string;
  listedAt?: string;
  soldAt?: string;
  soldPrice?: number;
  collectorId?: string;
  collectorName?: string;
  galleryNotes?: string;
  tags: string[];
}

export interface ConsignmentAgreement {
  id: string;
  artistId: string;
  artistName: string;
  agreementNumber: string;
  artworkId: string;
  artworkTitle: string;
  intakeDate: string;
  endDate: string;
  splitPercentage: number; // artist gets this %
  insuranceStatus: 'insured' | 'pending' | 'not_insured';
  insuranceValue?: number;
  releaseTerms: string;
  status: ConsignmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  soldDate?: string;
  soldPrice?: number;
}

export interface CommissionMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completedAt?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  deliverables?: string[];
  collectorFeedback?: string;
}

export interface ArtistCommission {
  id: string;
  artistId: string;
  artistName: string;
  collectorId: string;
  collectorName: string;
  commissionNumber: string;
  brief: string;
  budget: number;
  currency: string;
  startDate: string;
  targetDeliveryDate: string;
  actualDeliveryDate?: string;
  status: CommissionStatus;
  milestones: CommissionMilestone[];
  approvals: {
    stage: string;
    approvedBy: string;
    approvedAt: string;
    notes?: string;
  }[];
  collectorFeedback?: string;
  finalImages?: string[];
  contractUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExhibitionParticipation {
  id: string;
  artistId: string;
  artistName: string;
  exhibitionId: string;
  exhibitionTitle: string;
  venue: string;
  location: string;
  startDate: string;
  endDate: string;
  status: ExhibitionStatus;
  artworksSubmitted: string[];
  artworksAccepted: string[];
  artworksSold: number;
  totalSales: number;
  attendanceEstimate?: number;
  collectorInterestCount: number;
  marketingSupport: boolean;
  shippingProvided: boolean;
  insuranceProvided: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArtistPayout {
  id: string;
  artistId: string;
  artistName: string;
  payoutNumber: string;
  periodStart: string;
  periodEnd: string;
  totalSales: number;
  commissionSplits: {
    artworkId: string;
    artworkTitle: string;
    grossAmount: number;
    galleryFee: number;
    artistShare: number;
  }[];
  grossAmount: number;
  galleryFee: number;
  platformFee: number;
  taxWithheld: number;
  netAmount: number;
  currency: string;
  status: PayoutStatus;
  processedAt?: string;
  paymentMethod?: string;
  paymentReference?: string;
  taxDocumentUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArtistAnalytics {
  artistId: string;
  period: string; // e.g. "2024-Q1"
  profileViews: number;
  artworkViews: number;
  inquiryCount: number;
  inquiryRate: number; // %
  salesVolume: number;
  salesCount: number;
  averageSalePrice: number;
  collectorInterest: {
    collectorId: string;
    collectorName: string;
    interestScore: number;
    lastInteraction: string;
  }[];
  topPerformingWorks: {
    artworkId: string;
    artworkTitle: string;
    views: number;
    inquiries: number;
    sales: number;
    revenue: number;
  }[];
  mediumPerformance: {
    medium: MediumCategory;
    views: number;
    inquiries: number;
    sales: number;
    revenue: number;
  }[];
  geographicReach: {
    country: string;
    collectors: number;
    sales: number;
  }[];
  updatedAt: string;
}

export const AVAILABILITY_LABELS: Record<AvailabilityStatus, string> = {
  available: 'Available',
  in_studio: 'In Studio',
  traveling: 'Traveling',
  commission_only: 'Commissions Only',
  not_accepting: 'Not Accepting',
};

export const ARTIST_STATUS_LABELS: Record<ArtistStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  pending_onboarding: 'Pending Onboarding',
  suspended: 'Suspended',
};

export const COMMISSION_STATUS_LABELS: Record<CommissionStatus, string> = {
  inquiry: 'Inquiry',
  brief_pending: 'Brief Pending',
  contract_sent: 'Contract Sent',
  in_progress: 'In Progress',
  milestone_1: 'Milestone 1',
  milestone_2: 'Milestone 2',
  milestone_3: 'Milestone 3',
  review: 'Under Review',
  approved: 'Approved',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const PAYOUT_STATUS_LABELS: Record<PayoutStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  on_hold: 'On Hold',
};

export const CONSIGNMENT_STATUS_LABELS: Record<ConsignmentStatus, string> = {
  intake_pending: 'Intake Pending',
  in_gallery: 'In Gallery',
  sold: 'Sold',
  returned: 'Returned',
  expired: 'Expired',
};

export const OWNERSHIP_STATUS_LABELS: Record<ArtworkOwnershipStatus, string> = {
  artist_owned: 'Artist Owned',
  gallery_consigned: 'Gallery Consigned',
  sold: 'Sold',
  reserved: 'Reserved',
  on_loan: 'On Loan',
  in_transit: 'In Transit',
};

export const MEDIUM_LABELS: Record<MediumCategory, string> = {
  painting: 'Painting',
  sculpture: 'Sculpture',
  photography: 'Photography',
  digital: 'Digital',
  mixed_media: 'Mixed Media',
  installation: 'Installation',
  ceramics: 'Ceramics',
  textile: 'Textile',
  printmaking: 'Printmaking',
  drawing: 'Drawing',
};
