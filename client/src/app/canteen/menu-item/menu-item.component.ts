import { Component, inject, input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FoodMenuItem } from '../../services/canteen.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { Observable, shareReplay, tap } from 'rxjs';
import { FavouriteService } from '../../services/favourite.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-menu-item',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterOutlet,
    AsyncPipe
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class MenuItemComponent implements OnInit {
  readonly foodItem = input.required<FoodMenuItem>();
  isFavourited = false;
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);
  private notificationService = inject(NotificationService);
  private cartService = inject(CartService);
  private favouriteService = inject(FavouriteService);
  isFavourited$!: Observable<boolean>;


  ngOnInit(): void {
    this.isFavourited$ = this.favouriteService.isFavourite(this.foodItem()._id).pipe(shareReplay(1));
  }
  onClick() {
    this.router.navigate(['234234'], { relativeTo: this.route });
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

  toggleFavourite() {
    this.favouriteService.toggleFavourite(this.foodItem()._id).subscribe();
  }

}
