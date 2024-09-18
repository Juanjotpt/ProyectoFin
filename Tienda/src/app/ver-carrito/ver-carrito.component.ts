import { Component } from '@angular/core';
import { ProductosCarritoModel } from '../compartido/productos_carrito/productos_carrito.model';
import { ProductosCarritoService } from '../compartido/productos_carrito/productos_carrito.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-ver-carrito',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './ver-carrito.component.html',
  styleUrl: './ver-carrito.component.css'
})
export class VerCarritoComponent {
  productosCarrito: ProductosCarritoModel[] = [];
  totalCarrito: number = 0;
  constructor(private productosCarritoService: ProductosCarritoService) {}

  ngOnInit() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const idCarrito = userInfo.id_carrito;

    if (idCarrito) {
      this.productosCarritoService.obtenerProductosPorIdCarrito(idCarrito).subscribe(
        (productos) => {
          this.productosCarrito = productos;
          this.calcularTotal();
        },
        (error) => {
          console.error('Error al obtener los productos del carrito', error);
        }
      );
    } else {
      console.error('No se encontró el id_carrito en localStorage');
    }
  }
  calcularTotal() {
    this.totalCarrito = this.productosCarrito.reduce((total, producto) => {
      return total + (producto.cantidad * producto.precio_unitario);
    }, 0);
  }




}
