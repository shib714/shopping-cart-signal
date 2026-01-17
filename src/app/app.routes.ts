import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home', title: 'Home' },

    {
        path: 'home',
        loadComponent: () => import('./common/home/home')
            .then((m) => m.Home), title: 'Home'
    },
     {
         path: 'product-list',
         loadComponent: () => import('./shopping-cart/products/product-list/product-list')
             .then((m) => m.ProductList), title: 'Sgopping Cart App'
     },
          {
         path: 'cart',
         loadComponent: () => import('./shopping-cart/cart/cart-list/cart-list')
             .then((m) => m.CartList), title: 'Sgopping Cart'
     },
];
