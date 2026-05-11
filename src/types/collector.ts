export type CollectorTier = 'patron' | 'collector' | 'curator_circle' | 'founding_member' | 'platinum';
export type CollectionStatus = 'private' | 'public' | 'curated';
export type InsuranceStatus = 'active' | 'pending' | 'expired' | 'not_insured';
export type ViewingType = 'private_preview' | 'auction_preview' | 'studio_visit' | 'gallery_tour' | 'art_fair' | 'virtual_tour';
export type DocumentType = 'certificate' | 'invoice' | 'provenance' | 'valuation' | 'insurance' | 'appraisal' | 'agreement';

export interface CollectingFocus {
  category: string;
  strength: number; // 1-5
}

export interface CollectorProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  tier: CollectorTier;
  avatar?: string;
  bio?: string;
  collectingSince: number;
  collectingFocus: CollectingFocus[];
  preferredMediums: string[];
  preferredArtists: string[];
  acquisitionBudget: 'emerging' | 'mid_market' | 'established' | 'blue_chip';
  privateAccessLevel: 'standard' | 'preferred' | 'white_glove' | 'founding';
  conciergeNotes: string;
  joinDate: string;
  lastActive: string;
  totalAcquisitions: number;
  totalSpent: number;
  favoriteViewingTypes: ViewingType[];
  preferredCurrency: string;
  location: string;
  referralSource?: string;
  newsletterConsent: boolean;
  curatedUpdates: boolean;
}

export interface ProvenanceRecord {
  id: string;
  artworkId: string;
  event: 'creation' | 'gallery_sale' | 'auction' | 'private_sale' | 'gift' | 'inheritance' | 'exhibition';
  from: string;
  to: string;
  date: string;
  location: string;
  documentation?: string;
  verified: boolean;
}

export interface AcquisitionRecord {
  id: string;
  collectorId: string;
  artworkId: string;
  artworkTitle: string;
  artistName: string;
  acquisitionDate: string;
  purchasePrice: number;
  currency: string;
  source: 'gallery' | 'auction' | 'studio_visit' | 'art_fair' | 'private_sale' | 'inheritance' | 'gift';
  provenance: ProvenanceRecord[];
  currentValuation?: number;
  valuationDate?: string;
  insuranceStatus: InsuranceStatus;
  insurancePolicy?: string;
  insuranceExpiry?: string;
  displayLocation?: string;
  framingStatus?: 'framed' | 'unframed' | 'in_storage';
  notes?: string;
  rating?: number; // 1-5
}

export interface CollectorCollection {
  id: string;
  collectorId: string;
  name: string;
  description: string;
  status: CollectionStatus;
  artworks: string[]; // artwork IDs
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
  isDefault: boolean;
}

export interface CertificateOfAuthenticity {
  id: string;
  certificateId: string;
  verificationCode: string;
  artworkId: string;
  artworkTitle: string;
  artistName: string;
  artistSignature?: string;
  yearCreated: number;
  medium: string;
  dimensions?: string;
  edition?: string;
  provenanceChain: string;
  issuedDate: string;
  issuedBy: string;
  collectorName: string;
  collectorId: string;
  digitalSignature?: string;
  blockchainRef?: string;
  downloadUrl?: string;
}

export interface ViewingHistory {
  id: string;
  collectorId: string;
  artworkId?: string;
  viewingType: ViewingType;
  date: string;
  location: string;
  curatorName?: string;
  notes?: string;
  collectorRating?: number;
  attended: boolean;
  invitationSent: boolean;
  feedback?: string;
}

export interface WishlistItem {
  id: string;
  collectorId: string;
  artworkId: string;
  artworkTitle: string;
  artistName: string;
  artworkImage?: string;
  price?: number;
  addedAt: string;
  priority: 'low' | 'medium' | 'high' | 'acquiring';
  notifyAvailable: boolean;
  conciergeFollowUp: boolean;
  notes?: string;
}

export interface VaultDocument {
  id: string;
  collectorId: string;
  type: DocumentType;
  title: string;
  artworkId?: string;
  artworkTitle?: string;
  fileUrl?: string;
  uploadedAt: string;
  size?: number;
  description?: string;
}

export interface CollectorVault {
  collectorId: string;
  documents: VaultDocument[];
  totalDocuments: number;
  lastUpdated: string;
}

export const COLLECTOR_TIER_LABELS: Record<CollectorTier, string> = {
  patron: 'Patron',
  collector: 'Collector',
  curator_circle: 'Curator Circle',
  founding_member: 'Founding Member',
  platinum: 'Platinum',
};

export const COLLECTOR_TIER_COLORS: Record<CollectorTier, string> = {
  patron: 'text-gray-500',
  collector: 'text-blue-600',
  curator_circle: 'text-andy-gold',
  founding_member: 'text-andy-black',
  platinum: 'text-purple-700',
};

export const VIEWING_TYPE_LABELS: Record<ViewingType, string> = {
  private_preview: 'Private Preview',
  auction_preview: 'Auction Preview',
  studio_visit: 'Studio Visit',
  gallery_tour: 'Gallery Tour',
  art_fair: 'Art Fair',
  virtual_tour: 'Virtual Tour',
};