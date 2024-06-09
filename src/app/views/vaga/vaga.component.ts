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
import { VagaService } from '../../services/vaga/vaga.service';


@Component({
  selector: 'app-vaga',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './vaga.component.html',
  styleUrl: './vaga.component.scss'
})
export class VagaComponent {
  dadosForm!: FormGroup;

  constructor(private service: VagaService,  private router: Router) {
    const token  = localStorage.getItem('token') ?? '';
    const id = this.router.url.split('/')[2];
    console.log(this.router.url);
    if(token){
      this.dadosForm = new FormGroup({
        id: new FormControl('',[Validators.required]),
        titulo: new FormControl('',[Validators.required]),
        salario_max: new FormControl('', [Validators.required]),
        salario_min: new FormControl('',[Validators.required]),
        experiencia: new FormControl('', [Validators.required]),
        // competencias: new FormControl([], [Validators.required]),
        ativo: new FormControl(0, [Validators.required],),
        ramo_id: new FormControl('',[Validators.required]),
        descricao: new FormControl('',[Validators.required]),
      });
    this.service.GetVaga(id).subscribe({
      next: (resp) => {
        console.log(resp)
        this.dadosForm.patchValue(resp);
      },
      error: (error) => {
        console.log(error)
        if (error?.error.mensagem) {
          console.log(error);
        };
      },
    })
  }
  }
  

  onSubmit() {
    const id = this.router.url.split('/')[2];
    if (this.dadosForm.valid) {
      this.service
        .sendEdit(this.dadosForm.value, id)
        .subscribe({
          next: (resp) => {
            console.log(resp)
              this.router.navigate(['/vaga/'+id]);
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

  onDelete() {
    const id = this.router.url.split('/')[2];
      this.service
        .deleteVaga(id)
        .subscribe({
          next: (resp) => {
            console.log(resp)
              this.router.navigate(['/']);
          },
          error: (error) => {
            console.log(error)
            if (error?.error.mensagem) {
             console.log(error);
            };
          },
        });
  }
}
