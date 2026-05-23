export interface QueueTicket {
  id: string;
  customerName: string;
  serviceId: string;
  status: 'WAITING' | 'CALLED' | 'COMPLETED';
  createdAt: Date;
}