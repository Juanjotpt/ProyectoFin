import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoModel } from './producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  
  BASE_URL = 'http://localhost:3000';

  // Constructor que inyecta HttpClient para realizar solicitudes HTTP
  constructor(private http: HttpClient) {}

  // Método para obtener todos los productos
  obtenerProductos() {
    // Realiza una solicitud GET para obtener un arreglo de productos
    return this.http.get<ProductoModel[]>(`${this.BASE_URL}/productos`);
  }

  // Método para obtener un producto específico por su ID
  obtenerProductoId(id: number) {
    // Realiza una solicitud GET para obtener un producto específico por su ID
    return this.http.get<ProductoModel>(`${this.BASE_URL}/productos/${id}`);
  }

  // Método para agregar un nuevo producto
  agregarProducto(producto: ProductoModel) {
    // Realiza una solicitud POST para agregar un nuevo producto, el endpoint espera el producto en el cuerpo de la solicitud
    return this.http.post<string>(`${this.BASE_URL}/productos/agregar`, producto);
  }

  // Método para actualizar un producto existente
  actualizarProducto(producto: ProductoModel) {
    // Realiza una solicitud PUT para actualizar un producto existente, el endpoint espera el producto en el cuerpo de la solicitud y el ID en la URL
    return this.http.put<string>(
      `${this.BASE_URL}/productos/actualizar/${producto.id_producto}`,
      producto
    );
  }

  // Método para borrar un producto específico por su ID
  borrarProducto(id: number) {
    // Realiza una solicitud DELETE para borrar un producto específico por su ID
    return this.http.delete<string>(`${this.BASE_URL}/productos/borrar/${id}`);
  }
}
