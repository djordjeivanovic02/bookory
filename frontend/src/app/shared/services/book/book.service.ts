import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookInfoDto } from '../../dtos/book-info.dto';
import { SavedDto } from '../../dtos/saved.dto';
import { DownloadDto } from '../../dtos/downloaded-book.dto';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadNewestBooks(): Observable<BookInfoDto[]> {
    return this.http.get<BookInfoDto[]>(`${this.apiUrl}/book/newest`);
  }

  saveBook(user_id: number, book_id: number): Observable<SavedDto> {
    return this.http.post<SavedDto>(`${this.apiUrl}/saved`, {user_id: user_id, book_id: book_id});
  }

  removeSavedBook(user_id: number, book_id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/saved/by-user-book/${user_id}/${book_id}`);
  }

  loadSavedBook(
    user_id: number,
    skip: number,
    limit: number
  ): Observable<SavedDto[]> {
    return this.http.get<SavedDto[]>(`${this.apiUrl}/saved/user-saves/${user_id}?skip=${skip}&limit=${limit}`);
  }

  loadDownloadedBooks(
    user_id: number,
    skip: number,
    limit: number
  ):Observable<DownloadDto[]>{
    return this.http.get<DownloadDto[]>(`${this.apiUrl}/downloads/user-downloads/${user_id}?skip=${skip}&limit=${limit}`);
  }
}
