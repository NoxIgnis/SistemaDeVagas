import { Component, signal } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { BuscarService } from '../../services/buscar/buscar.service';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import md5 from 'blueimp-md5';
import { IDropdownSettings, MultiSelectComponent, NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@Component({
    selector: 'app-buscar',
    standalone: true,
    imports: [HeaderComponent, ReactiveFormsModule, ButtonComponent, NgMultiSelectDropDownModule],
    templateUrl: './buscar.component.html',
    styleUrl: './buscar.component.scss'
})
export class BuscarComponent {
    dadosForm!: FormGroup;
    tipo = signal(false);
    emailPassword = true;
    validateNome = true;
    variant = '';
    error_login = true;
    error_message: string = '';
    dropdownList = [];
    selectedItems: {
        id: number;
    }[] = [];
    dropdownSettings: IDropdownSettings = {};
    candidato = false;
    candidatos_mensagens: {
        candidatos: string[]
    } = { candidatos: [] };

    candidatos: any;
    constructor(private service: BuscarService, private router: Router) {
        const token = localStorage.getItem('token') ?? ''
        this.dadosForm = new FormGroup({
            nome: new FormControl(''),
            experiencia: new FormControl(0),
            competencias: new FormControl([]),
        });

        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'nome',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            allowSearchFilter: true
        };

        if (token) {
            this.service.getUser().subscribe({
                next: (resp: any) => {
                    console.log(resp)
                    this.candidatos = resp?.candidatos;
                },
                error: (error: any) => {
                    console.log(error)
                    if (error?.error.mensagem) {
                        this.error_message = error?.error.mensagem
                        this.error_login = false;
                    };
                },
            });
            if (!this.candidato) {
                this.service.getCompetencias().subscribe({
                    next: (resp: any) => {
                        console.log(resp)
                        this.dropdownList = resp;
                    },
                    error: (error: any) => {
                        console.log(error)
                        if (error?.error.mensagem) {
                            this.error_message = error?.error.mensagem
                            this.error_login = false;
                        };
                    },
                });
            }
        }
    }
    onSubmit() {
        this.service
            .getUserFiltrado({
                nome: this.dadosForm.value.nome != '' ? this.dadosForm.value.nome : undefined,
                competencias: this.selectedItems.length != 0 ? this.selectedItems : undefined,
                experiencia: Number(this.dadosForm.value.experiencia) != 0 ? Number(this.dadosForm.value.experiencia) : undefined,
            })
            .subscribe({
                next: (resp) => {
                    console.log(resp)
                    this.candidatos = resp?.candidatos;
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
    }
    onItemSelect(event: any) {
        this.selectedItems.push({ id: event.id });
    }
    onItemDeselect(event: any) {
        this.selectedItems = this.selectedItems.filter(item => item?.id !== event?.id)
        console.log(this.selectedItems)

    }
    onSelectAll(event: any) {
        this.selectedItems = [];
        event.forEach((ev: any) => {
            this.selectedItems.push({ id: ev.id });
        })
    }
    onDeSelectAll(event: any) {
        this.selectedItems = [];
    }
    SendMensage() {
        this.service
            .sendMensagem({ candidatos: this.candidatos_mensagens.candidatos })
            .subscribe({
                next: (resp) => {
                    console.log(resp)
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
    onCheckboxChange(candidato: any, event: any) {
        console.log(candidato);
        console.log(event.target.checked);
        if (event.target.checked) {
            this.candidatos_mensagens.candidatos.push(candidato.email)
        } else {
            this.candidatos_mensagens.candidatos = this.candidatos_mensagens.candidatos.filter((can) => can != (candidato.email))
        }
    }
}
