import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user, mensagem } from '../../interfaces/user.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  private _getCompEndpoint = `${environment.apiUrl}/competencias`;
  private _getCandidatos = `${environment.apiUrl}/usuarios/candidatos/buscar`;

  constructor(private http: HttpClient) { }

  getUser(): Observable<user> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<user>(this._getCandidatos, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }

  getUserFiltrado(data?: {
    nome?: string,
    competencias?: { id: number }[],
    experiencia?: number,
  }): Observable<user> {
    const token = localStorage.getItem('token') ?? '';
    // const data = {
    //   nome: nome,
    //   competencias: competencias ?? [],
    //   experiencia: experiencia,
    // }
    console.log(data);
    return this.http.post<user>(this._getCandidatos, data, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }

  getCompetencias(): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<any>(this._getCompEndpoint, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }

  // sendEdit({
  //   email,
  //   nome,
  //   experiencia,
  //   competencias,
  //   ramo,
  //   descricao
  // }: {
  //   email: string;
  //   nome: string;
  //   competencias?: {
  //     id: number;
  //     nome: string;
  //   }[];
  //   experiencia?: {
  //     id: number;
  //     nome_empresa: string;
  //     inicio: string;
  //     fim: string;
  //     cargo: string;
  //   }[];
  //   ramo?: string;
  //   descricao?: string;
  // }): Observable<mensagem> {
  //   const data = { email, nome, experiencia, competencias, ramo, descricao };
  //   console.log(data)
  //   const token = localStorage.getItem('token') ?? '';
  //   return this.http.put<mensagem>(this._getUserEndpoint, data, {
  //     headers: { Authorization: 'Bearer ' + token }
  //   });
  // }
}
