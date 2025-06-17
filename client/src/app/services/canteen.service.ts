import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService, RequestMethod } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CanteenService {
  private readonly topPicks: string = `${environment.apiUrl}/canteen/top-menu-pick`;
  private readonly allMenu: string = `${environment.apiUrl}/canteen/menu/all`;
  private httpService = inject(HttpService);
  constructor() { }



  getTopPicks() {
    return this.httpService.request<FoodMenuItem[]>(RequestMethod.GET, this.topPicks);
  }

  getUserFoodMenu() {
    return this.httpService.request<FoodMenuItem[]>(RequestMethod.GET, this.topPicks);
  }

  getAllMenu(){
    return this.httpService.request<FoodMenuItem[]>(RequestMethod.GET, this.allMenu);
  }


 getAllMenu2(search?: string, page: number = 1) {
  return this.httpService.request<PaginatedData<FoodMenuItem>>(RequestMethod.GET, `${this.allMenu}?search=${search}&page=${page}`);
}
}


export interface User {
  fullName: string;
  email: string;
  role: string;

}


export interface FoodMenuItem {
  _id: string;
  name:string;
  description: string;
  price:number;
  category: string;
  imageUrl:string;
  available: string;
  allergens: string[]

}

export interface PaginatedData<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
}
