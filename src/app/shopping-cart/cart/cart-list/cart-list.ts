import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { CartService } from "../cart.service";
import { CartItemComponent } from "../cart-item/cart-item.component";
import { CartSummaryComponent } from "../cart-summary/cart-summary.component";


@Component({
  selector: 'cart-list',
  standalone: true,
  template: `
  <div class="cart-page-container">
    <div class="cart-items-list">
      <h2>Your Shopping Cart</h2>
      @if(cartItems().length === 0) {
        <p>Your shopping cart is empty.</p>
        <div class="empty-cart-actions">
            <button mat-stroked-button color="primary" routerLink="/product-list">Start Shopping</button>
        </div>
      } @else {
        <h2>Your shopping cart contains: {{ cartItems().length }} items.</h2>
          @for (item of cartItems(); track item.product.id) {
            <cart-item [item]='item'></cart-item> 
          }
      }
    </div>
    @if(cartItems().length > 0) {
      <div class="cart-summary-container">
        <cart-summary></cart-summary>
      </div>
    }
  </div>
  `,
  styles: [`
    .cart-page-container {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      padding: 1rem;
    }

    .cart-items-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    h2 {
      font-size: 1.5rem;
      font-weight: 500;
      border-bottom: 1px solid #ccc;
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .empty-cart-actions {
      padding-top: 1rem;
    }

    /* Responsive adjustment for smaller screens */
    @media (max-width: 992px) {
      .cart-page-container {
        grid-template-columns: 1fr;
      }
    }
  `],
  imports: [CommonModule, CartItemComponent, CartSummaryComponent, MatButtonModule, RouterLink]
})
export class CartList {
  cartService = inject(CartService);
  cartItems = this.cartService.cartItems;
}