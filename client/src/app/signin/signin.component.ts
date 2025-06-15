import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { UiTextboxMaterialComponent } from '../shared/ui-textbox-material/ui-textbox-material.component';
import { PasswordComponent } from '../shared/password/password.component';
import { ProgressService } from '../services/progress.service';
import { AuthService, Login } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-signin',
  imports: [MatCardModule, CommonModule, RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
        MatButtonModule, MatIconModule, UiTextboxMaterialComponent, PasswordComponent],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

    private destroyRef = inject(DestroyRef);
  protected authService = inject(AuthService);
  protected notificationService = inject(NotificationService);
  protected progressService = inject(ProgressService);

  signFormGroup = new FormGroup<LoginFormGroup>({
    email: new FormControl<string>('',[ Validators.required, Validators.email]),
    password: new FormControl<string>('',[ Validators.required]),
  });


 constructor(private router: Router){

  }

   onSubmit(){
   const formValue = this.signFormGroup.value as Login;

    this.authService.login(formValue).pipe(
      tap((result: string) => {
        if (result) {
          this.handleReigsterSucess(result);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const fallbackMessage = 'Unknown error, please try again later.';
        const errorMessage = error?.error?.Message || fallbackMessage;

        this.signFormGroup.setErrors({ submissionError: { message: errorMessage } });
        this.notificationService.error(errorMessage);
        this.progressService.hide();

        return EMPTY;
      })
    ).subscribe();
  }

  private handleReigsterSucess(result: string) {
    this.router.navigate(['']);
    this.progressService.hide();
  }
}


export interface LoginFormGroup{
  email: FormControl<string| null>;
  password: FormControl<string| null>;
}
