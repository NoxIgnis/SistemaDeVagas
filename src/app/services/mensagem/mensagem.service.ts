import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user, mensagem } from '../../interfaces/user.interface';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MensagemService {
  private _getMensagem = `${environment.apiUrl}/mensagem`;

  constructor(private http: HttpClient) { }

  getMensagem(): Observable<any> {
    const token = localStorage.getItem('token') ?? '';
    return this.http.get<any>(`${this._getMensagem}`, {
      headers: { Authorization: 'Bearer ' + token }
    });
  }
}
