import { Component, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FoodMenuItem } from '../../services/canteen.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink, RouterOutlet],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {

  readonly foodItem = input.required<FoodMenuItem>();

  protected router = inject(Router);
  protected route = inject(ActivatedRoute)
  onClick(){
    this.router.navigate(['234234'], { relativeTo: this.route });
  }
}
