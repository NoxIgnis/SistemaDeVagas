import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user, mensagem} from '../../interfaces/user.interface';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VagasService {

  private _getVagaEndpoint = `${environment.apiUrl}/vagas`;
  constructor(private http: HttpClient) {}

  GetVagas(): Observable<any[]> {
    const token = localStorage.getItem('token') ?? '';
    console.log('test',this._getVagaEndpoint);
    return this.http.get<any[]>(this._getVagaEndpoint,{
      headers:{Authorization: 'Bearer ' + token} 
    });
  }

  pushVaga(data:any): Observable<any[]> {
    const token = localStorage.getItem('token') ?? '';
    data.ativo = true;
    data.ramo_id = 3;
    data.competencias = [];

    console.log('test',this._getVagaEndpoint);
    return this.http.post<any[]>(this._getVagaEndpoint,data,{
      headers:{Authorization: 'Bearer ' + token} 
    });
  }

  sendEdit(data: any): Observable<mensagem> {
    // const data = { email, nome, experiencia ,competencias, ramo, descricao};
    console.log(data)
    const token = localStorage.getItem('token')?? '';
    return this.http.post<mensagem>(this._getVagaEndpoint, data, {
      headers:{Authorization: 'Bearer ' + token} 
    });
  }
}
