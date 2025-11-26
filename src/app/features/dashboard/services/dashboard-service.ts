import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth-service';
import { Observable } from 'rxjs';
import { PageResponse } from '../../../shared/models/page-response';
import { Form } from '../models/form';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  protected basePath = 'http://localhost:8081';
  public headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private authService = inject(AuthService);

  constructor(private httpClient: HttpClient) {}

  public getForms(page: number, size: number): Observable<PageResponse<Form>> {
    const userId = this.authService.getUserId();
    const params = {page, size}
    return this.httpClient.get<PageResponse<Form>>(`${this.basePath}/user/${userId}`, { params });
  }

}
