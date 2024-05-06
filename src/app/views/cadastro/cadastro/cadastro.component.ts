import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { GetUserService } from '../../services/get_user/get-user.service';
import { Router } from '@angular/router';
import md5 from 'blueimp-md5';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HeaderComponent } from '../../../components/header/header.component';
import { ButtonComponent } from '../../../components/button/button.component';
import { CadastroService } from '../../../services/cadastro/cadastro.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, ButtonComponent, NgMultiSelectDropDownModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  CadForm!: FormGroup;
  tipo = signal(false);
  emailPassword = true;
  validateNome = true;
  variant = '';
  error_login = true;
  error_message : string = '';
  dropdownList = [];
  selectedItems: any[] = [];
  dropdownSettings = {};
  validatePassword = true;
  validatetipo = true;
  tipoCad = true;

  constructor(private service: CadastroService,  private router: Router) {
    this.CadForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', [Validators.required]),
      ramo: new FormControl(''),
      descricao: new FormControl(''),
      senha: new FormControl('', [Validators.required,Validators.minLength(8)]),
      tipo: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    });
  }
  onSubmit() {
    if (this.CadForm.valid) {
      // this.tipo.set(true);
      this.service
        .sendCad({
          email: this.CadForm.value.email,
          nome: this.CadForm.value.nome,
          senha: md5(this.CadForm.value.password),
          tipo: this.CadForm.value.tipo,
          ramo: this.CadForm.value.ramo,
          descricao: this.CadForm.value.descricao
        })
        .subscribe({
          next: (resp) => {
            console.log(resp)
              this.router.navigate(['/usuario']);
          },
          error: (error) => {
            console.log(error)
            if (error?.error.mensagem) {
              this.error_message = error?.error.mensagem
              this.error_login = false;
              this.CadForm.reset();
            };
          },
        });
      this.emailPassword = !this.CadForm.controls['email'].errors;
    } else {
      this.emailPassword = !this.CadForm.controls['email'].errors;
    }
  }

  veriType(event: any){
    console.log(event)
    if(event == 1){
      this.CadForm.controls['ramo'].addValidators([Validators.required])
      this.CadForm.controls['descricao'].addValidators([Validators.required])
      this.tipoCad = false 
    }else{
      this.CadForm.controls['ramo'].clearValidators()
      this.CadForm.controls['descricao'].clearValidators()
      this.tipoCad = true
    }
  }
}
