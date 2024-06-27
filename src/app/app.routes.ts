import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { CadastroComponent } from './views/cadastro/cadastro/cadastro.component';
import { VagasComponent } from './views/vagas/vagas.component';
import { VagaComponent } from './views/vaga/vaga.component';
import { ListaVagasComponent } from './views/lista-vagas/lista-vagas.component';
import { CandidatoVagaComponent } from './views/candidato-vaga/candidato-vaga.component'
import { BuscarComponent } from './views/buscar/buscar.component';
import { MensagemComponent } from './views/mensagem/mensagem.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: 'empresa/vagas',
    component: VagasComponent,
  },
  {
    path: 'vaga/:id',
    component: VagaComponent,
  },
  {
    path: 'vagas',
    component: ListaVagasComponent,
  },
  {
    path: 'candidato/vaga/:id',
    component: CandidatoVagaComponent,
  },
  {
    path: 'buscar/candidato',
    component: BuscarComponent,
  },
  {
    path: 'mensagens',
    component: MensagemComponent,
  },
];