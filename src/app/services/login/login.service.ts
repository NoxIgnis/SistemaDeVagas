import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../interfaces/login.interface';
import { environment } from '../../environments/environment';
// import { LoginResponse } from '../interfaces/login.interface'
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _loginEndpoint = `${environment.apiUrl}/login`;
  constructor(private http: HttpClient) {}

  sendLogin({
    email,
    senha,
  }: {
    email: string;
    senha: string;
  }): Observable<LoginResponse> {
    const data = { email, senha };
    console.log(data);
    return this.http.post<LoginResponse>(this._loginEndpoint, data);
  }
}
