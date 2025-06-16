import { inject, Injectable, REQUEST } from '@angular/core';
import { HttpService, RequestMethod } from './http.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

   private readonly user: string = `${environment.apiUrl}/auth/current_user`;

  private httpService = inject(HttpService);
  constructor() { }



  getCurrentUser() {
    return this.httpService.request<User>(RequestMethod.GET, this.user);
  }
}


export interface User {
  fullName: string;
  email: string;
  role: string;

}
