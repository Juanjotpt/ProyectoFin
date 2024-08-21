import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { ProductosCarritoModel } from '../../compartido/productos_carrito/productos_carrito.model';
import { ProductosCarritoService } from '../../compartido/productos_carrito/productos_carrito.service'; 
@Component({
  selector: 'app-listar-productos-carrito',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './listar-productos-carrito.component.html',
  styleUrls: ['./listar-productos-carrito.component.css'],
})
export class ListarProductosCarritoComponent implements OnInit {
  productosCarrito: ProductosCarritoModel[] = [];

  constructor(private productosCarritoService: ProductosCarritoService) {}

  ngOnInit(): void {
    this.cargarProductosCarrito();
  }

  cargarProductosCarrito(): void {
    this.productosCarritoService.obtenerProductosCarrito().subscribe({
      next: (result) => {
        this.productosCarrito = result;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al obtener productos en el carrito:', error.message);
      },
    });
  }

  borrarProductoCarrito(id: number): void {
    this.productosCarritoService.borrarProductoCarrito(id).subscribe({
      next: (result) => {
        console.log(result);
        this.cargarProductosCarrito(); // Recargar la lista después de eliminar
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al eliminar el producto del carrito:', error.message);
      },
    });
  }
}
