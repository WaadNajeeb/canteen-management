import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MenuItemComponent } from '../canteen/menu-item/menu-item.component';

@Component({
  selector: 'app-today-favourite-consumer',
  imports: [MenuItemComponent, MatCardModule],
  templateUrl: './today-favourite-consumer.component.html',
  styleUrl: './today-favourite-consumer.component.scss'
})
export class TodayFavouriteConsumerComponent {

}
