import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItemsComponent } from "../canteen/menu-items/menu-items.component";

@Component({
  selector: 'app-canteen-menu-view',
  imports: [RouterOutlet, MenuItemsComponent],
  templateUrl: './canteen-menu-view.component.html',
  styleUrl: './canteen-menu-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CanteenMenuViewComponent {

}
