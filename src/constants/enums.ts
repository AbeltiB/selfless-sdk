export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  BRANCH_MANAGER = 'BRANCH_MANAGER',
  SUPERVISOR = 'SUPERVISOR',
  OFFICER = 'OFFICER',
  CUSTOMER = 'CUSTOMER',
}

export enum OrgStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  OFFBOARDING = 'OFFBOARDING',
}

export enum BranchStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

export enum TicketStatus {
  CREATED = 'CREATED',
  WAITING = 'WAITING',
  CALLED = 'CALLED',
  IN_SERVICE = 'IN_SERVICE',
  TRANSFERRED = 'TRANSFERRED',
  ON_HOLD = 'ON_HOLD',
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  AWAITING_DOCUMENT = 'AWAITING_DOCUMENT',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
  EXPIRED = 'EXPIRED',
  ABANDONED = 'ABANDONED',
}

export enum QueueStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  PAUSED = 'PAUSED',
}

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CHECKED_IN = 'CHECKED_IN',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

export enum StepType {
  SERVICE = 'SERVICE',
  PAYMENT = 'PAYMENT',
  DOCUMENT_REVIEW = 'DOCUMENT_REVIEW',
  APPROVAL = 'APPROVAL',
  VERIFICATION = 'VERIFICATION',
  CUSTOM = 'CUSTOM',
}

export enum RequirementType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
  SELECT = 'SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  IMAGE = 'IMAGE',
  DOCUMENT = 'DOCUMENT',
}

export enum FieldType {
  TEXT = 'TEXT',
  TEXTAREA = 'TEXTAREA',
  NUMBER = 'NUMBER',
  DATE = 'DATE',
  BOOLEAN = 'BOOLEAN',
  SELECT = 'SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
}

export enum ServiceType {
  WALK_IN = 'WALK_IN',
  APPOINTMENT = 'APPOINTMENT',
  BOTH = 'BOTH',
}

export enum TicketEventType {
  CREATED = 'CREATED',
  CALLED = 'CALLED',
  SERVING_STARTED = 'SERVING_STARTED',
  TRANSFERRED = 'TRANSFERRED',
  ON_HOLD = 'ON_HOLD',
  RESUMED = 'RESUMED',
  AWAITING_PAYMENT = 'AWAITING_PAYMENT',
  AWAITING_DOCUMENT = 'AWAITING_DOCUMENT',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
  EXPIRED = 'EXPIRED',
  NOTE_ADDED = 'NOTE_ADDED',
  COUNTER_ASSIGNED = 'COUNTER_ASSIGNED',
  STEP_ADVANCED = 'STEP_ADVANCED',
}

export enum NotificationChannel {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  TELEGRAM = 'TELEGRAM',
  PUSH = 'PUSH',
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  [TicketStatus.CREATED]: 'Created',
  [TicketStatus.WAITING]: 'Waiting',
  [TicketStatus.CALLED]: 'Called',
  [TicketStatus.IN_SERVICE]: 'In Service',
  [TicketStatus.TRANSFERRED]: 'Transferred',
  [TicketStatus.ON_HOLD]: 'On Hold',
  [TicketStatus.AWAITING_PAYMENT]: 'Awaiting Payment',
  [TicketStatus.AWAITING_DOCUMENT]: 'Awaiting Document',
  [TicketStatus.COMPLETED]: 'Completed',
  [TicketStatus.REJECTED]: 'Rejected',
  [TicketStatus.CANCELLED]: 'Cancelled',
  [TicketStatus.NO_SHOW]: 'No Show',
  [TicketStatus.EXPIRED]: 'Expired',
  [TicketStatus.ABANDONED]: 'Abandoned',
};

export const ACTIVE_TICKET_STATUSES: TicketStatus[] = [
  TicketStatus.CREATED,
  TicketStatus.WAITING,
  TicketStatus.CALLED,
  TicketStatus.IN_SERVICE,
  TicketStatus.ON_HOLD,
  TicketStatus.AWAITING_PAYMENT,
  TicketStatus.AWAITING_DOCUMENT,
];

export const TERMINAL_TICKET_STATUSES: TicketStatus[] = [
  TicketStatus.COMPLETED,
  TicketStatus.REJECTED,
  TicketStatus.CANCELLED,
  TicketStatus.NO_SHOW,
  TicketStatus.EXPIRED,
  TicketStatus.ABANDONED,
];

export const VALID_TICKET_TRANSITIONS: Partial<Record<TicketStatus, TicketStatus[]>> = {
  [TicketStatus.CREATED]: [TicketStatus.WAITING, TicketStatus.CANCELLED, TicketStatus.EXPIRED],
  [TicketStatus.WAITING]: [TicketStatus.CALLED, TicketStatus.CANCELLED, TicketStatus.EXPIRED, TicketStatus.ABANDONED],
  [TicketStatus.CALLED]: [TicketStatus.IN_SERVICE, TicketStatus.NO_SHOW, TicketStatus.CANCELLED],
  [TicketStatus.IN_SERVICE]: [
    TicketStatus.COMPLETED,
    TicketStatus.ON_HOLD,
    TicketStatus.TRANSFERRED,
    TicketStatus.AWAITING_PAYMENT,
    TicketStatus.AWAITING_DOCUMENT,
    TicketStatus.REJECTED,
  ],
  [TicketStatus.ON_HOLD]: [TicketStatus.IN_SERVICE, TicketStatus.TRANSFERRED, TicketStatus.CANCELLED],
  [TicketStatus.AWAITING_PAYMENT]: [TicketStatus.IN_SERVICE, TicketStatus.CANCELLED],
  [TicketStatus.AWAITING_DOCUMENT]: [TicketStatus.IN_SERVICE, TicketStatus.CANCELLED],
  [TicketStatus.TRANSFERRED]: [TicketStatus.WAITING],
};
