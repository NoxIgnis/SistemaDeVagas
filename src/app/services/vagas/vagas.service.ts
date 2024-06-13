import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user, mensagem } from '../../interfaces/user.interface';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VagasService {

  private _getVagaEndpoint = `${environment.apiUrl}/vagas`;
  private _getRamosEndpoint = `${environment.apiUrl}/ramos`;
  private _getCompEndpoint = `${environment.apiUrl}/competencias`;

  constructor(private http: HttpClient) { }

  getRamos(): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<any>(this._getRamosEndpoint, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }


  getCompetencias(): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<any>(this._getCompEndpoint, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }


  GetVagas(): Observable<any[]> {
    const token = localStorage.getItem('token') ?? '';
    console.log('test', this._getVagaEndpoint);
    return this.http.get<any[]>(this._getVagaEndpoint, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }

  pushVaga(data: {
    titulo: string;
    salario_max: number;
    salario_min: number;
    experiencia: number;
    ramo_id: number;
    ativo: boolean;
    descricao: string;
    competencias?: {
      id: number;
      nome: string;
    }[];
  }): Observable<any[]> {
    console.log(data)
    const token = localStorage.getItem('token') ?? '';
    console.log('test', this._getVagaEndpoint);
    return this.http.post<any[]>(this._getVagaEndpoint, data, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }

  sendEdit(data: any): Observable<mensagem> {
    // const data = { email, nome, experiencia ,competencias, ramo, descricao};
    console.log(data)
    const token = localStorage.getItem('token') ?? '';
    return this.http.post<mensagem>(this._getVagaEndpoint, data, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }
}
