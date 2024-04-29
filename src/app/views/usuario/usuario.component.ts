import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GetUserService } from '../../services/get_user/get-user.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import md5 from 'blueimp-md5';
import { IDropdownSettings, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, ButtonComponent, NgMultiSelectDropDownModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent {
  dadosForm!: FormGroup;
  tipo = signal(false);
  emailPassword = true;
  validateNome = true;
  variant = '';
  error_login = true;
  error_message : string = '';
  dropdownList = [];
  selectedItems: any[] = [];
  dropdownSettings = {};

  constructor(private service: GetUserService,  private router: Router) {
    const token  = localStorage.getItem('token')
    this.dadosForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      nome: new FormControl('', [
        Validators.required]),
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };
    
    if(token){
      this.service.getUser().subscribe({
        next: (resp) => {
          console.log(resp)
          this.dadosForm.patchValue({email: resp?.email, nome: resp?.nome});
        },
        error: (error) => {
          console.log(error)
          if (error?.error.mensagem) {
            this.error_message = error?.error.mensagem
            this.error_login = false;
          };
        },
      });
      this.service.getCompetencias().subscribe({
        next: (resp) => {
          console.log(resp)
          this.dropdownList = resp;
        },
        error: (error) => {
          console.log(error)
          if (error?.error.mensagem) {
            this.error_message = error?.error.mensagem
            this.error_login = false;
          };
        },
      });
    }
  }

  onSubmit() {
    if (this.dadosForm.valid) {
      // this.tipo.set(true);
      this.service
        .sendEdit({
          email: this.dadosForm.value.email,
          nome: this.dadosForm.value.nome,
          competencias: this.selectedItems,
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
              this.dadosForm.reset();
            };
          },
        });
      this.emailPassword = !this.dadosForm.controls['email'].errors;
    } else {
      this.emailPassword = !this.dadosForm.controls['email'].errors;
    }
  }
  onItemSelect(event: any){
    this.selectedItems.push(event);
  }
  onItemDeselect(event: any){
    this.selectedItems = this.selectedItems.filter(item => item?.id !== event?.id)
  }
  onSelectAll(event: any){ 
    this.selectedItems = [];
    this.selectedItems.push(event);
  }
  onDeSelectAll(event: any){
    this.selectedItems = [];
  }
}
