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

@Component({
  selector: 'app-vagas',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, ButtonComponent, NgMultiSelectDropDownModule],
  templateUrl: './vagas.component.html',
  styleUrl: './vagas.component.scss'
})
export class VagasComponent {
  dadosForm!: FormGroup;
  vagas: any;
  variant = '';
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsComp: IDropdownSettings = {};
  dropdownListComp = [];

  selectedItems: number = 0;
  selectedItemsComp: {
    id: number;
    nome: string;
  }[] = [];

  constructor(private service: VagasService, private router: Router) {
    const token = localStorage.getItem('token') ?? '';
    if (token) {
      this.dadosForm = new FormGroup({
        titulo: new FormControl('', [Validators.required]),
        salario_max: new FormControl(0, [Validators.required]),
        salario_min: new FormControl(0, [Validators.required]),
        experiencia: new FormControl(0, [Validators.required]),
        ramo_id: new FormControl([], [Validators.required]),
        ativo: new FormControl(0, [Validators.required]),
        competencias: new FormControl([]),
        descricao: new FormControl(0, [Validators.required]),
      });
      this.dropdownSettingsComp = {
        singleSelection: false,
        idField: 'id',
        textField: 'nome',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: true
      };
      this.dropdownSettings = {
        singleSelection: true,
        idField: 'id',
        textField: 'nome',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        allowSearchFilter: true
      };

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

      this.service.getRamos().subscribe({
        next: (resp) => {
          console.log(resp)
          this.dropdownList = resp;
        },
        error: (error) => {
          console.log(error)
          if (error?.error.mensagem) {
            console.log(error);
            // this.error_message = error?.error.mensagem
            // this.error_login = false;
          };
        },
      });

      this.service.getCompetencias().subscribe({
        next: (resp) => {
          console.log(resp)
          this.dropdownListComp = resp;
        },
        error: (error) => {
          console.log(error)
          if (error?.error.mensagem) {
            // this.error_message = error?.error.mensagem
            // this.error_login = false;
          };
        },
      });

    }
  }
  viewDetails(id: number): void {
    this.router.navigate(['/vaga', id]);
  }

  cadastrarVaga(): void {
    if (this.dadosForm.valid) {
      this.service
        .pushVaga({
          titulo: this.dadosForm.value.titulo,
          salario_max: Number(this.dadosForm.value.salario_max),
          salario_min: Number(this.dadosForm.value.salario_min),
          experiencia: Number(this.dadosForm.value.experiencia),
          ramo_id: this.selectedItems,
          ativo: ((this.dadosForm.value.ativo == 1) ? true : false),
          competencias: this.selectedItemsComp,
          descricao: this.dadosForm.value.descricao,
        })
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
  onItemSelectSingle(event: any) {
    console.log(event)
    this.selectedItems = event.id;
  }

  onItemSelect(event: any) {
    this.selectedItemsComp.push(event);
  }
  onItemDeselect(event: any) {
    this.selectedItemsComp = this.selectedItemsComp.filter(item => item?.id !== event?.id)
  }
  onSelectAll(event: any) {
    this.selectedItemsComp = [];
    this.selectedItemsComp.push(event);
  }
  onDeSelectAll(event: any) {
    this.selectedItemsComp = [];
  }
}