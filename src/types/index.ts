export * from './queue';

import type {
  TicketStatus,
  UserRole,
  QueueStatus,
  AppointmentStatus,
  StepType,
  OrgStatus,
  BranchStatus,
} from '../constants/enums';

// ─── Common ───────────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  statusCode?: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface JwtStaffPayload {
  sub: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  branchId?: string;
  type: 'staff';
  iat?: number;
  exp?: number;
}

export interface JwtCustomerPayload {
  sub: string;
  telegramId: string;
  organizationId?: string;
  type: 'customer';
  iat?: number;
  exp?: number;
}

export type JwtPayload = JwtStaffPayload | JwtCustomerPayload;

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

// ─── Organization ─────────────────────────────────────────────────────────────

export interface Organization {
  id: string;
  name: string;
  code: string;
  logo?: string;
  status: OrgStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Branch ───────────────────────────────────────────────────────────────────

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
  organizationId: string;
  name: string;
  code: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  timezone: string;
  operatingHours?: OperatingHours;
  maxCapacity: number;
  status: BranchStatus;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Workflow ─────────────────────────────────────────────────────────────────

export interface WorkflowCondition {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'in';
  value: unknown;
}

export interface WorkflowStep {
  id: string;
  workflowId: string;
  name: string;
  stepType: StepType;
  order: number;
  slaMinutes?: number;
  counterGroupId?: string;
  isInitial: boolean;
  isFinal: boolean;
}

export interface WorkflowTransition {
  id: string;
  workflowId: string;
  sourceStepId: string;
  destinationStepId: string;
  condition?: WorkflowCondition;
  label?: string;
  order: number;
}

export interface Workflow {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  isActive: boolean;
  steps?: WorkflowStep[];
  transitions?: WorkflowTransition[];
  createdAt: Date;
  updatedAt: Date;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  branchId: string;
  workflowId?: string;
  name: string;
  code: string;
  description?: string;
  estimatedDuration: number;
  prefix: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Customer ─────────────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  telegramId?: string;
  telegramUsername?: string;
  phone?: string;
  email?: string;
  firstName: string;
  lastName?: string;
  profileComplete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Queue ────────────────────────────────────────────────────────────────────

export interface Queue {
  id: string;
  branchId: string;
  serviceId: string;
  stepId?: string;
  date: Date;
  status: QueueStatus;
  currentNumber: number;
  prefix: string;
  openedAt: Date;
  closedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Ticket ───────────────────────────────────────────────────────────────────

export interface Ticket {
  id: string;
  organizationId: string;
  branchId: string;
  serviceId: string;
  customerId?: string;
  queueNumber: string;
  prefix: string;
  workflowId?: string;
  currentStepId?: string;
  currentCounterId?: string;
  operatorId?: string;
  status: TicketStatus;
  priority: number;
  notes?: string;
  formData?: Record<string, unknown>;
  issuedAt: Date;
  calledAt?: Date;
  servedAt?: Date;
  completedAt?: Date;
  waitSeconds?: number;
  serviceSeconds?: number;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Appointment ──────────────────────────────────────────────────────────────

export interface Appointment {
  id: string;
  organizationId: string;
  branchId: string;
  serviceId: string;
  customerId?: string;
  scheduledAt: Date;
  duration: number;
  status: AppointmentStatus;
  notes?: string;
  ticketId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ─── Form ─────────────────────────────────────────────────────────────────────

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormFieldCondition {
  field: string;
  operator: 'eq' | 'neq';
  value: unknown;
}

export interface User {
  id: string;
  organizationId?: string;
  branchId?: string;
  email?: string;
  telegramId?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
