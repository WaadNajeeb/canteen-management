import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  CanteenService,
  CartItem,
  FoodMenuItem,
} from '../services/canteen.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatListOption } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, NgStyle } from '@angular/common';
import { CartItem2, CartService } from '../services/cart.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CheckoutItemComponent } from "../checkout-item/checkout-item.component";
import { SummaryComponent } from '../summary/summary.component';
@Component({
  selector: 'app-checkout',
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
    AsyncPipe,
    FormsModule,
    MatSelectModule,
    NgStyle,
    MatDatepickerModule,
    MatNativeDateModule,
    CheckoutItemComponent,
    SummaryComponent
],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
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

  clearCart(){
    this.cartService.clearCart().subscribe();
  }
}
