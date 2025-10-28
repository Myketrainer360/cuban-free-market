import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product, ProductStatus } from '../../../core/models/product.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { CurrencyFormatPipe } from '../../../shared/pipes/currency-format.pipe';
import { TimeAgoPipe } from '../../../shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-product-manage',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LoadingComponent, CurrencyFormatPipe, TimeAgoPipe],
  templateUrl: './product-manage.component.html',
  styleUrl: './product-manage.component.css'
})
export class ProductManageComponent implements OnInit {
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router);

  products: Product[] = [];
  loading = false;
  ProductStatus = ProductStatus;

  ngOnInit(): void {
    const user = this.authService.getUser();
    if (!user) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.loadUserProducts(user.id);
  }

  loadUserProducts(userId: string): void {
    this.loading = true;
    this.productService.getUserProducts(userId).subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  addProduct(): void {
    // TODO: Navigate to add product page
    alert('Add product functionality will be implemented soon!');
  }

  editProduct(productId: string): void {
    // TODO: Navigate to edit product page
    alert(`Edit product ${productId} - will be implemented soon!`);
  }

  deleteProduct(productId: string): void {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.deleteProduct(productId).subscribe({
      next: (success) => {
        if (success) {
          this.products = this.products.filter(p => p.id !== productId);
          alert('Product deleted successfully!');
        }
      },
      error: () => {
        alert('Failed to delete product');
      }
    });
  }

  toggleStatus(product: Product): void {
    const newStatus = product.status === ProductStatus.AVAILABLE ? ProductStatus.INACTIVE : ProductStatus.AVAILABLE;
    this.productService.updateProduct(product.id, { status: newStatus }).subscribe({
      next: (updated) => {
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index] = updated;
        }
      }
    });
  }
}
