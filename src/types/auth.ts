export type Domain = 'crm' | 'concierge' | 'treasury' | 'whatsapp' | 'admin' | 'ops';

export type NotificationType = 
  | 'vip_lead_created' 
  | 'lead_converted' 
  | 'commission_update'
  | 'commission_confirmed'
  | 'request_urgent'
  | 'booking_confirmed' 
  | 'payment_received' 
  | 'workflow_failed'
  | 'system_alert';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  actionUrl?: string;
  createdAt: string;
  read: boolean;
  metadata?: Record<string, unknown>;
  severity?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  action: string;
  domain: Domain;
  resourceType: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  severity?: string;
  ipAddress?: string;
  userAgent?: string;
}