import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { RegisterUserDto } from '../models/register-user-dto';
import { Observable } from 'rxjs';
import { LoginUserDto } from '../models/login-user-dto';
import { LoginResponse } from '../models/login-response';
import { RegisterUserResponse } from '../models/register-user-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected basePath = 'http://localhost:8081';

  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) {}

  public login(body: LoginUserDto): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.basePath}/auth/login`, body, {headers: this.headers});
  }

  public register(body: RegisterUserDto): Observable<RegisterUserResponse> {
    return this,this.httpClient.post<RegisterUserResponse>(`${this.basePath}/auth/signup`, body, {headers: this.headers});
  }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
