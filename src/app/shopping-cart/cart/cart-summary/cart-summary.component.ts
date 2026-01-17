import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { CartService } from '../cart.service';

@Component({
  selector: 'cart-summary',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {
  cartService = inject(CartService);

  // Expose signals to the template
  

  subTotal = this.cartService.subTotal;

  deliveryFee = this.cartService.deliveryFee;

  tax = this.cartService.tax;
  totalPrice = this.cartService.totalPrice;
}
