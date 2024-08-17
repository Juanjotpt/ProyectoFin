import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { UsuarioModel } from '../../compartido/usuario/usuario.model';
import { UsuarioService } from '../../compartido/usuario/usuario.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
})
export class ListarUsuariosComponent implements OnInit {
  usuarios: UsuarioModel[] = [];

  mostrarModal: boolean = false;
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.obtenerUsuarios().subscribe((result) => {
      this.usuarios = result;
    });
  }
  borrarUsuario(id: number): void {
    this.usuarioService.borrarUsuario(id).subscribe({
      next: (result) => {
        console.log(result);
        this.cargarUsuarios(); // Recargar la lista de usuarios después de eliminar
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 500) {
          // 409 Conflict, usado para relaciones referenciales
          this.abrirModal();
        } else {
          console.error('Error inesperado:', error.message);
        }
      },
    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
