import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { VentaModel } from '../../compartido/ventas/ventas.model';
import { VentasService } from '../../compartido/ventas/ventas.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listar-ventas',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './listar-ventas.component.html',
  styleUrls: ['./listar-ventas.component.css'],
})
export class ListarVentasComponent implements OnInit {
  ventas: VentaModel[] = [];


  constructor(private ventasService: VentasService) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(): void {
    this.ventasService.obtenerVentas().subscribe((result) => {
      this.ventas = result;
    });
  }

  borrarVenta(id: number): void {
    this.ventasService.borrarVenta(id).subscribe({
      next: (result) => {
        console.log(result);
        this.cargarVentas();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 500) {
        
          console.error('Error inesperado:', error.message);
        }
      },
    });
  }


}
