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

  downloadPdf(pdf: string, title: string){
    this.http.get(pdf, { responseType: 'blob' }).subscribe(blob => {
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = `${title}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  addBookToDowloadedList(
    book_id: number,
    user_id: number
  ): Observable<DownloadDto>{
    return this.http.post<DownloadDto>(`${this.apiUrl}/downloads`, {user_id: user_id, book_id: book_id});
  }

  selectBook(book_id: number): Observable<BookInfoDto>{
    return this.http.get<BookInfoDto>(`${this.apiUrl}/book/${book_id}`);
  }

  selectAuthorBooks(
    author_id: number,
    skip: number,
    limit: number
  ): Observable<BookInfoDto[]> {
    return this.http.get<BookInfoDto[]>(`${this.apiUrl}/book/author-books/${author_id}?skip=${skip}&limit=${limit}`);
  }

  selectAuthorBooksCount(author_id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/book/author-books/count/${author_id}`);
  }
}
