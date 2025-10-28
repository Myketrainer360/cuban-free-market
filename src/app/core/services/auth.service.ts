import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { User } from '../models/user.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'current_user';
  private readonly TOKEN_KEY = 'auth_token';

  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal<boolean>(false);

  user = this.currentUser.asReadonly();
  authenticated = this.isAuthenticated.asReadonly();

  constructor(private storageService: StorageService) {
    this.loadUser();
  }

  private loadUser(): void {
    const user = this.storageService.getItem<User>(this.USER_KEY);
    const token = this.storageService.getItem<string>(this.TOKEN_KEY);

    if (user && token) {
      this.currentUser.set(user);
      this.isAuthenticated.set(true);
    }
  }

  login(email: string, password: string): Observable<User> {
    // Simulate API call
    const mockUser: User = {
      id: '1',
      email: email,
      firstName: 'Juan',
      lastName: 'Pérez',
      role: 'BUYER' as any,
      avatar: 'https://ui-avatars.com/api/?name=Juan+Perez',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date()
    };

    const mockToken = 'mock-jwt-token-' + Date.now();

    this.storageService.setItem(this.USER_KEY, mockUser);
    this.storageService.setItem(this.TOKEN_KEY, mockToken);

    this.currentUser.set(mockUser);
    this.isAuthenticated.set(true);

    return of(mockUser).pipe(delay(500));
  }

  logout(): void {
    this.storageService.removeItem(this.USER_KEY);
    this.storageService.removeItem(this.TOKEN_KEY);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
  }

  updateProfile(userData: Partial<User>): Observable<User> {
    const currentUser = this.currentUser();
    if (!currentUser) {
      throw new Error('No user logged in');
    }

    const updatedUser: User = {
      ...currentUser,
      ...userData,
      updatedAt: new Date()
    };

    this.storageService.setItem(this.USER_KEY, updatedUser);
    this.currentUser.set(updatedUser);

    return of(updatedUser).pipe(delay(500));
  }

  getUser(): User | null {
    return this.currentUser();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}
