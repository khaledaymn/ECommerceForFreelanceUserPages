import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ConfirmationStatusService {
  private readonly apiUrl =
    environment.baseUrl + '/ConfirmationStatus/GetAllConfirmationStatus';

  constructor(private http: HttpClient) {}

  // Returns Observable<string[]>
  getAllConfirmationStatuses(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
