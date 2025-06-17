import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MenuItemComponent } from '../canteen/menu-item/menu-item.component';
import { CanteenService } from '../services/canteen.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-today-favourite-consumer',
  imports: [MenuItemComponent, MatCardModule, AsyncPipe, MenuItemComponent],
  templateUrl: './today-favourite-consumer.component.html',
  styleUrl: './today-favourite-consumer.component.scss'
})
export class TodayFavouriteConsumerComponent {

  protected canteenService = inject(CanteenService);

  topPicks$ = this.canteenService.getTopPicks().pipe();

}
