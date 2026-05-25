import type {
  TicketStatus,
  UserRole,
  QueueStatus,
  NotificationChannel,
  NotificationStatus,
  AppointmentStatus,
  TenantStatus,
} from '../constants/enums';

export interface Organization {
  id: string;
  name: string;
  slug: string;
  countryCode: string;
  planTier: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Tenant {
  id: string;
  organizationId: string;
  schemaName: string;
  status: TenantStatus;
  createdAt: Date;
  planExpiresAt?: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  branchId?: string;
  isActive: boolean;
  invitedAt?: Date;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DayHours {
  open: string;
  close: string;
  isOpen: boolean;
}

export interface OperatingHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  address?: string;
  timezone: string;
  operatingHours?: OperatingHours;
  maxQueueCapacity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  branchId: string;
  name: string;
  code: string;
  description?: string;
  estimatedDuration: number;
  prefix: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Queue {
  id: string;
  branchId: string;
  serviceId: string;
  service?: Service;
  date: Date;
  status: QueueStatus;
  currentNumber: number;
  prefix: string;
  openedAt: Date;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  waitingCount?: number;
  servingCount?: number;
  avgWaitSeconds?: number;
}

export interface Customer {
  id: string;
  customerId: string;
  phone?: string;
  name?: string;
  email?: string;
  createdAt: Date;
  lastSeenAt: Date;
}

export interface QueueTicket {
  id: string;
  queueId: string;
  serviceId: string;
  branchId: string;
  ticketNumber: string;
  status: TicketStatus;
  customerId?: string;
  customer?: Customer;
  operatorId?: string;
  priority: number;
  notes?: string;
  issuedAt: Date;
  calledAt?: Date;
  servedAt?: Date;
  completedAt?: Date;
  waitSeconds?: number;
  serviceSeconds?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceStage {
  id: string;
  journeyId: string;
  order: number;
  serviceId: string;
  label: string;
  transferCondition?: Record<string, unknown>;
}

export interface ServiceJourney {
  id: string;
  name: string;
  stages: ServiceStage[];
  isActive: boolean;
}

export interface JourneyInstance {
  id: string;
  journeyId: string;
  customerId?: string;
  currentStage: number;
  status: string;
  startedAt: Date;
  completedAt?: Date;
  ticketIds: string[];
}

export interface Appointment {
  id: string;
  serviceId: string;
  branchId: string;
  customerId?: string;
  customer?: Customer;
  scheduledAt: Date;
  duration: number;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  channel: NotificationChannel;
  recipientId?: string;
  subject?: string;
  body: string;
  status: NotificationStatus;
  sentAt?: Date;
  error?: string;
  createdAt: Date;
}

export interface KpiSnapshot {
  branchId: string;
  serviceId?: string;
  date: Date;
  waitingCount: number;
  servingCount: number;
  completedCount: number;
  noShowCount: number;
  avgWaitSeconds: number;
  p95WaitSeconds: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
  branchId?: string;
  tenantId: string;
  iat?: number;
  exp?: number;
  jti?: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
