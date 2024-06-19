import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import { LogoutService } from '../../services/logout/logout.service';
import { GetUserService } from '../../services/get_user/get-user.service';
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

  constructor(private service: LogoutService, private router: Router, private auth: GetUserService) {
    const token = localStorage.getItem('token') ?? ''
    this.user = this.router.url == '/usuario'
    // || this.router.url == '/login'
    if (token) this.login = true; // Atribui a URL atual a uma variável
    this.auth.getUser().subscribe({
      next: (resp) => {
        console.log(resp)
        // this.dadosForm.patchValue({ email: resp?.email, nome: resp?.nome });
        if (resp?.tipo.toLowerCase() == 'candidato') {
          this.empresa = true
          //   resp?.experiencia?.forEach((exp) => {
          //     this.dadosForm.patchValue({
          //       empresa: exp.nome_empresa,
          //       fim: exp.fim,
          //       inicio: exp.inicio,
          //       cargo: exp.cargo,
          //     })
          //   })

          //   resp?.competencias?.forEach((comp) => {
          //     this.selectedItems.push(comp);
          //   })
          //   this.dadosForm.patchValue({
          //     competencias: this.selectedItems
          //   });
          // } else {
          //   this.candidato = true;
          //   this.dadosForm.patchValue({
          //     ramo: resp.ramo,
          //     descricao: resp.descricao,
          //   })
        } else {
          this.empresa = false
        }
      },
      error: (error) => {
        console.log(error)
        if (error?.error.mensagem) {
          alert(error?.error.mensagem)

          // this.error_message = error?.error.mensagem
          // this.error_login = false;
        };
      },
    });
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