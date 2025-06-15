import { inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, concatMap, finalize, Observable, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private notificationService = inject(NotificationService);
  private authService = inject(AuthService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      const req = this.addAuthorizationHeader(request);

      return next.handle(req).pipe(
          catchError((error: HttpErrorResponse) => {
              if (error instanceof HttpErrorResponse) {
                  if (error.status === 401) {
                      return this.handleError(req, next);
                  }
                  if (error && error.status === 400 && error.error) {
                      return throwError(() => error);;
                  }
              }

              return throwError(() => error);
          })
      );
  }

  private handleError(request: HttpRequest<unknown>, next: HttpHandler) {
      this.isRefreshing = true;

          return this.authService.refresh().pipe(
              concatMap((xsrf: string) => {
                  this.authService.signOutClient();
                  return new Observable<HttpEvent<unknown>>();
              }),
              catchError(error => {
                  this.authService.signOutClient();
                  return new Observable<HttpEvent<unknown>>();
              }),
              finalize(() => {
                  this.isRefreshing = false;
                  //this._token.next({} as TokenResult);
              })
          );
  }

  private addAuthorizationHeader(request: HttpRequest<unknown>) {
    request = request.clone({
        withCredentials: true
    });
    return request;
}
}

