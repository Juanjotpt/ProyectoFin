import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolModel } from './rol.model';

@Injectable({
  providedIn: 'root',
})
export class RolService {

  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los roles
  obtenerRoles() {
    return this.http.get<RolModel[]>(this.BASE_URL + '/roles');
  }

  // Método para obtener un rol por su ID
  obtenerRolId(id: number) {
    return this.http.get<RolModel[]>(this.BASE_URL + `/roles/${id}`);
  }

  // Método para agregar un nuevo rol
  agregarRol(rol: RolModel) {
    return this.http.post<string>(`${this.BASE_URL}/roles/agregar`, rol);
  }

  // Método para actualizar un rol existente
  actualizarRol(rol: RolModel) {
    return this.http.put<string>(
      `${this.BASE_URL}/roles/actualizar/${rol.id_rol}`,
      rol
    );
  }

  // Método para borrar un rol por su ID
  borrarRol(id: number) {
    return this.http.delete<number>(`${this.BASE_URL}/roles/borrar/${id}`);
  }
}
