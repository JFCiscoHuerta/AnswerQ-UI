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

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public verify(body: VerifyUserDto): Observable<any> {
    return this.httpClient.post(`${this.basePath}/auth/verify`, body, { headers: this.headers });
  }

  public resend(email: string): Observable<any> {
    return this.httpClient.post(`${this.basePath}/auth/resend?email=${email}`, {}, { headers: this.headers });
  }

  getUserId(): number{
    const token = localStorage.getItem('token');

    if (!token || token.trim() === '') {
      throw new Error('Token not found');
    }

    const base64Url = token.split('.')[1];
    if(!base64Url) {
      throw new Error('Invalid token structure');
    }

    const base64 = base64Url.replace('/-/g', '+');

    let payload: any;

    try {
      payload = JSON.parse(atob(base64));
    } catch (e) {
      throw new Error('Invalid token encoding');
    }

    if(!payload.id) {
      throw new Error('Token payload does not contain id');
    }

    return payload.id;
  }

}
