export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: ProductCategory;
  images: string[];
  sellerId: string;
  status: ProductStatus;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum ProductCategory {
  ELECTRONICS = 'electronics',
  CLOTHING = 'clothing',
  FOOD = 'food',
  SERVICES = 'services',
  REAL_ESTATE = 'real_estate',
  VEHICLES = 'vehicles',
  OTHER = 'other'
}

export enum ProductStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
  RESERVED = 'reserved',
  INACTIVE = 'inactive'
}
