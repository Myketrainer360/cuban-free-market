import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent, CurrencyFormatPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartService = inject(CartService);

  updateQuantity(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: string): void {
    if (confirm('Are you sure you want to remove this item?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear the entire cart?')) {
      this.cartService.clearCart();
    }
  }

  proceedToCheckout(): void {
    // TODO: Implement checkout logic
    alert('Checkout functionality will be implemented soon!');
  }
}
