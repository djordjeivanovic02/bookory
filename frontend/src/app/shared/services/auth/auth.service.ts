import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../dtos/login-response.dto'
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {username, password});
  }

  register(name: string, surname: string, email: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/register`, { name, surname, email, password });
  }

  decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Invalid token format', error);
      return null;
    }
  }

  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) {
      return true;
    }
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);
    return expirationDate < new Date();
  }

  isValidToken(token: string): boolean {
    return !this.isTokenExpired(token);
  }

  getUserFromToken(token: string): any {
    try {
      const decodedToken: any = jwtDecode(token);
      return {
        id: decodedToken.id,
        email: decodedToken.email,
        name: decodedToken.name,
        surname: decodedToken.surname,
        about: decodedToken.about
      };
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }
}
