import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CadResponse } from '../../interfaces/cadastro.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {
  private _candidatoEndpoint = `${environment.apiUrl}/usuarios/candidato`;
  private _empresaEndpoint = `${environment.apiUrl}/usuarios/empresa`;
  constructor(private http: HttpClient) {}

  sendCad({
    email,
    nome,
    senha,
    tipo,
    ramo,
    descricao
  }: {
    email: string;
    nome: string;
    senha: string;
    tipo: string;
    ramo?: string;
    descricao?: string;
  }): Observable<CadResponse> {
    const data = { email, senha, nome, ramo, descricao};
    return this.http.post<CadResponse>(tipo == '1'? this._empresaEndpoint : this._candidatoEndpoint, data);
  }
}
