import { Component, EventEmitter, inject, Input, input, output, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { IProduct } from '../../models/product.interface';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../../cart/cart.service';


@Component({
  selector: 'product-card',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  template: `
    <mat-card>
      <mat-card-header>       
        <mat-card-title>{{ product().title }}</mat-card-title>
        <mat-card-subtitle>{{ product().category }}</mat-card-subtitle>
      </mat-card-header>
      <img mat-card-image src="{{ product().image }}" alt="{{ product().title }}" />
      <mat-card-content>
        <p>{{ product().description.substring(0, 100)}}...</p>
        <p class="price">{{ product().price | currency: 'CAD' }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="addToCart(product())">Add to cart</button>
      </mat-card-actions>
    `,
  styleUrl: './product-card.scss',
})
export class ProductCard {

  cartService = inject(CartService);


  product = input.required<IProduct>();
  handleAdd = output<IProduct>();  

  addToCart(product: IProduct) {
    this.handleAdd.emit(this.product());
    this.cartService.addToCart(product);
  
  }


}