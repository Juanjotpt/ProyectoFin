import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { UsuarioModel } from '../compartido/usuario.model';
import { UsuarioService } from '../compartido/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'] 
})
export class ListarUsuariosComponent implements OnInit {

  usuarios: UsuarioModel[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe(result => {
      this.usuarios = result;
    });
  }

  borrarUsuario(id: number): void {
    this.usuarioService.borrarUsuario(id).subscribe(result => {
      console.log(result);
      this.cargarUsuarios(); // Recargar la lista de usuarios después de eliminar
    });
  }
}
