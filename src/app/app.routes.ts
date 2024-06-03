import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UsuarioComponent } from './views/usuario/usuario.component';
import { CadastroComponent } from './views/cadastro/cadastro/cadastro.component';

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
];
