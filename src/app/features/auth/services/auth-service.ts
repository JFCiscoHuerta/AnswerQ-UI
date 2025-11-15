import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { RegisterUserDto } from '../models/register-user-dto';
import { LoginUserDto } from '../models/login-user-dto';
import { RegisterUserResponse } from '../models/register-user-response';
import { VerifyUserDto } from '../models/verifty-user-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected basePath = 'http://localhost:8081';

  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) {}

  public login(body: LoginUserDto): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.basePath}/auth/login`, body, {headers: this.headers});
  }

  public register(body: RegisterUserDto): Observable<RegisterUserResponse> {
    return this.httpClient.post<RegisterUserResponse>(`${this.basePath}/auth/signup`, body, {headers: this.headers});
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public verify(body: VerifyUserDto): Observable<any> {
    return this.httpClient.post(`${this.basePath}/auth/verify`, body, { headers: this.headers });
  }

  public resend(email: string): Observable<any> {
    return this.httpClient.post(`${this.basePath}/auth/resend?email=${email}`, {}, { headers: this.headers });
  }

  public getUserId(): number{
    const token = localStorage.getItem('token');

    if (!token || token.trim() === '') {
      throw new Error('Token not found');
    }

    const payload = this.decodeToken(token);

    if(!payload.id) {
      throw new Error('Token payload does not contain id');
    }

    return payload.id;
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (!token) return false;

    const payload = this.decodeToken(token);
    if (!payload) return false;

    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) return false;

    return true;
  }

  private decodeToken(token: string): any | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      let base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');

      while (base64.length % 4 !== 0) {
        base64 += '=';
      }

      const json = atob(base64);
      return JSON.parse(json);
    } catch (e) {
      return null;
    }
  }

}
