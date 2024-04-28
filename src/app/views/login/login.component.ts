import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent, ReactiveFormsModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  loading = signal(false);
  validatePassword = true;
  emailPassword = true;
  variant = '';

  constructor(private service: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.service
        .sendData({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
        .subscribe({
          next: (resp) => {
            console.log(resp.data.token);
            if (resp.data.token) {
              this.router.navigate(['/']);
            }
            this.loginForm.reset();
            this.loading.set(false);
          },
        });
      this.validatePassword = !this.loginForm.controls['password'].errors;
      this.emailPassword = !this.loginForm.controls['email'].errors;
    } else {
      this.validatePassword = !this.loginForm.controls['password'].errors;
      this.emailPassword = !this.loginForm.controls['email'].errors;
    }
  }
}
