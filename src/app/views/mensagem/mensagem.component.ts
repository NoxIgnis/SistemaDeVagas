import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MensagemService } from '../../services/mensagem/mensagem.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import md5 from 'blueimp-md5';
import { IDropdownSettings, MultiSelectComponent, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-mensagem',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, ButtonComponent, NgMultiSelectDropDownModule],
  templateUrl: './mensagem.component.html',
  styleUrl: './mensagem.component.scss'
})
export class MensagemComponent {
  mensagens: any;

  constructor(private service: MensagemService, private router: Router) {
    const token = localStorage.getItem('token') ?? ''
    if (token) {
      this.service.getMensagem().subscribe({
        next: (resp: any) => {

          this.mensagens = resp;
        },
        error: (error: any) => {
          console.log(error)
          if (error?.error.mensagem) {
            console.log(error)
          };
        },
      });
    }
  }
}