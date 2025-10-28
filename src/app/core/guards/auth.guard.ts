import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const storageService = inject(StorageService);

  const token = storageService.getItem('auth_token');

  if (token) {
    return true;
  }

  // Redirect to login page
  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
