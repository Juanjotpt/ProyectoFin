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
  carritoVacio: boolean = false;
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
          this.carritoVacio = this.productosCarrito.length === 0; // Actualiza la variable
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
 
    this.productosCarritoService.actualizarProductoCarrito(producto).subscribe();
  }

  borrarProducto(productoId: number) {
    this.productosCarritoService.borrarProductoCarrito(productoId).subscribe(
      () => {
        this.productosCarrito = this.productosCarrito.filter(p => p.id_productos_carrito !== productoId);
        this.calcularTotal();
      },
      (error) => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }

  comprar() {
    alert("Compra realizada");
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const idCarrito = userInfo.id_carrito;
  
    if (idCarrito) {
     
      this.productosCarritoService.vaciarCarrito(idCarrito).subscribe(
        () => {
      
          this.productosCarrito = [];
          this.totalCarrito = 0;
        },
        (error) => {
          console.error('Error al vaciar el carrito', error);
        }
      );
    }
  }
}
