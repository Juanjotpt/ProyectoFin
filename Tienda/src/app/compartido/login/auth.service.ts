import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = 'http://localhost:3000'; // URL base del backend

  constructor(private http: HttpClient) {}

  // Método para registrar un nuevo usuario
  registro(nombre: string, email: string, password: string, apellidos: string, direccion: string, dni: string): Observable<any> {
    const body = { nombre, email, password, apellidos, direccion, dni };
    return this.http.post<any>(`${this.BASE_URL}/registro`, body);
  }

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ token: string, redirectTo: string }>(`${this.BASE_URL}/login`, { email, password })
      .pipe(
        map(response => {
          // Almacena el token en el almacenamiento local
          localStorage.setItem('authToken', response.token);
          return response;
        })
      );
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
