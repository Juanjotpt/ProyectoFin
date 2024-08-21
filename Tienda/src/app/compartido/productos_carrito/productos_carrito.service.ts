import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosCarritoModel } from './productos_carrito.model'; 

@Injectable({
  providedIn: 'root',
})
export class ProductosCarritoService {

  BASE_URL = 'http://localhost:3000'; // URL base de la API

  // Constructor que inyecta HttpClient para realizar solicitudes HTTP
  constructor(private http: HttpClient) {}

  // Método para obtener todos los productos en el carrito
  obtenerProductosCarrito() {
    // Realiza una solicitud GET para obtener un arreglo de productos en el carrito
    return this.http.get<ProductosCarritoModel[]>(`${this.BASE_URL}/productos_carrito`);
  }

  // Método para obtener un producto en el carrito por su ID
  obtenerProductoCarritoId(id: number) {
    // Realiza una solicitud GET para obtener un producto específico en el carrito por su ID
    return this.http.get<ProductosCarritoModel>(`${this.BASE_URL}/productos_carrito/${id}`);
  }

  // Método para agregar un nuevo producto al carrito
  agregarProductoCarrito(productoCarrito: ProductosCarritoModel) {
    // Realiza una solicitud POST para agregar un nuevo producto al carrito, el endpoint espera el producto en el cuerpo de la solicitud
    return this.http.post<string>(`${this.BASE_URL}/productos_carrito/agregar`, productoCarrito);
  }

  // Método para actualizar un producto en el carrito
  actualizarProductoCarrito(productoCarrito: ProductosCarritoModel) {
    // Realiza una solicitud PUT para actualizar un producto existente en el carrito, el endpoint espera el producto en el cuerpo de la solicitud y el ID en la URL
    return this.http.put<string>(
      `${this.BASE_URL}/productos_carrito/actualizar/${productoCarrito.id_productos_carrito}`,
      productoCarrito
    );
  }

  // Método para borrar un producto del carrito por su ID
  borrarProductoCarrito(id: number) {
    // Realiza una solicitud DELETE para borrar un producto específico del carrito por su ID
    return this.http.delete<string>(`${this.BASE_URL}/productos_carrito/borrar/${id}`);
  }
}
