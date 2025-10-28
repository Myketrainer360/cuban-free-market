import { Injectable, signal, computed } from '@angular/core';
import { Cart, CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_KEY = 'shopping_cart';

  // Using Angular signals for reactive state
  private cartItems = signal<CartItem[]>([]);

  // Computed signals
  items = this.cartItems.asReadonly();
  totalItems = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );
  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
  );

  cart = computed<Cart>(() => ({
    items: this.cartItems(),
    totalItems: this.totalItems(),
    totalPrice: this.totalPrice(),
    currency: this.cartItems()[0]?.product.currency || 'USD'
  }));

  constructor(private storageService: StorageService) {
    this.loadCart();
  }

  private loadCart(): void {
    const savedCart = this.storageService.getItem<CartItem[]>(this.CART_KEY);
    if (savedCart) {
      this.cartItems.set(savedCart);
    }
  }

  private saveCart(): void {
    this.storageService.setItem(this.CART_KEY, this.cartItems());
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItems();
    const existingItemIndex = currentItems.findIndex(
      item => item.product.id === product.id
    );

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      const updatedItems = [...currentItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + quantity
      };
      this.cartItems.set(updatedItems);
    } else {
      // Add new item
      this.cartItems.set([
        ...currentItems,
        {
          product,
          quantity,
          addedAt: new Date()
        }
      ]);
    }

    this.saveCart();
  }

  removeFromCart(productId: string): void {
    this.cartItems.set(
      this.cartItems().filter(item => item.product.id !== productId)
    );
    this.saveCart();
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const updatedItems = this.cartItems().map(item =>
      item.product.id === productId
        ? { ...item, quantity }
        : item
    );
    this.cartItems.set(updatedItems);
    this.saveCart();
  }

  clearCart(): void {
    this.cartItems.set([]);
    this.storageService.removeItem(this.CART_KEY);
  }

  getItemQuantity(productId: string): number {
    const item = this.cartItems().find(item => item.product.id === productId);
    return item?.quantity || 0;
  }

  isInCart(productId: string): boolean {
    return this.cartItems().some(item => item.product.id === productId);
  }
}
