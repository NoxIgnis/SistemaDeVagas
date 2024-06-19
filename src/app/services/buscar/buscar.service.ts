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
  private _getCandidatos = `${environment.apiUrl}/usuarios/candidatos`;

  constructor(private http: HttpClient) { }

  getUser(): Observable<user> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<user>(`${this._getCandidatos}/buscar`, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }

  getUserFiltrado(data?: {
    nome?: string,
    competencias?: { id: number }[],
    experiencia?: number,
  }): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    console.log(data);
    return this.http.post<any>(`${this._getCandidatos}/buscar`, data, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }

  getCompetencias(): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<any>(this._getCompEndpoint, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }

  sendMensagem(data: { candidato: string, mensagem: string }): Observable<any> {
    console.log(data)
    const token = localStorage.getItem('token') ?? '';
    return this.http.post<any>(`${this._getCandidatos}/mensagem`, data, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }
}
