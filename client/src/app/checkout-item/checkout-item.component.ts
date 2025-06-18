import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CartItem2, CartService } from '../services/cart.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-checkout-item',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatCardModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
],
  templateUrl: './checkout-item.component.html',
  styleUrl: './checkout-item.component.scss'
})
export class CheckoutItemComponent {
 private cartService = inject(CartService);
  item = input.required<CartItem2>();


   decreaseQuantity(item: CartItem2) {
    this.cartService.updateCartItem(item.foodId._id, 1).subscribe();
  }

  increaseQuantity(item: CartItem2) {
    this.cartService
      .updateCartItem(item.foodId._id, item.cartQuantity + 1)
      .subscribe();
  }
  removeItem(id: string) {
    this.cartService.removeFromCart(id).subscribe();
  }
  getQuantityOptions(maxQuantity: number): number[] {
    return Array.from({ length: maxQuantity }, (_, i) => i + 1);
  }
}
