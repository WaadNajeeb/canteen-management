import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { FoodMenuItem } from './canteen.service';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';


export interface CartItem2 {
  foodId: FoodMenuItem;
  cartQuantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/cart`;

  private cartItemsSubject = new BehaviorSubject<CartItem2[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private httpService: HttpService) {
    this.loadCart();
  }

  private loadCart() {
    this.http.get<CartItem2[]>(this.baseUrl).subscribe({
      next: (items) => this.cartItemsSubject.next(items),
      error: () => this.cartItemsSubject.next([]),
    });
  }

  addToCart(foodId: string): Observable<CartItem2[]> {
    return this.http.post<CartItem2[]>(`${this.baseUrl}/add`, { foodId }).pipe(
      tap((items) => this.cartItemsSubject.next(items))
    );
  }

 updateCartItem(foodId: string, cartQuantity: number): Observable<CartItem2[]> {
  return this.http.put<{ items: CartItem2[] }>(`${this.baseUrl}/update`, { foodId, cartQuantity }).pipe(
    tap(response => this.cartItemsSubject.next(response.items)),
    map(response => response.items)
  );
}

removeFromCart(foodId: string): Observable<CartItem2[]> {
  return this.http.request<{ items: CartItem2[] }>('delete', `${this.baseUrl}/remove`, { body: { foodId } }).pipe(
    tap(response => this.cartItemsSubject.next(response.items)),
    map(response => response.items)
  );
}

clearCart(): Observable<CartItem2[]> {
  return this.http.delete<{ items: CartItem2[] }>(`${this.baseUrl}/clear`).pipe(
    tap(response => this.cartItemsSubject.next(response.items)),
    map(response => response.items)
  );
}

  getTotalQuantity(): number {
    return this.cartItemsSubject.value.reduce((acc, item) => acc + item.cartQuantity, 0);
  }

  getCartItemsSnapshot(): CartItem2[] {
    return this.cartItemsSubject.value;
  }
}
