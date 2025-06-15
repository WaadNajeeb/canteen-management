import { Component } from '@angular/core';
import { FoodMenuItem, foodMenuItems } from '../../models/random';
import { MenuItemComponent } from "../menu-item/menu-item.component";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-menu-items',
  imports: [MenuItemComponent, MatCardModule],
  templateUrl: './menu-items.component.html',
  styleUrl: './menu-items.component.scss'
})
export class MenuItemsComponent {

  menuItems: FoodMenuItem[] = foodMenuItems;

}
