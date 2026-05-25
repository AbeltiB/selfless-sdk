export enum TicketStatus {
  PENDING = 'PENDING',
  WAITING = 'WAITING',
  CALLED = 'CALLED',
  SERVING = 'SERVING',
  ON_HOLD = 'ON_HOLD',
  TRANSFERRED = 'TRANSFERRED',
  COMPLETED = 'COMPLETED',
  NO_SHOW = 'NO_SHOW',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  SUPERVISOR = 'SUPERVISOR',
  BRANCH_MANAGER = 'BRANCH_MANAGER',
  OPERATOR = 'OPERATOR',
  STAFF = 'STAFF',
}

export enum QueueStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  PAUSED = 'PAUSED',
}

export enum NotificationChannel {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  PUSH = 'PUSH',
  WHATSAPP = 'WHATSAPP',
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

export enum ServiceType {
  WALK_IN = 'WALK_IN',
  APPOINTMENT = 'APPOINTMENT',
  BOTH = 'BOTH',
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum TenantStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  OFFBOARDING = 'OFFBOARDING',
}

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  [TicketStatus.PENDING]: 'Pending',
  [TicketStatus.WAITING]: 'Waiting',
  [TicketStatus.CALLED]: 'Called',
  [TicketStatus.SERVING]: 'Serving',
  [TicketStatus.ON_HOLD]: 'On Hold',
  [TicketStatus.TRANSFERRED]: 'Transferred',
  [TicketStatus.COMPLETED]: 'Completed',
  [TicketStatus.NO_SHOW]: 'No Show',
  [TicketStatus.CANCELLED]: 'Cancelled',
  [TicketStatus.EXPIRED]: 'Expired',
};

export const VALID_TICKET_TRANSITIONS: Partial<Record<TicketStatus, TicketStatus[]>> = {
  [TicketStatus.PENDING]: [TicketStatus.WAITING, TicketStatus.CANCELLED, TicketStatus.EXPIRED],
  [TicketStatus.WAITING]: [TicketStatus.CALLED, TicketStatus.CANCELLED, TicketStatus.EXPIRED],
  [TicketStatus.CALLED]: [TicketStatus.SERVING, TicketStatus.NO_SHOW, TicketStatus.CANCELLED],
  [TicketStatus.SERVING]: [TicketStatus.COMPLETED, TicketStatus.ON_HOLD, TicketStatus.TRANSFERRED],
  [TicketStatus.ON_HOLD]: [TicketStatus.SERVING, TicketStatus.TRANSFERRED, TicketStatus.CANCELLED],
};
