import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { RegisterUserDto } from '../models/register-user-dto';
import { Observable } from 'rxjs';
import { LoginUserDto } from '../models/login-user-dto';
import { LoginResponse } from '../models/login-response';

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

}
