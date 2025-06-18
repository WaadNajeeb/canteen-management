import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';

import {
  MatButton,
  MatButtonModule,
  MatIconButton,
} from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDivider, MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ConsumerNavBarComponent } from '../consumer-nav-bar/consumer-nav-bar.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CanteenService } from '../services/canteen.service';
import { CartService } from '../services/cart.service';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-side-nav-bar',
  imports: [
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatListModule,
    MatToolbarModule,
    RouterOutlet,
    ConsumerNavBarComponent,
    MatDivider,
    MatBadgeModule
  ],
  templateUrl: './side-nav-bar.component.html',
  styleUrl: './side-nav-bar.component.scss',
})
export class SideNavBarComponent {

   private authService = inject(AuthService);
  public checkout = inject(CartService);
  @ViewChild('sidenav') sidenav: any;

  isExpanded = true;
  activePage = 'home';
  isMobile = false;

  constructor(private router: Router) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.setActivePageFromUrl(this.router.url);
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setActivePageFromUrl(event.urlAfterRedirects);
      });
  }

  private setActivePageFromUrl(url: string) {
    const parts = url.split('/');
    this.activePage = parts[1] || 'home'; // e.g., /menu -> 'menu'
  }

  setActive(page: string) {
    this.activePage = page;
    this.router.navigate([page]);
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  get cardQuantity() {
    return this.checkout.getTotalQuantity();
  }

  get showNav() {
    return this.isExpanded;
  }

  logout(){
    this.authService.logout();
  }
}
