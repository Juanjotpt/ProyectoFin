import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CarritoModel } from './carrito.model';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  
  BASE_URL = 'http://localhost:3000';

  // Constructor que inyecta HttpClient para realizar solicitudes HTTP
  constructor(private http: HttpClient) {}

  // Método para obtener todos los carritos
  obtenerCarritos() {
    // Realiza una solicitud GET para obtener un arreglo de carritos
    return this.http.get<CarritoModel[]>(`${this.BASE_URL}/carritos`);
  }

  // Método para obtener un carrito específico por su ID
  obtenerCarritoId(id: number) {
    // Realiza una solicitud GET para obtener un carrito específico por su ID
    return this.http.get<CarritoModel>(`${this.BASE_URL}/carritos/${id}`);
  }

  // Método para agregar un nuevo carrito
  agregarCarrito(carrito: CarritoModel) {
    // Realiza una solicitud POST para agregar un nuevo carrito, el endpoint espera el carrito en el cuerpo de la solicitud
    return this.http.post<string>(`${this.BASE_URL}/carritos/agregar`, carrito);
  }

  // Método para actualizar un carrito existente
  actualizarCarrito(carrito: CarritoModel) {
    // Realiza una solicitud PUT para actualizar un carrito existente, el endpoint espera el carrito en el cuerpo de la solicitud y el ID en la URL
    return this.http.put<string>(
      `${this.BASE_URL}/carritos/actualizar/${carrito.id_carrito}`,
      carrito
    );
  }

  // Método para borrar un carrito específico por su ID
  borrarCarrito(id: number) {
    // Realiza una solicitud DELETE para borrar un carrito específico por su ID
    return this.http.delete<string>(`${this.BASE_URL}/carritos/borrar/${id}`);
  }
}
