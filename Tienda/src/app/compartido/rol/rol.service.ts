import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolModel } from './rol.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RolService {

  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los roles
  obtenerRoles(): Observable<RolModel[]> {
    return this.http.get<RolModel[]>(`${this.BASE_URL}/roles`);
  }

  // Método para obtener un rol por su ID
  obtenerRolId(id: number): Observable<RolModel> {
    return this.http.get<RolModel>(`${this.BASE_URL}/roles/${id}`);
  }

  // Método para agregar un nuevo rol
  agregarRol(rol: RolModel): Observable<string> {
    return this.http.post<string>(`${this.BASE_URL}/roles/agregar`, rol);
  }

  // Método para borrar un rol por su ID
  borrarRol(id: number): Observable<number> {
    return this.http.delete<number>(`${this.BASE_URL}/roles/borrar/${id}`);
  }

  // Método para cambiar el tipo de rol (admin a cliente o viceversa)
  cambiarEstadoRol(id: number): Observable<string> {
    return this.http.put<string>(`${this.BASE_URL}/roles/cambiar/${id}`, {});
  }
}
