import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SavedService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadUserSaves(id: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/saved/all-user-saves/${id}`);
  }
}