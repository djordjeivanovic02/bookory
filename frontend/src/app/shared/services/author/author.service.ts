import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorDataDto } from '../../dtos/author-data.dto';
import { BestAuthorsDto } from '../../dtos/best-authors.dto'
import { UpdateAuthorDataDto } from '../../dtos/update-author-data.dto';

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

  loadAllAuthors(): Observable<AuthorDataDto[]>{
    return this.http.get<AuthorDataDto[]>(`${this.apiUrl}/author`);
  }

  updateAuthorData(author_id: number, author_data: FormData) {
    return this.http.put(`${this.apiUrl}/author/${author_id}`, author_data);
  }
}
