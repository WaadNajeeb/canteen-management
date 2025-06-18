import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; // <--- Key import here
import { Router } from '@angular/router';
import { HttpService, RequestMethod } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authToken = `${environment.apiUrl}/auth/token`;
  private readonly signOutUrl: string = `${environment.apiUrl}/auth/logout`;
  private readonly loginUrl: string = `${environment.apiUrl}/auth/login`;
  private readonly registerUrl: string = `${environment.apiUrl}/auth/register`;

  private readonly isSignedUrl: string = `${environment.apiUrl}/auth/isSigned`;
  private readonly isAuthenticatedUrl: string = `${environment.apiUrl}/auth/isAuthenticated`;
  private httpClient = inject(HttpClient);
  private httpService = inject(HttpService);

  private router = inject(Router);

  register(register: Register) {
    return this.httpClient.post<string>(this.registerUrl, register);
  }

  login(loginModel: Login) {
    return this.httpClient.post<string>(this.loginUrl, loginModel, {
      withCredentials: true,
    });
  }

  refresh() {
    return this.httpClient.get<boolean>(this.authToken);
  }

  isSigned() {
    return this.httpClient.get<boolean>(this.isSignedUrl);
  }

  isAuthenticated() {
    return this.httpClient.get<boolean>(this.isAuthenticatedUrl);
  }

  signOutServer(): Observable<LogoutResult> {
    return this.httpService.request<LogoutResult>(
      RequestMethod.POST,
      this.signOutUrl
    );
  }

  signOutClient() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.signOutServer().subscribe({
      complete: () => this.signOutClient(),
    });
  }
}

export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPass: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface LogoutResult {
  message: string;
  success: boolean;
}
