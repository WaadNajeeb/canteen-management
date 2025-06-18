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
  private httpService = inject(HttpService);

  private cartItems: FoodMenuItem[] = [];

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  // Public observable for components to subscribe to
  cart$: Observable<CartItem[]> = this.cartSubject.asObservable();
  constructor() {}

  getTopPicks() {
    return this.httpService.request<FoodMenuItem[]>(
      RequestMethod.GET,
      this.topPicks
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


 addToCart2(item: FoodMenuItem): Observable<boolean> {
  const body = {
    foodId: item._id
  }
  console.log(body)
    return this.httpService.request<boolean>(RequestMethod.POST, this.cartAdd, body);
 }

  // Add an item to the cart, respecting stock quantity
  addToCart(item: FoodMenuItem): boolean {
    const currentCart = this.cartSubject.getValue();
    const existingItem = currentCart.find(cartItem => cartItem._id === item._id);

    if (existingItem) {
      // Check if adding one more exceeds stock
      if (existingItem.cartQuantity >= item.quantity) {
        return false; // Cannot add more than available stock
      }
      // Increase cart quantity
      existingItem.cartQuantity += 1;
      this.cartSubject.next([...currentCart]);
      return true;
    } else {
      // Check if stock is available
      if (item.quantity < 1) {
        return false; // No stock available
      }
      // Add new item with cartQuantity 1
      const newCartItem: CartItem = { ...item, cartQuantity: 1 };
      this.cartSubject.next([...currentCart, newCartItem]);
      return true;
    }
  }

  // Get the current cart state
  getCart(): CartItem[] {
    return this.cartSubject.getValue();
  }

  getTotal() {
    return this.cartSubject.getValue().length;
  }
  // Clear the cart
  clearCart(): void {
    this.cartSubject.next([]);
  }


  // Update the cart quantity for an item
  updateQuantity(itemId: string, newQuantity: number): boolean {
    const currentCart = this.cartSubject.getValue();
    const item = currentCart.find(cartItem => cartItem._id === itemId);

    if (item) {
      // Ensure new quantity doesn't exceed stock and is non-negative
      if (newQuantity <= item.quantity && newQuantity >= 0) {
        if (newQuantity === 0) {
          // Remove item if quantity is set to 0
          this.removeFromCart(itemId);
        } else {
          // Update quantity
          item.cartQuantity = newQuantity;
          this.cartSubject.next([...currentCart]);
        }
        return true;
      }
      return false; // Invalid quantity (exceeds stock or negative)
    }
    return false; // Item not found
  }

  // Remove an item from the cart
  removeFromCart(itemId: string): void {
    const currentCart = this.cartSubject.getValue();
    const updatedCart = currentCart.filter(cartItem => cartItem._id !== itemId);
    this.cartSubject.next(updatedCart);
  }

  // Get the total cart price
  getTotalPrice(): number {
    return this.cartSubject.getValue().reduce((total, item) => {
      return total + item.price * item.cartQuantity;
    }, 0);
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
