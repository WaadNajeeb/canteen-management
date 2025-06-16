import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService, RequestMethod } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CanteenService {
  private readonly topPicks: string = `${environment.apiUrl}/canteen/top-menu-pick`;

  private httpService = inject(HttpService);
  constructor() { }



  getTopPicks() {
    return this.httpService.request<Food[]>(RequestMethod.GET, this.topPicks);
  }
}


export interface User {
  fullName: string;
  email: string;
  role: string;

}


export interface Food {

  name:string;
  description: string;
  price:number;
  category: string;
  imageUrl:string;
  available: string;
  allergens: string[]

}
