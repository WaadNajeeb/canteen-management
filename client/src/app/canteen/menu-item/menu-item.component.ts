import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FoodMenuItem } from '../../models/random';
@Component({
  selector: 'app-menu-item',
  imports: [MatCardModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {

  readonly foodItem = input<FoodMenuItem>();
}
