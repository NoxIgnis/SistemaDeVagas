import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import md5 from 'blueimp-md5';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, ButtonComponent, ReactiveFormsModule, RouterLinkActive, RouterLink],
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
  error_login = true;
  error_message : string = '';

  constructor(private service: LoginService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        // Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.service
        .sendLogin({
          email: this.loginForm.value.email,
          senha: this.loginForm.value.password,
        })
        .subscribe({
          next: (resp) => {
            console.log(resp)
            if (resp?.token) {
              localStorage.setItem('token', resp.token)
              this.router.navigate(['/']);
            };
          },
          error: (error) => {
            console.log(error)
            if (error?.error.mensagem) {
              this.error_message = error?.error.mensagem
              this.error_login = false;
              this.loginForm.reset();
              this.loading.set(false)
            };
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
