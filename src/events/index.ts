import type { TicketStatus } from '../constants/enums';

// ─── BullMQ Job Payloads ──────────────────────────────────────────────────────

export interface BaseJobPayload {
  organizationId: string;
  timestamp: string;
}

export interface NotificationEmailJob extends BaseJobPayload {
  to: string;
  subject: string;
  body: string;
  html?: string;
  ticketId?: string;
  customerId?: string;
}

export interface NotificationSmsJob extends BaseJobPayload {
  to: string;
  body: string;
  ticketId?: string;
  customerId?: string;
}

export interface NotificationTelegramJob extends BaseJobPayload {
  telegramId: string;
  message: string;
  ticketId?: string;
  customerId?: string;
}

export interface NotificationPushJob extends BaseJobPayload {
  token: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  ticketId?: string;
  customerId?: string;
}

export interface TicketExpiryJob extends BaseJobPayload {
  ticketId: string;
  queueId: string;
}

export interface TicketSlaJob extends BaseJobPayload {
  ticketId: string;
  stepId: string;
  slaMinutes: number;
  stepName: string;
}

export interface AnalyticsAggregateJob extends BaseJobPayload {
  branchId?: string;
  serviceId?: string;
  date: string;
  hour: number;
}

export interface OrgProvisionJob extends BaseJobPayload {
  adminEmail: string;
  adminName: string;
}

// ─── Socket.IO Event Payloads ─────────────────────────────────────────────────

export interface TicketCreatedEvent {
  ticket: {
    id: string;
    queueNumber: string;
    status: TicketStatus;
    branchId: string;
    serviceId: string;
    currentStepId?: string;
    customerName?: string;
    waitingPosition: number;
    estimatedWaitSeconds?: number;
  };
}

export interface TicketStatusChangedEvent {
  ticketId: string;
  queueNumber: string;
  previousStatus: TicketStatus;
  status: TicketStatus;
  branchId: string;
  serviceId: string;
  currentStepId?: string;
  currentStepName?: string;
  operatorId?: string;
  counterId?: string;
  counterName?: string;
}

export interface TicketCalledEvent {
  ticketId: string;
  queueNumber: string;
  counterId: string;
  counterName: string;
  branchId: string;
  customerTelegramId?: string;
}

export interface QueueStatsUpdatedEvent {
  queueId: string;
  branchId: string;
  serviceId: string;
  serviceName: string;
  stepId?: string;
  stepName?: string;
  status: string;
  waitingCount: number;
  servingCount: number;
  completedCount: number;
  avgWaitSeconds: number;
  currentNumber: number;
}

export interface BranchStatsUpdatedEvent {
  branchId: string;
  queues: QueueStatsUpdatedEvent[];
  totalWaiting: number;
  totalServing: number;
  totalCompleted: number;
}

// ─── Socket Event Names ───────────────────────────────────────────────────────

export const SOCKET_EVENTS = {
  // Server → Client
  TICKET_CREATED: 'ticket:created',
  TICKET_CALLED: 'ticket:called',
  TICKET_STATUS_CHANGED: 'ticket:statusChanged',
  TICKET_STEP_ADVANCED: 'ticket:stepAdvanced',
  QUEUE_STATS_UPDATED: 'queue:statsUpdated',
  BRANCH_STATS_UPDATED: 'branch:statsUpdated',
  QUEUE_OPENED: 'queue:opened',
  QUEUE_CLOSED: 'queue:closed',
  QUEUE_PAUSED: 'queue:paused',
  COUNTER_DISPLAY_UPDATED: 'counter:displayUpdated',
  // Client → Server
  JOIN_BRANCH: 'branch:join',
  JOIN_QUEUE: 'queue:join',
  LEAVE_BRANCH: 'branch:leave',
  JOIN_TICKET: 'ticket:join',
} as const;

export type SocketEventName = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];

// ─── BullMQ Queue Names ───────────────────────────────────────────────────────

export const QUEUE_NAMES = {
  NOTIFICATION_EMAIL: 'notification-email',
  NOTIFICATION_SMS: 'notification-sms',
  NOTIFICATION_TELEGRAM: 'notification-telegram',
  NOTIFICATION_PUSH: 'notification-push',
  TICKET_EXPIRY: 'ticket-expiry',
  TICKET_SLA: 'ticket-sla',
  ANALYTICS_AGGREGATE: 'analytics-aggregate',
  ORG_PROVISION: 'org-provision',
} as const;

export type QueueName = (typeof QUEUE_NAMES)[keyof typeof QUEUE_NAMES];
