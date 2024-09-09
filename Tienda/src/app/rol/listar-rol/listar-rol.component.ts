import { Component, OnInit } from '@angular/core';
import { RolModel } from '../../compartido/rol/rol.model';
import { RolService } from '../../compartido/rol/rol.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-listar-rol',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.css'],
})
export class ListarRolComponent implements OnInit {
  roles: RolModel[] = [];

  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.cargarRoles();
  }

  // Cargar todos los roles
  cargarRoles(): void {
    this.rolService.obtenerRoles().subscribe((result) => {
      this.roles = result;
    });
  }

  // Borrar un rol por su ID
  borrarRol(id: number): void {
    this.rolService.borrarRol(id).subscribe({
      next: (result) => {
        console.log(result);
        this.cargarRoles(); // Recargar la lista de roles después de borrar
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error inesperado:', error.message);
      },
    });
  }

  // Cambiar el estado del rol (admin <-> cliente)
  cambiarRol(id: number): void {
    this.rolService.cambiarEstadoRol(id).subscribe({
      next: (result) => {
        console.log(result);
        this.cargarRoles(); // Recargar la lista de roles después de cambiar el tipo
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al cambiar el rol:', error.message);
      },
    });
  }
}
