import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { AccountService } from '../services/account.service';
@Component({
  selector: 'app-consumer-nav-bar',
  imports: [MatToolbarModule, MatIconButton,MatIcon, RouterLink,NgComponentOutlet, CommonModule, MatButtonModule, FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './consumer-nav-bar.component.html',
  styleUrl: './consumer-nav-bar.component.scss'
})
export class ConsumerNavBarComponent {
 @Output() clicked: EventEmitter<boolean> = new EventEmitter();
  isExpanded:boolean = false


  private accountService = inject(AccountService);
  formGroup:FormGroup = new FormGroup({
    search: new FormControl<string | null>(null)
  });

  protected readonly user$ = this.accountService.getCurrentUser();

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
   this.clicked.emit(this.isExpanded )
  }
}
