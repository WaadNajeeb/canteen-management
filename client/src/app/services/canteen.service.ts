import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService, RequestMethod } from './http.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanteenService {
  private readonly topPicks: string = `${environment.apiUrl}/canteen/top-menu-pick`;
  private readonly allMenu: string = `${environment.apiUrl}/canteen/menu/all`;
  private readonly cartAdd: string = `${environment.apiUrl}/cart/add`;
  private readonly getMenuItemUrl: string = `${environment.apiUrl}/canteen`;
  private httpService = inject(HttpService);

  private cartItems: FoodMenuItem[] = [];

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  // Public observable for components to subscribe to
  cart$: Observable<CartItem[]> = this.cartSubject.asObservable();
  constructor() { }

  getTopPicks() {
    return this.httpService.request<FoodMenuItem[]>(
      RequestMethod.GET,
      this.topPicks
    );
  }

  getMenuItem(id: string):Observable<FoodMenuItem> {
    return this.httpService.request<FoodMenuItem>(
      RequestMethod.GET,
      `${this.getMenuItemUrl}/menu/${id}`
    );
  }

  getUserFoodMenu() {
    return this.httpService.request<FoodMenuItem[]>(
      RequestMethod.GET,
      this.topPicks
    );
  }

  getAllMenu() {
    return this.httpService.request<FoodMenuItem[]>(
      RequestMethod.GET,
      this.allMenu
    );
  }

  getAllMenu2(search?: string, page: number = 1) {
    return this.httpService.request<PaginatedData<FoodMenuItem>>(
      RequestMethod.GET,
      `${this.allMenu}?search=${search}&page=${page}`
    );
  }


}

export interface CartItem extends FoodMenuItem {
  cartQuantity: number; // Quantity in the cart
}
export interface User {
  fullName: string;
  email: string;
  role: string;
}

export interface FoodMenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  available: string;
  allergens: string[];
  quantity: number;
}

export interface PaginatedData<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
