import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { TimeAgoPipe } from '../../shared/pipes/time-ago.pipe';
import { Product } from '../../core/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, LoadingComponent, ButtonComponent, CurrencyFormatPipe, TimeAgoPipe],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css'
})
export class MarketplaceComponent implements OnInit {
  private productService = inject(ProductService);
  cartService = inject(CartService);

  products: Product[] = [];
  loading = false;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert(`${product.title} added to cart!`);
  }

  isInCart(productId: string): boolean {
    return this.cartService.isInCart(productId);
  }
}
