import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorDataDto } from '../../dtos/author-data.dto';
import { BestAuthorsDto } from '../../dtos/best-authors.dto'

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadData(id: number): Observable<AuthorDataDto>{
    return this.http.get<AuthorDataDto>(`${this.apiUrl}/author/findById/${id}`);
  }

  loadBestAuthors(): Observable<BestAuthorsDto[]> {
    return this.http.get<BestAuthorsDto[]>(`${this.apiUrl}/author/most-famous`);
  }
}
