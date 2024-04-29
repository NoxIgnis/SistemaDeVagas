import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../interfaces/login.interface';
// import { LoginResponse } from '../interfaces/login.interface'
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private _loginEndpoint = 'http://localhost:3000/login';
  constructor(private http: HttpClient) {}

  sendLogin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<LoginResponse> {
    const data = { email, password };
    return this.http.post<LoginResponse>(this._loginEndpoint, data);
  }
}
