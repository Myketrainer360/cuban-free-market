import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'marketplace',
        loadComponent: () => import('./features/marketplace/marketplace.component').then(m => m.MarketplaceComponent)
      },
      {
        path: 'cart',
        loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
      },
      {
        path: 'products',
        children: [
          {
            path: 'manage',
            loadComponent: () => import('./features/products/manage/product-manage.component').then(m => m.ProductManageComponent),
            canActivate: [authGuard]
          }
        ]
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
