import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, LoadingComponent, CurrencyFormatPipe, TimeAgoPipe],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css'
})
export class MarketplaceComponent implements OnInit {
  products: Product[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    // Simulate API call with mock data
    setTimeout(() => {
      this.products = this.getMockProducts();
      this.loading = false;
    }, 1000);
  }

  private getMockProducts(): Product[] {
    return [
      {
        id: '1',
        title: 'iPhone 13 Pro',
        description: 'Like new, 256GB',
        price: 800,
        currency: 'USD',
        category: 'ELECTRONICS' as any,
        images: [],
        sellerId: '1',
        status: 'AVAILABLE' as any,
        location: 'Havana',
        createdAt: new Date('2025-10-20'),
        updatedAt: new Date('2025-10-20')
      },
      {
        id: '2',
        title: 'Casa in Vedado',
        description: '3 bedrooms, 2 bathrooms',
        price: 50000,
        currency: 'USD',
        category: 'REAL_ESTATE' as any,
        images: [],
        sellerId: '2',
        status: 'AVAILABLE' as any,
        location: 'Havana',
        createdAt: new Date('2025-10-15'),
        updatedAt: new Date('2025-10-15')
      }
    ];
  }
}
