import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DetalleVentaModel } from './detalle_venta.model';

@Injectable({
  providedIn: 'root',
})
export class DetalleVentaService {
  
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los detalles de ventas
  obtenerDetallesVentas() {
    return this.http.get<DetalleVentaModel[]>(`${this.BASE_URL}/detalle_venta`);
  }

  // Método para obtener un detalle de venta por su ID
  obtenerDetalleVentaId(id: number) {
    return this.http.get<DetalleVentaModel>(`${this.BASE_URL}/detalle_venta/${id}`);
  }

  // Método para agregar un nuevo detalle de venta
  agregarDetalleVenta(detalle: DetalleVentaModel) {
    return this.http.post<string>(`${this.BASE_URL}/detalle_venta/agregar`, detalle);
  }

  // Método para actualizar un detalle de venta existente
  actualizarDetalleVenta(detalle: DetalleVentaModel) {
    return this.http.put<string>(`${this.BASE_URL}/detalle_venta/actualizar/${detalle.id_detalle_venta}`, detalle);
  }

  // Método para borrar un detalle de venta por su ID
  borrarDetalleVenta(id: number) {
    return this.http.delete<string>(`${this.BASE_URL}/detalle_venta/borrar/${id}`);
  }
}
