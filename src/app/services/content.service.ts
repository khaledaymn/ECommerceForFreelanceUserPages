// src/app/services/admin-data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';
import { AdminData } from '../interfaces/content.interface';

@Injectable({
  providedIn: 'root',
})
export class contentService {
  private readonly apiUrl = `${environment.baseUrl}/AdminData`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('auth_token');
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
      }),
    };
  }

  /** جلب إعدادات الموقع */
  getAdminData(): Observable<AdminData> {
    return this.http.get<AdminData>(
      `${this.apiUrl}/GetAdminData`,
      this.getAuthHeaders()
    );
  }
}
