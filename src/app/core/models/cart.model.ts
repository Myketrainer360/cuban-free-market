import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  currency: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
  currency: string;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}
