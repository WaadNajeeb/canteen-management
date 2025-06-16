import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, concatMap, filter, finalize, Observable, switchMap, take, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const req = this.addAuthorizationHeader(request);

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(req, next);
        } else if (error.status === 400 && error.error) {
          // You might want to display a more specific error message here
          this.notificationService.error('Bad Request: ' + (error.error.message || ''));
          return throwError(() => error);
        } else {
          // General error handling
          this.notificationService.error('An unexpected error occurred.');
          return throwError(() => error);
        }
      })
    );
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null); // Clear the subject before refreshing

      return this.authService.refresh().pipe(
        switchMap((success: boolean) => {
          this.isRefreshing = false;
          if (success) {
            this.refreshTokenSubject.next(true); // Signal that refresh was successful
            return next.handle(this.addAuthorizationHeader(request));
          } else {
            // Refresh failed, sign out the user
            this.authService.signOutClient();
            return throwError(() => new Error('Refresh token failed'));
          }
        }),
        catchError((error) => {
          this.isRefreshing = false;
          this.authService.signOutClient();
          return throwError(() => error);
        }),
        finalize(() => {
          // This finalize block might not be strictly necessary here if switchMap handles success/failure well
          // but good for ensuring isRefreshing is false
        })
      );
    } else {
      // If a refresh is already in progress, wait for it to complete
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null), // Wait until the token is refreshed (or refresh failed)
        take(1), // Take only one value after the refresh is complete
        switchMap(() => {
          return next.handle(this.addAuthorizationHeader(request));
        })
      );
    }
  }

  private addAuthorizationHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    // Assuming your authService provides a method to get the current access token
    // or that cookies are handled automatically by `withCredentials`.
    // If you need to add an Authorization header manually (e.g., Bearer token), do it here.
    // const accessToken = this.authService.getAccessToken(); // Example
    // if (accessToken) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${accessToken}`
    //     }
    //   });
    // }

    // This is already good for handling cookies/credentials
    request = request.clone({
      withCredentials: true
    });
    return request;
  }
}
