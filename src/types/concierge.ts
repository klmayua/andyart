export type RequestType =
  | 'artwork_inquiry'
  | 'acquisition_advisory'
  | 'commission_request'
  | 'private_viewing'
  | 'interior_curation'
  | 'hospitality_design'
  | 'bespoke_sourcing'
  | 'event_booking'
  | 'vip_collectors_circle';

export type RequestStatus =
  | 'new'
  | 'qualified'
  | 'assigned'
  | 'proposal_sent'
  | 'negotiating'
  | 'confirmed'
  | 'fulfilled'
  | 'archived';

export type PriorityLevel = 'standard' | 'priority' | 'vip' | 'executive';

export type RequestSource = 'whatsapp' | 'website' | 'phone' | 'referral' | 'event' | 'gallery' | 'email';

export type ViewingType = 'virtual' | 'in_gallery' | 'private_home' | 'corporate_consult' | 'commission_consultation';

export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  country: string;
  city?: string;
  tier: 'standard' | 'collector' | 'premium' | 'vip';
  tasteProfile?: string[];
  collectingHistory?: string;
  avgBudget?: string;
  favoriteMediums?: string[];
  preferredArtists?: string[];
  privateAccessLevel: 'standard' | 'preferred' | 'exclusive';
  conciergeNotes?: string;
  createdAt: string;
}

export interface ConciergeRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  type: RequestType;
  status: RequestStatus;
  priority: PriorityLevel;
  source: RequestSource;
  clientProfile: ClientProfile;
  subject: string;
  description?: string;
  budgetRange?: string;
  timeline?: string;
  assignedTo?: string;
  internalNotes?: string;
  linkedLeadId?: string;
  tags: string[];
}

export interface ViewingSession {
  id: string;
  createdAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  viewingType: ViewingType;
  date: string;
  time: string;
  duration: number;
  location?: string;
  artworkIds?: string[];
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  assignedTo?: string;
  notes?: string;
  guestCount?: number;
  priority: PriorityLevel;
}

export interface CommissionCase {
  id: string;
  createdAt: string;
  updatedAt: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  brief: string;
  medium?: string;
  dimensions?: string;
  theme?: string;
  budgetRange?: string;
  deadline?: string;
  status: 'brief_received' | 'artist_matching' | 'proposal_sent' | 'contract_review' | 'in_progress' | 'quality_check' | 'delivered' | 'cancelled';
  matchedArtist?: string;
  milestones: { label: string; due?: string; completed: boolean }[];
  progress: number;
  estimate?: string;
  finalPrice?: string;
  priority: PriorityLevel;
  notes?: string;
  assignedTo?: string;
}

export interface CorporateProject {
  id: string;
  createdAt: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  projectType: 'office' | 'hotel' | 'restaurant' | 'hospitality' | 'retail' | 'corporate_gifting' | 'executive_suites';
  description: string;
  location: string;
  budgetRange?: string;
  timeline?: string;
  status: 'inquiry' | 'consultation' | 'proposal' | 'contract' | 'acquiring' | 'installing' | 'completed' | 'on_hold';
  roomCount?: number;
  estimatedWorks?: number;
  assignedTo?: string;
  notes?: string;
  priority: PriorityLevel;
}

export interface VipClient {
  id: string;
  profile: ClientProfile;
  totalAcquisitions: number;
  lifetimeValue: string;
  lastContactedAt: string;
  lastViewingAt?: string;
  lastCommissionAt?: string;
  interests: string[];
  preferredArtists: string[];
  accessLevel: 'standard' | 'preferred' | 'exclusive' | 'founding';
  collectorSince?: string;
  eventsAttended: number;
  commissionsCompleted: number;
  privateViewingsCompleted: number;
  acquisitionHistory: { title: string; date: string; price: string }[];
}