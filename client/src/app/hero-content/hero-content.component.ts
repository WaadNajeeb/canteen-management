import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-hero-content',
  imports: [MatCardModule],
  templateUrl: './hero-content.component.html',
  styleUrl: './hero-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroContentComponent {

}
