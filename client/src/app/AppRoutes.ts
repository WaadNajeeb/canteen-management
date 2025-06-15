import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MainViewComponent } from './main-view/main-view.component';
import { UserFavouriteOrderViewComponent } from './user-favourite-order-view/user-favourite-order-view.component';
import { UserPastOrdersComponent } from './user-past-orders/user-past-orders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { StaffSignInComponent } from './staff-sign-in/staff-sign-in.component';
import { StaffdashboardComponent } from './staffdashboard/staffdashboard.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PaymentComponent } from './payment/payment.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { catchError, of, map } from 'rxjs';
import { UserAuthComponent } from './user-auth/user-auth.component';

export const StaffAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  router.navigate(['/login'])
  return false;
};

export const DashboardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
 const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isSigned()
    .pipe(
      catchError(_ => {
        return of(null);
      }),
      map(isValid => {
        if (isValid) {
          return true;
        }
        router.navigate(['/auth/login']);
        return false;
      })
    );
};

export const SignInGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
 const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isSigned()
    .pipe(
      catchError(_ => {
        return of(null);
      }),
      map(isValid => {
        if (!isValid) {
          return true;
        }
        router.navigate(['']);
        return false;
      })
    );
};

export const ROUTES: Routes = [
   {
    path: '',
    component: HomePageComponent, // User layout with side-nav
    children: [
      { path: '', component: MainViewComponent },
      { path: 'favourite-orders', component: UserFavouriteOrderViewComponent },
      { path: 'past-orders', component: UserPastOrdersComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'settings', component: AccountSettingsComponent },
      { path: 'payment', component: PaymentComponent, canActivate: [DashboardGuard]}
    ],

  },
  {
    path:'auth',
    children:[
      { path: 'login', component: SigninComponent, canActivate:[SignInGuard] },
      { path: 'register', component: SignupComponent, canActivate:[SignInGuard] },
    ]
  },

  {
    path: 'staff',
    children: [
      { path: 'login', component: StaffSignInComponent },
      {
        path: 'dashboard',
        component: StaffdashboardComponent
      },
      // Add more authenticated staff routes here
    ]
  },
  { path: '**', redirectTo: '' }
];



