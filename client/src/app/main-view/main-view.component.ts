import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SideNavBarComponent } from '../side-nav-bar/side-nav-bar.component';
import { MenuItemsComponent } from "../canteen/menu-items/menu-items.component";
import { HeroContentComponent } from "../hero-content/hero-content.component";
import { TodayFavouriteConsumerComponent } from "../today-favourite-consumer/today-favourite-consumer.component";

@Component({
  selector: 'app-main-view',
  imports: [SideNavBarComponent, MenuItemsComponent, HeroContentComponent, TodayFavouriteConsumerComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})
export class MainViewComponent {

}
