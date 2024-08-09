import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorDataDto } from '../../dtos/author-data.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadData(id: number): Observable<AuthorDataDto>{
    return this.http.get<AuthorDataDto>(`${this.apiUrl}/author/findById/${id}`);
  }
}
