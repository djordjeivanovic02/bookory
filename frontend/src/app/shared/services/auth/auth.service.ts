import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../dtos/login-response.dto'
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { registerResponse } from '../../dtos/register-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, {username, password});
  }

  registerUser(email: string, password: string): Observable<registerResponse> {
    return this.http.post<registerResponse>(`${this.apiUrl}/auth/registerUser`, { email, password });
  }

  registerAuthor(name: string, surname: string, email: string, password: string, website?: string): Observable<registerResponse> {
    return this.http.post<registerResponse>(`${this.apiUrl}/auth/registerAuthor`, { firstName: name, lastName: surname, email: email, password: password, website: website });
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
      console.log(decodedToken);
      return {
        id: decodedToken.id,
        email: decodedToken.email
      };
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  }

  changePassword(
    user_id: number, 
    oldPassword: string, 
    newPassword: string
  ): Observable<{message: string}>{
    return this.http.put<{message: string}>(`${this.apiUrl}/auth/changePassword/${user_id}`, {oldPassword: oldPassword, newPassword: newPassword});
  }
}
