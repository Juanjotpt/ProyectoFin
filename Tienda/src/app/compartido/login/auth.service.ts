import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  // Método para el login
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, redirectTo: string }>(`${this.BASE_URL}/login`, { email, password })
      .pipe(
        map(response => {
          // Almacenar el token en el localStorage
          localStorage.setItem('authToken', response.token);
          return response;
        })
      );
  }

  // Verificar si el usuario está autenticado (si el token existe)
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  // Obtener la información del usuario desde el token JWT
  getUserInfo() {
    const token = localStorage.getItem('authToken');
    if (token) {
      return this.decodeToken(token);
    }
    return null;
  }

  // Decodificación simple del token JWT
  decodeToken(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  // Logout para eliminar el token
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
