import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user, mensagem} from '../../interfaces/user.interface';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VagaService {

  private _getVagaEndpoint = `${environment.apiUrl}/vagas`;
  constructor(private http: HttpClient) {}

  GetVaga(id:string): Observable<any[]> {
    const token = localStorage.getItem('token') ?? '';
    console.log('test',this._getVagaEndpoint);
    return this.http.get<any[]>(this._getVagaEndpoint+'/'+id,{
      headers:{Authorization: 'Bearer ' + token} 
    });
  }

  deleteVaga(id:string): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.delete<any>(this._getVagaEndpoint+'/'+id,{
      headers:{Authorization: 'Bearer ' + token} 
    });
  }

  sendEdit(data: any, id:string): Observable<mensagem> {
    data.ativo = true;
    data.ramo_id = 3;
    data.competencias = [];
    // const data = { email, nome, experiencia ,competencias, ramo, descricao};
    console.log(data)
    const token = localStorage.getItem('token')?? '';
    return this.http.put<mensagem>(this._getVagaEndpoint+'/'+id, data, {
      headers:{Authorization: 'Bearer ' + token} 
    });
  }
}
