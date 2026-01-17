import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ProductService } from '../service/product.service';
import { ProductCard } from './product-card/product-card';
import { IProduct } from '../models/product.interface';



@Component({
  selector: 'product-list',
  imports: [CommonModule, ProductCard],
  template: `
  @for(p of products(); track p.id) {
    <product-card [product]="p"></product-card>
  }
  `,
  styleUrl: './product-list.scss',
})
export class ProductList {

  private productService = inject(ProductService);
  //cartStore = inject(CartStore);
  products = this.productService.products;

  addProductToCart(product: IProduct) {
   // this.cartStore.addToCart(product);
    console.log("Add product to cart", product);
  }
}