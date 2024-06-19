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
import { IDropdownSettings, MultiSelectComponent, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-vaga',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, ButtonComponent, NgMultiSelectDropDownModule],
  templateUrl: './candidato-vaga.component.html',
  styleUrl: './candidato-vaga.component.scss'
})
export class CandidatoVagaComponent {
  dadosForm!: FormGroup;
  dropdownList = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsComp: IDropdownSettings = {};
  dropdownListComp = [];

  selectedItems: number = 0;
  selectedItemsComp: {
    id: number;
    nome: string;
  }[] = [];

  constructor(private service: VagaService, private router: Router) {
    const token = localStorage.getItem('token') ?? '';
    const id = this.router.url.split('/')[2];
    console.log(this.router.url);
    if (token) {
      this.dadosForm = new FormGroup({
        titulo: new FormControl('', [Validators.required]),
        salario_max: new FormControl(0, [Validators.required]),
        salario_min: new FormControl(0, [Validators.required]),
        experiencia: new FormControl(0, [Validators.required]),
        ramo_id: new FormControl([], [Validators.required]),
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
      this.service.getCompetencias().subscribe({
        next: (resp) => {
          console.log(resp)
          this.dropdownListComp = resp;
        },
        error: (error) => {
          console.log(error)
          if (error?.error.mensagem) {
            console.log(error);
          };
        },
      });
      this.service.getRamos().subscribe({
        next: (resp) => {
          console.log(resp)
          this.dropdownList = resp;
        },
        error: (error) => {
          console.log(error)
          if (error?.error.mensagem) {
            console.log(error);
          };
        },
      });
      this.service.GetVaga(id).subscribe({
        next: (resp) => {
          console.log(resp)
          this.dadosForm.patchValue(resp);
          if (resp?.competencias) {
            resp?.competencias?.forEach((comp: any) => {
              this.selectedItemsComp.push(comp);
            })
          }
          if (resp?.ramo_id) {
            this.selectedItems = resp?.ramo_id
            this.dadosForm.patchValue({
              ramo_id: this.dropdownList.filter((f: any) => f.id == resp?.ramo_id)
            });
          }
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
}