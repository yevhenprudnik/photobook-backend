import { Repository } from '../types.d.ts';

export type Order = {
  id: number;
  photobookId: number;
  userId: number;
  status: string;
  price: number;
  paymentId: string;
  trackingNumber: string;
};

export type OrderRepository = Repository<Order>;
