import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent } from '../../components/button/button.component';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VagasService } from '../../services/vagas/vagas.service';

@Component({
  selector: 'app-vagas',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './vagas.component.html',
  styleUrl: './vagas.component.scss'
})
export class VagasComponent {
  dadosForm!: FormGroup;
  vagas: any;
  variant = '';

  constructor(private service: VagasService,  private router: Router) {
    const token  = localStorage.getItem('token') ?? '';
    if(token){
      this.dadosForm = new FormGroup({
        titulo: new FormControl('',[Validators.required]),
        salario_max: new FormControl(0, [Validators.required]),
        salario_min: new FormControl(0,[Validators.required]),
        experiencia: new FormControl(0, [Validators.required]),
        // competencias: new FormControl([], [Validators.required]),
        ativo: new FormControl(0, [Validators.required]),
        ramo_id: new FormControl(0,[Validators.required]),
        descricao: new FormControl(0,[Validators.required]),
      });
    this.service.GetVagas().subscribe({
      next: (resp) => {
        console.log(resp)
        this.vagas = resp;
      },
      error: (error) => {
        console.log(error)
        if (error?.error.mensagem) {
          console.log(error);
          // this.error_message = error?.error.mensagem
          // this.error_login = false;
        };
      },
    })
  }
  }
  viewDetails(id: number): void {
    this.router.navigate(['/vaga', id]);
  }

  cadastrarVaga(): void {
    if (this.dadosForm.valid) {
      this.service
        .pushVaga(this.dadosForm.value)
        .subscribe({
          next: (resp) => {
            console.log(resp)
              this.router.navigate(['/vagas']);
          },
          error: (error) => {
            console.log(error)
            if (error?.error.mensagem) {
              console.log(error);
            };
          },
        });
    } else {
      console.log('avlert');
    }
  }

}
