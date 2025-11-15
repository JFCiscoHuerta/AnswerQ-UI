import { I } from '@angular/cdk/keycodes';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseUserDto } from '../models/response-user-dto';
import { Observable } from 'rxjs';
import { EmailUpdateDto } from '../models/email-update-dto';
import { PasswordUpdateDto } from '../models/password-update-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basePath = 'http://localhost:8081';

  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private httpClient: HttpClient) {}

  public userDetails(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.basePath}/v1/users/user-details/${id}`, {headers: this.headers});
  }

  public changeEmail(id: number, body: EmailUpdateDto): Observable<any> {
    return this.httpClient.put<any>(`${this.basePath}/v1/users/change-email/${id}`, body, {headers: this.headers});
  }

   public changePassword(id: number, body: PasswordUpdateDto): Observable<any> {
    return this.httpClient.put<any>(`${this.basePath}/v1/users/change-password/${id}`, body, {headers: this.headers});
   }

}
