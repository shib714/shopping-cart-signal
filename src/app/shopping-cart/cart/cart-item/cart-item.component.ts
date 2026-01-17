import { Component, computed, inject, Input, signal } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../cart';
import { CartService } from '../cart.service';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'cart-item',
  imports: [CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent {

  cartService = inject(CartService);
  // Use a setter to emit whenever a new item is set
  
  _item!: CartItem;
  get item(): CartItem {
    return this._item;
  }
  @Input() set item(item: CartItem) {
    this._item = item;
    this.cartItem.set(item);
  }

  // Hard-coded quantity
  // These could instead come from an inventory system
  qtyArr = signal([1, 2, 3, 4, 5, 6, 7, 8]);

  // Cart item signal
  cartItem = signal(this.item);

  // When the item changes, recalculate the extended price
  exPrice = computed(() =>
    this.cartItem().quantity * Number(this.cartItem().product.price));



  onSelectionChange(quantity: number): void {
    // Update the quantity in the item
    this.cartService.updateInCart(this.cartItem(), Number(quantity));
  }

  removeItem(): void {
    this.cartService.removeFromCart(this.cartItem());
  }

  incrementItem(): void {
    this.cartService.updateInCart(this.cartItem(), this.cartItem().quantity + 1);
  }
  decrementItem(): void {  
    this.cartService.updateInCart(this.cartItem(), this.cartItem().quantity - 1);
  }

}