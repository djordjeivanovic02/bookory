import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorDataDto } from '../../dtos/author-data.dto';
import { UserDataDto } from '../../dtos/user-data.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadData(id: number): Observable<UserDataDto>{
    return this.http.get<UserDataDto>(`${this.apiUrl}/user/${id}`);
  }
}
