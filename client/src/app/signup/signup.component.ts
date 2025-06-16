import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { PasswordComponent } from '../shared/password/password.component';
import { UiTextboxMaterialComponent } from '../shared/ui-textbox-material/ui-textbox-material.component';
import { AuthService, Register } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError, EMPTY, map } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-signup',
  imports: [MatCardModule, CommonModule, RouterOutlet, RouterLink, FormsModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule,
        MatButtonModule, MatIconModule, UiTextboxMaterialComponent, PasswordComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  private destroyRef = inject(DestroyRef);
  protected authService = inject(AuthService);
  protected notificationService = inject(NotificationService);
  protected progressService = inject(ProgressService);
  signUpFormGroup = new FormGroup<RegisterFormGroup>({
    email: new FormControl<string>('',[ Validators.required, Validators.email]),
    password: new FormControl<string>('',[ Validators.required]),
    firstName: new FormControl<string>('',[ Validators.required, Validators.email]),
    lastName: new FormControl<string>('',[ Validators.required, Validators.email]),
    confirmPass: new FormControl<string>('',[ Validators.required, Validators.email]),
  });


  constructor(private router: Router){

  }
  onSubmit(){
   const formValue = this.signUpFormGroup.value as Register;

    this.authService.register(formValue).pipe(
      tap((result: string) => {
        if (result) {
          this.handleReigsterSucess(result);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const fallbackMessage = 'Unknown error, please try again later.';
        const errorMessage = error?.error?.Message || fallbackMessage;

        this.signUpFormGroup.setErrors({ submissionError: { message: errorMessage } });
        this.notificationService.error(errorMessage);
        this.progressService.hide();

        return EMPTY;
      })
    ).subscribe();
  }

  private handleReigsterSucess(result: string) {
    this.router.navigate(['login']);
    this.progressService.hide();
  }
}



export interface RegisterFormGroup{
  firstName: FormControl<string | null>;
  lastName: FormControl<string| null>;
  email: FormControl<string| null>;
  password: FormControl<string| null>;
  confirmPass: FormControl<string| null>;
}

