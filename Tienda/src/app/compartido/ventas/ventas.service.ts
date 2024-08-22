import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaModel } from './ventas.model';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  obtenerVentas() {
    return this.http.get<VentaModel[]>(`${this.BASE_URL}/ventas`);
  }

  obtenerVentaPorId(id: number) {
    return this.http.get<VentaModel>(`${this.BASE_URL}/ventas/${id}`);
  }

  agregarVenta(venta: VentaModel) {
    return this.http.post<string>(`${this.BASE_URL}/ventas/agregar`, venta);
  }

  actualizarVenta(venta: VentaModel) {
    return this.http.put<string>(
      `${this.BASE_URL}/ventas/actualizar/${venta.id_venta}`,
      venta
    );
  }

  borrarVenta(id: number) {
    return this.http.delete<number>(`${this.BASE_URL}/ventas/borrar/${id}`);
  }
}
