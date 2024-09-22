import { Component } from '@angular/core';
import { ProductosCarritoModel } from '../compartido/productos_carrito/productos_carrito.model';
import { ProductosCarritoService } from '../compartido/productos_carrito/productos_carrito.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-ver-carrito',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './ver-carrito.component.html',
  styleUrls: ['./ver-carrito.component.css'],
})
export class VerCarritoComponent {
  productosCarrito: ProductosCarritoModel[] = [];
  totalCarrito: number = 0;

  constructor(private productosCarritoService: ProductosCarritoService) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
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

  cambiarCantidad(producto: ProductosCarritoModel, increment: boolean) {
    if (increment) {
      producto.cantidad += 1;
    } else {
      if (producto.cantidad > 1) {
        producto.cantidad -= 1;
      }
    }
    this.calcularTotal();
    // Lógica para actualizar la cantidad en el servidor
    this.productosCarritoService.actualizarProductoCarrito(producto).subscribe();
  }

  comprar() {
    alert("Compra realizada");
    // Lógica para procesar la compra y vaciar el carrito en el servidor
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const idCarrito = userInfo.id_carrito;

    if (idCarrito) {
      this.productosCarritoService.borrarProductoCarrito(idCarrito).subscribe(() => {
        this.productosCarrito = [];
        this.totalCarrito = 0;
      });
    }
  }
}
