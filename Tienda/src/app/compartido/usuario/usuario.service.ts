import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UsuarioModel } from './usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  
  BASE_URL = 'http://localhost:3000';

  // Constructor que inyecta HttpClient para realizar solicitudes HTTP
  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  obtenerUsuarios() {
    // Realiza una solicitud GET para obtener un arreglo de usuarios
    return this.http.get<UsuarioModel[]>(this.BASE_URL + '/usuarios');
  }


  obtenerUsuarioId(id: number) {
    // Realiza una solicitud GET para obtener un usuario específico por su ID
    return this.http.get<UsuarioModel[]>(this.BASE_URL + `/usuarios/${id}`);
  }


  agregarUsuario(usuario: UsuarioModel) {
    // Realiza una solicitud POST para agregar un nuevo usuario, el endpoint espera el usuario en el cuerpo de la solicitud
    return this.http.post<string>(`${this.BASE_URL}/usuarios/agregar`, usuario);
  }


  actualizarUsuario(usuario: UsuarioModel) {
    // Realiza una solicitud PUT para actualizar un usuario existente, el endpoint espera el usuario en el cuerpo de la solicitud y el ID en la URL
    return this.http.put<string>(
      `${this.BASE_URL}/usuarios/actualizar/${usuario.id_usuario}`,
      usuario
    );
  }

  borrarUsuario(id: number) {
    // Realiza una solicitud DELETE para borrar un usuario específico por su ID
    return this.http.delete<number>(`${this.BASE_URL}/usuarios/borrar/${id}`);
  }
}
