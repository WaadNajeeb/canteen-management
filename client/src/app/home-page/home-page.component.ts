import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConsumerNavBarComponent } from "../consumer-nav-bar/consumer-nav-bar.component";
import {MatButtonModule} from '@angular/material/button';
import { MainViewComponent } from "../main-view/main-view.component";
import { SideNavBarComponent } from "../side-nav-bar/side-nav-bar.component";
@Component({
  selector: 'app-home-page',
  imports: [RouterOutlet, ConsumerNavBarComponent, MatButtonModule, MainViewComponent, SideNavBarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
