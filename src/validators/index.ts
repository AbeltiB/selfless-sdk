import { z } from 'zod';
import { UserRole, TicketStatus, QueueStatus } from '../constants/enums';

export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{7,14}$/, 'Invalid phone number');

export const customerIdSchema = z
  .string()
  .regex(/^\d{14}$/, 'Customer ID must be 14 digits');

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  password: z.string().min(8).optional(),
  role: z.nativeEnum(UserRole),
  branchId: z.string().uuid().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  role: z.nativeEnum(UserRole).optional(),
  branchId: z.string().uuid().nullable().optional(),
  isActive: z.boolean().optional(),
  password: z.string().min(8).optional(),
});

export const createBranchSchema = z.object({
  name: z.string().min(2).max(100),
  code: z.string().min(2).max(20).regex(/^[A-Z0-9_-]+$/i, 'Code must be alphanumeric'),
  address: z.string().max(300).optional(),
  timezone: z.string().default('UTC'),
  maxQueueCapacity: z.number().int().min(1).max(10000).default(100),
  operatingHours: z
    .record(
      z.object({
        open: z.string().regex(/^\d{2}:\d{2}$/),
        close: z.string().regex(/^\d{2}:\d{2}$/),
        isOpen: z.boolean(),
      }),
    )
    .optional(),
});

export const updateBranchSchema = createBranchSchema.partial();

export const createServiceSchema = z.object({
  branchId: z.string().uuid(),
  name: z.string().min(2).max(100),
  code: z
    .string()
    .min(1)
    .max(10)
    .regex(/^[A-Z0-9]+$/i, 'Code must be alphanumeric'),
  description: z.string().max(500).optional(),
  estimatedDuration: z.number().int().min(1).max(480).default(10),
  prefix: z
    .string()
    .length(1)
    .regex(/^[A-Z]$/i)
    .transform((v) => v.toUpperCase())
    .default('A'),
});

export const updateServiceSchema = z.object({
  name: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
  estimatedDuration: z.number().int().min(1).max(480).optional(),
  prefix: z
    .string()
    .length(1)
    .regex(/^[A-Z]$/i)
    .transform((v) => v.toUpperCase())
    .optional(),
  isActive: z.boolean().optional(),
});

export const openQueueSchema = z.object({
  branchId: z.string().uuid(),
  serviceId: z.string().uuid(),
  prefix: z
    .string()
    .length(1)
    .regex(/^[A-Z]$/i)
    .transform((v) => v.toUpperCase())
    .optional(),
});

export const updateQueueStatusSchema = z.object({
  status: z.nativeEnum(QueueStatus),
});

export const issueTicketSchema = z.object({
  queueId: z.string().uuid(),
  customerName: z.string().min(1).max(100).optional(),
  customerPhone: phoneSchema.optional(),
  notes: z.string().max(500).optional(),
  priority: z.number().int().min(0).max(10).default(0),
});

export const updateTicketSchema = z.object({
  status: z.nativeEnum(TicketStatus),
  notes: z.string().max(500).optional(),
  transferToQueueId: z.string().uuid().optional(),
  counterNumber: z.string().max(10).optional(),
});

export const createAppointmentSchema = z.object({
  serviceId: z.string().uuid(),
  branchId: z.string().uuid(),
  scheduledAt: z.string().datetime(),
  duration: z.number().int().min(5).max(480).default(30),
  customerName: z.string().max(100).optional(),
  customerPhone: phoneSchema.optional(),
  notes: z.string().max(500).optional(),
});

export type LoginDto = z.infer<typeof loginSchema>;
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type CreateBranchDto = z.infer<typeof createBranchSchema>;
export type UpdateBranchDto = z.infer<typeof updateBranchSchema>;
export type CreateServiceDto = z.infer<typeof createServiceSchema>;
export type UpdateServiceDto = z.infer<typeof updateServiceSchema>;
export type OpenQueueDto = z.infer<typeof openQueueSchema>;
export type IssueTicketDto = z.infer<typeof issueTicketSchema>;
export type UpdateTicketDto = z.infer<typeof updateTicketSchema>;
export type CreateAppointmentDto = z.infer<typeof createAppointmentSchema>;
