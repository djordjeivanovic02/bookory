import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookInfoDto } from '../../dtos/book-info.dto';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadNewestBooks(): Observable<BookInfoDto[]> {
    return this.http.get<BookInfoDto[]>(`${this.apiUrl}/book/newest`);
  }
}
