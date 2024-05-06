import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { logoutResponse } from '../../interfaces/logout.interface';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  private _logoutEndpoint = `${environment.apiUrl}/logout`;
  constructor(private http: HttpClient) {}

  sendLogout(): Observable<logoutResponse> {
    
    const token = localStorage.getItem('token') ?? '';
    return this.http.post<logoutResponse>(this._logoutEndpoint, '',{
      headers:{Authorization: 'Bearer ' + token} 
    });
  }
}
