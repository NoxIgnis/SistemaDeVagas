import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/logout/logout.service';
type localVariants = 'retangulo-head' | '';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink, RouterLinkActive, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() login: boolean = false;
  @Input() variant: localVariants = 'retangulo-head';
  @Input() user: boolean = false;
  @Input() empresa: boolean = false;

  constructor(private service: LogoutService, private router: Router) {
    const token  = localStorage.getItem('token') ?? ''
     this.user = this.router.url == '/usuario'
    // || this.router.url == '/login'
    if(token) this.login = true; // Atribui a URL atual a uma variável
  }

  onSubmit() {
      this.service
        .sendLogout()
        .subscribe({
          next: (resp) => {
            console.log(resp)
            if (resp?.mensagem) {
              localStorage.removeItem('token')
              this.login = false;
              this.router.navigate(['/']);
            };
          },
          error: (error) => {
            console.log(error)
            if (error?.error.mensagem) {
              alert(error?.error.mensagem)
            };
          },
        });
  }
}
