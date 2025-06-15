import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; // <--- Key import here

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly authToken = `${environment.apiUrl}/auth/token`;
  private readonly signOutUrl: string = `${environment.apiUrl}/auth/logout`;
  private readonly loginUrl: string = `${environment.apiUrl}/auth/login`;
  private readonly registerUrl: string = `${environment.apiUrl}/auth/register`;

  private httpClient = inject(HttpClient);



  register(register: Register) {
    return this.httpClient.post<string>(this.registerUrl, register);
  }

  login(loginModel: Login) {
    return this.httpClient.post<string>(this.loginUrl, loginModel, { withCredentials: true });
  }

  refresh() {
    return this.httpClient.get<string>(this.authToken);
  }

  signOutClient() {
    // this.router.navigate(['/signin']);
  }

  isSigned() {
    return this.httpClient.get<boolean>('');
  }

  signOutServer() {
    return this.httpClient.post(this.signOutUrl, null, { withCredentials: true });
  }


  logout(){
    this.signOutServer();
    this.signOutClient();
  }
}


export interface Register {
  firstName: string;
  lastName: string;
  email:string;
  password: string;
  confirmPass:string;
}

export interface Login{
  email:string;
  password: string;
}
