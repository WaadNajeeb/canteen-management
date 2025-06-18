import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Order, OrderService } from '../services/order.service';
import { DatePipe, DecimalPipe, JsonPipe } from '@angular/common';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-user-past-orders',
  imports: [DatePipe, MatCardModule, MatTableModule, MatProgressSpinnerModule, MatIconModule,
     DecimalPipe, RouterLink, MatButtonModule, MatIconModule],
  templateUrl: './user-past-orders.component.html',
  styleUrl: './user-past-orders.component.scss'
})
export class UserPastOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
displayedColumns: string[] = ['name', 'price', 'quantity', 'total'];
  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.loading = false;
      }
    });
  }


   goToMenuItem() {
  }
}
