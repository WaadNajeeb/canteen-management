import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService, RequestMethod } from './http.service';
import { Observable } from 'rxjs';
import { FoodMenuItem, PaginatedData } from './canteen.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

   private readonly baseUrl: string = `${environment.apiUrl}/user`;

  constructor(private httpService: HttpService) {}


  toggleFavourite(menuItemId: string): Observable<{ message: string; added?: boolean; removed?: boolean }> {
    return this.httpService.request(RequestMethod.POST, `${this.baseUrl}/favourites/${menuItemId}`);
  }

  isFavourite(itemId: string){
    return this.httpService.request<boolean>(RequestMethod.GET, `${this.baseUrl}/favourites/IsFavourite/${itemId}`);
  }

  getFavourites(search?: string, page: number = 1) {
    return this.httpService.request<PaginatedData<FoodMenuItem>>(
      RequestMethod.GET,
      `${this.baseUrl}/favourites?search=${search}&page=${page}`
    );
  }
  // getPastOrders(): Observable<{ orders: Order[] }> {
  //   return this.httpService.request(RequestMethod.GET, `${this.baseUrl}/orders/mine`);
  // }
}
