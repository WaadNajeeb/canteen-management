import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService, RequestMethod } from './http.service';
import { environment } from '../../environments/environment';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total_price: number;
}

export interface Order {
  createdAt: string;
  status: string;
  totalAmount: number;
  items: OrderItem[];
}
export interface OrderCreate{
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
   private baseUrl = `${environment.apiUrl}/order`;

  private httpService = inject(HttpService)

  createOrder(mealType: string, paymentType:string): Observable<OrderCreate> {
    const body = {
      mealType: mealType.toLowerCase(),
      paymentType: paymentType.toLowerCase()
    }
    return this.httpService.request<OrderCreate>(RequestMethod.POST,  `${this.baseUrl}/create`, body);
  }

  getMyOrders(): Observable<Order[]> {
    return this.httpService.request<Order[]>(RequestMethod.GET, `${this.baseUrl}/my`);
  }


}
