import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, Subscription, tap } from 'rxjs';
import { CanteenService, FoodMenuItem } from '../../services/canteen.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
@Component({
  selector: 'app-menu-item-detail',
  imports: [RouterOutlet, AsyncPipe, JsonPipe, MatCardModule, MatIcon, MatButtonModule, RouterLink],
  templateUrl: './menu-item-detail.component.html',
  styleUrl: './menu-item-detail.component.scss'
})
export class MenuItemDetailComponent {

  item = signal<FoodMenuItem | undefined>(undefined);
  menuItem$!: Observable<FoodMenuItem>;

  constructor(private route: ActivatedRoute, private menuService: CanteenService, private cartService: CartService, private notificationService: NotificationService) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.menuItem$ = this.menuService.getMenuItem(id).pipe();
    }
  }

  addToCart(item: FoodMenuItem) {
    this.cartService
      .addToCart(item._id)
      .pipe(
        tap((e) =>
          this.notificationService.success(
            `🛒 "${item.name}" added to your cart!`
          )
        )
      )
      .subscribe();
  }
}
