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
  templateUrl: './vaga.component.html',
  styleUrl: './vaga.component.scss'
})
export class VagaComponent {
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
        id: new FormControl('', [Validators.required]),
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
        .sendEdit({
          titulo: this.dadosForm.value.titulo,
          salario_max: Number(this.dadosForm.value.salario_max),
          salario_min: Number(this.dadosForm.value.salario_min),
          experiencia: this.dadosForm.value.experiencia,
          ramo_id: this.selectedItems,
          ativo: ((this.dadosForm.value.ativo == 1) ? true : false),
          competencias: this.selectedItemsComp,
          descricao: this.dadosForm.value.descricao,
        }, id)
        .subscribe({
          next: (resp) => {
            console.log(resp)
            this.router.navigate(['/vaga/' + id]);
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
