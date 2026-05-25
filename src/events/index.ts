import type { TicketStatus } from '../constants/enums';

export interface BaseJobPayload {
  tenantId: string;
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

export interface NotificationPushJob extends BaseJobPayload {
  token: string;
  title: string;
  body: string;
  data?: Record<string, string>;
  ticketId?: string;
  customerId?: string;
}

export interface NotificationWhatsAppJob extends BaseJobPayload {
  to: string;
  body: string;
  ticketId?: string;
  customerId?: string;
}

export interface TicketExpiryJob extends BaseJobPayload {
  ticketId: string;
  queueId: string;
}

export interface AnalyticsAggregateJob extends BaseJobPayload {
  branchId?: string;
  serviceId?: string;
  date: string;
  hour: number;
}

export interface TenantProvisionJob extends BaseJobPayload {
  organizationId: string;
  adminEmail: string;
  adminName: string;
}

export interface IntegrationWebhookJob extends BaseJobPayload {
  adapterId: string;
  event: string;
  payload: Record<string, unknown>;
  webhookUrl: string;
  secret?: string;
}

// Socket.IO event payloads (emitted from API to dashboard/mobile clients)
export interface TicketCreatedSocketEvent {
  ticket: {
    id: string;
    ticketNumber: string;
    status: TicketStatus;
    queueId: string;
    branchId: string;
    serviceId: string;
    customerName?: string;
    waitingPosition: number;
    estimatedWaitSeconds?: number;
  };
}

export interface TicketStatusChangedSocketEvent {
  ticketId: string;
  ticketNumber: string;
  previousStatus: TicketStatus;
  status: TicketStatus;
  queueId: string;
  branchId: string;
  operatorId?: string;
  counterNumber?: string;
}

export interface QueueStatsUpdatedSocketEvent {
  queueId: string;
  branchId: string;
  serviceId: string;
  serviceName: string;
  status: string;
  waitingCount: number;
  servingCount: number;
  completedCount: number;
  avgWaitSeconds: number;
  currentNumber: number;
}

export interface BranchStatsUpdatedSocketEvent {
  branchId: string;
  queues: QueueStatsUpdatedSocketEvent[];
  totalWaiting: number;
  totalServing: number;
  totalCompleted: number;
}

// Socket.IO event names
export const SOCKET_EVENTS = {
  // Server -> Client
  TICKET_CREATED: 'ticket:created',
  TICKET_STATUS_CHANGED: 'ticket:statusChanged',
  QUEUE_STATS_UPDATED: 'queue:statsUpdated',
  BRANCH_STATS_UPDATED: 'branch:statsUpdated',
  QUEUE_OPENED: 'queue:opened',
  QUEUE_CLOSED: 'queue:closed',
  // Client -> Server
  JOIN_BRANCH: 'branch:join',
  JOIN_QUEUE: 'queue:join',
  LEAVE_BRANCH: 'branch:leave',
} as const;

export type SocketEventName = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];

// BullMQ queue names
export const QUEUE_NAMES = {
  NOTIFICATION_EMAIL: 'notification:email',
  NOTIFICATION_SMS: 'notification:sms',
  NOTIFICATION_PUSH: 'notification:push',
  NOTIFICATION_WHATSAPP: 'notification:whatsapp',
  TICKET_EXPIRY: 'ticket:expiry',
  ANALYTICS_AGGREGATE: 'analytics:aggregate',
  TENANT_PROVISION: 'tenant:provision',
  INTEGRATION_WEBHOOK: 'integration:webhook',
} as const;

export type QueueName = typeof QUEUE_NAMES[keyof typeof QUEUE_NAMES];
