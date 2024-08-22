import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { RolModel } from '../../compartido/rol/rol.model';
import { RolService } from '../../compartido/rol/rol.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listar-rol',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './listar-rol.component.html',
  styleUrls: ['./listar-rol.component.css'],
})
export class ListarRolComponent implements OnInit {
  roles: RolModel[] = [];


  constructor(private rolService: RolService) {}

  ngOnInit(): void {
    this.cargarRoles();
  }

  cargarRoles(): void {
    this.rolService.obtenerRoles().subscribe((result) => {
      this.roles = result;
    });
  }

  borrarRol(id: number): void {
    this.rolService.borrarRol(id).subscribe({
      next: (result) => {
        console.log(result);
        this.cargarRoles(); 
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 500) {
        } 
          console.error('Error inesperado:', error.message);
      },
    });
  }

 
}
