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
import { IDropdownSettings, MultiSelectComponent, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GetUserService } from '../../services/get_user/get-user.service';

@Component({
  selector: 'app-lista-vagas',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, ButtonComponent, NgMultiSelectDropDownModule],
  templateUrl: './lista-vagas.component.html',
  styleUrl: './lista-vagas.component.scss'
})

export class ListaVagasComponent {
  vagas: any;
  variant = '';

  constructor(private service: VagasService, private router: Router, private auth: GetUserService) {
    const token = localStorage.getItem('token') ?? '';
    if (token) {

      this.service.GetVagas().subscribe({
        next: (resp) => {
          console.log(resp)
          this.vagas = resp;
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
  viewDetailsCandidato(id: number): void {
    this.router.navigate(['candidato/vaga/', id]);
  }
}