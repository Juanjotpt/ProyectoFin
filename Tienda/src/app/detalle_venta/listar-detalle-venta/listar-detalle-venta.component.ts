import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { DetalleVentaModel } from '../../compartido/detalle_venta/detalle_venta.model';
import { DetalleVentaService } from '../../compartido/detalle_venta/detalle_venta.service';

@Component({
  selector: 'app-listar-detalles-ventas',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './listar-detalle-venta.component.html',
  styleUrls: ['./listar-detalle-venta.component.css'],
})
export class ListarDetallesVentasComponent implements OnInit {
  detallesVentas: DetalleVentaModel[] = [];

  mostrarModal: boolean = false;
  mensajeError: string = '';

  constructor(private detalleVentaService: DetalleVentaService) {}

  ngOnInit(): void {
    this.cargarDetallesVentas();
  }

  cargarDetallesVentas(): void {
    this.detalleVentaService.obtenerDetallesVentas().subscribe({
      next: (result) => {
        this.detallesVentas = result;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al cargar detalles de ventas:', error.message);
        this.mensajeError = 'Error al cargar detalles de ventas';
      },
    });
  }

  borrarDetalleVenta(id: number): void {
    this.detalleVentaService.borrarDetalleVenta(id).subscribe({
      next: (result) => {
        console.log(result);
        this.cargarDetallesVentas(); // Recargar la lista de detalles de ventas después de eliminar
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 500) {
          console.error('Error inesperado:', error.message);
        }
      },
    });
  }
}
