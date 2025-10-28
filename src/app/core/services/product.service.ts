import { Injectable } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Product, ProductCategory, ProductStatus } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private mockProducts: Product[] = [
    {
      id: '1',
      title: 'iPhone 13 Pro',
      description: 'Like new, 256GB, unlocked',
      price: 800,
      currency: 'USD',
      category: ProductCategory.ELECTRONICS,
      images: ['https://via.placeholder.com/400x300?text=iPhone+13+Pro'],
      sellerId: '1',
      status: ProductStatus.AVAILABLE,
      location: 'Havana',
      createdAt: new Date('2025-10-20'),
      updatedAt: new Date('2025-10-20')
    },
    {
      id: '2',
      title: 'Casa in Vedado',
      description: '3 bedrooms, 2 bathrooms, beautiful colonial architecture',
      price: 50000,
      currency: 'USD',
      category: ProductCategory.REAL_ESTATE,
      images: ['https://via.placeholder.com/400x300?text=Casa+Vedado'],
      sellerId: '2',
      status: ProductStatus.AVAILABLE,
      location: 'Havana',
      createdAt: new Date('2025-10-15'),
      updatedAt: new Date('2025-10-15')
    },
    {
      id: '3',
      title: 'Laptop Dell XPS 15',
      description: 'Intel i7, 16GB RAM, 512GB SSD, excellent condition',
      price: 1200,
      currency: 'USD',
      category: ProductCategory.ELECTRONICS,
      images: ['https://via.placeholder.com/400x300?text=Dell+XPS'],
      sellerId: '1',
      status: ProductStatus.AVAILABLE,
      location: 'Santiago de Cuba',
      createdAt: new Date('2025-10-25'),
      updatedAt: new Date('2025-10-25')
    },
    {
      id: '4',
      title: 'Motorcycle Honda 125',
      description: '2020 model, low mileage, perfect for city',
      price: 2500,
      currency: 'USD',
      category: ProductCategory.VEHICLES,
      images: ['https://via.placeholder.com/400x300?text=Honda+125'],
      sellerId: '3',
      status: ProductStatus.AVAILABLE,
      location: 'Havana',
      createdAt: new Date('2025-10-22'),
      updatedAt: new Date('2025-10-22')
    },
    {
      id: '5',
      title: 'Designer Clothes Bundle',
      description: 'Mix of brand clothing, sizes M-L',
      price: 150,
      currency: 'USD',
      category: ProductCategory.CLOTHING,
      images: ['https://via.placeholder.com/400x300?text=Clothes'],
      sellerId: '2',
      status: ProductStatus.AVAILABLE,
      location: 'Havana',
      createdAt: new Date('2025-10-18'),
      updatedAt: new Date('2025-10-18')
    },
    {
      id: '6',
      title: 'Apartment in Miramar',
      description: '2 bedrooms, sea view, modern renovation',
      price: 35000,
      currency: 'USD',
      category: ProductCategory.REAL_ESTATE,
      images: ['https://via.placeholder.com/400x300?text=Apt+Miramar'],
      sellerId: '1',
      status: ProductStatus.AVAILABLE,
      location: 'Havana',
      createdAt: new Date('2025-10-10'),
      updatedAt: new Date('2025-10-10')
    }
  ];

  constructor() {}

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts).pipe(delay(800));
  }

  getProductById(id: string): Observable<Product | undefined> {
    return of(this.mockProducts.find(p => p.id === id)).pipe(delay(500));
  }

  getProductsByCategory(category: ProductCategory): Observable<Product[]> {
    return of(this.mockProducts.filter(p => p.category === category)).pipe(delay(500));
  }

  getUserProducts(userId: string): Observable<Product[]> {
    return of(this.mockProducts.filter(p => p.sellerId === userId)).pipe(delay(500));
  }

  createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Observable<Product> {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.mockProducts.push(newProduct);
    return of(newProduct).pipe(delay(500));
  }

  updateProduct(id: string, updates: Partial<Product>): Observable<Product> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Product not found');
    }

    this.mockProducts[index] = {
      ...this.mockProducts[index],
      ...updates,
      updatedAt: new Date()
    };

    return of(this.mockProducts[index]).pipe(delay(500));
  }

  deleteProduct(id: string): Observable<boolean> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      return of(false).pipe(delay(500));
    }

    this.mockProducts.splice(index, 1);
    return of(true).pipe(delay(500));
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this.mockProducts.filter(p =>
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.location.toLowerCase().includes(lowerQuery)
    );
    return of(filtered).pipe(delay(500));
  }
}
