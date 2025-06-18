import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { CartService, CartItem2 } from '../services/cart.service';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-summary',
  imports: [ ReactiveFormsModule,
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
    NgStyle,
    MatNativeDateModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

   private cartService = inject(CartService);
  readonly cartItems = signal<CartItem2[]>([]);
  selectedMealType = 'Lunch';
  paymentType = 'Card';
  pickupDate: Date = new Date();
  minDate = new Date();
  constructor() {
    effect(() => {
      this.cartService.cartItems$.subscribe((items) =>
        this.cartItems.set(items)
      );
    });
    this
  }
  activeStyle = {
    background: '#024f5c',
    color: '#fff',
  };

  inactiveStyle = {
    background: '#e0e0e0',
    color: '#000',
  };
  readonly subtotal = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.cartQuantity * (item.foodId.price ?? 0),
      0
    )
  );

  clear() {
    this.cartService.clearCart().subscribe();
  }

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

  calculateSubtotal(): number {
    return this.cartItems().reduce(
      (total, item) => total + item.foodId.price * item.cartQuantity,
      0
    );
  }

  confirmOrder() {}

  isPast12() {
    return this.pickupDate.getHours() >= 12;
  }

}
