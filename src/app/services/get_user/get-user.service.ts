import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user, mensagem} from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  private _getCompEndpoint = 'http://localhost:3000/competencias';
  private _getUserEndpoint = 'http://localhost:3000/usuario';
  constructor(private http: HttpClient) {}

  getUser(): Observable<user> {
    const token = localStorage.getItem('token');
    return this.http.get<user>(this._getUserEndpoint,{
      headers:{Authorization: 'Bearer ' + token} 
    });
  }

  getCompetencias(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get<any>(this._getCompEndpoint,{
      headers:{Authorization: 'Bearer ' + token} 
    });
  }

  sendEdit({
    email,
    nome,
    experiencia,
    competencias,
  }: {
    email: string;
    nome: string;
    experiencia?: {
      id: number;
      nome: string;
    }[];
    competencias?: {
      id: number;
      nome_empresa: string;
      inicio: string;
      fim: string;
      cargo: string;
    }[]
  }): Observable<mensagem> {
    const data = { email, nome, experiencia ,competencias};
    const token = localStorage.getItem('token');
    return this.http.put<mensagem>(this._getUserEndpoint, data, {
      headers:{Authorization: 'Bearer ' + token} 
    });
  }
}
