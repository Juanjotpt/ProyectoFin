import { Component } from '@angular/core';
import { ProductosCarritoModel } from '../compartido/productos_carrito/productos_carrito.model';
import { ProductosCarritoService } from '../compartido/productos_carrito/productos_carrito.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {jsPDF} from 'jspdf';
import 'jspdf-autotable';


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
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  nombre: string= this.userInfo.nombre;
  constructor(private productosCarritoService: ProductosCarritoService) {}

  ngOnInit() {
    this.cargarCarrito();
  }
  trackByFn(index: number, item: ProductosCarritoModel) {
    return item.id_productos_carrito; 
  }
  cargarCarrito() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const idCarrito = userInfo.id_carrito;
  
    if (idCarrito) {
      this.productosCarritoService
        .obtenerProductosPorIdCarrito(idCarrito)
        .subscribe(
          (productos) => {
            this.productosCarrito = productos || [];
         
            this.calcularTotal();
          },
          (error) => {
            console.error('Error al obtener los productos del carrito', error);
          }
        );
    } else {
      console.error('No se encontró el id_carrito en localStorage');
      this.productosCarrito = [];  
    }
  }

  calcularTotal() {
    this.totalCarrito = this.productosCarrito.reduce((total, producto) => {
      return total + producto.cantidad * producto.precio_unitario;
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

    this.productosCarritoService
      .actualizarProductoCarrito(producto)
      .subscribe();
  }

  borrarProducto(productoId: number) {
    this.productosCarritoService.borrarProductoCarrito(productoId).subscribe(
      () => {
        this.productosCarrito = this.productosCarrito.filter(
          (p) => p.id_productos_carrito !== productoId
        );
        this.calcularTotal();
      },
      (error) => {
        console.error('Error al eliminar el producto', error);
      }
    );
  }

  comprar() {
    alert('Compra realizada');

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
  generarPDF() {
    const doc = new jsPDF();
    
    try {
      // Título de la factura
      doc.setFontSize(18);
      doc.text('Factura de Compra', 20, 20);
      
      // Información del cliente
      const nombreCliente = this.userInfo.nombre ;
      const emailCliente = this.userInfo.email ;
      const direccionCliente = this.userInfo.direccion;
      
      doc.setFontSize(12);
      doc.text(`Cliente: ${nombreCliente}`, 20, 30);
      doc.text(`Email: ${emailCliente}`, 20, 40);
      doc.text(`Dirección: ${direccionCliente}`, 20, 50);
      
      // Espacio para iniciar la tabla de productos
      let startY = 70;
      
      // Verifica si hay productos en el carrito
      if (this.productosCarrito.length > 0) {
        // Encabezados de la tabla
        doc.setFontSize(12);
        doc.text('Producto', 20, startY);
        doc.text('Cantidad', 100, startY);
        doc.text('Precio Unitario', 140, startY);
        doc.text('Total', 180, startY);
        
        startY += 10; // Espacio entre encabezados y productos
  
        // Mapear productos para el PDF
        this.productosCarrito.forEach(producto => {
          const nombre = producto.nombre_producto || 'Producto sin nombre';
          const cantidad = (typeof producto.cantidad === 'number' ? producto.cantidad : 0).toString();
          const precioUnitario = (typeof producto.precio_unitario === 'number' ? producto.precio_unitario.toFixed(2) : '0.00') + '€';
          const total = (typeof producto.cantidad === 'number' && typeof producto.precio_unitario === 'number' 
            ? (producto.cantidad * producto.precio_unitario).toFixed(2) 
            : '0.00') + '€';
          
          // Añadir los datos del producto al PDF
          doc.text(nombre, 20, startY);
          doc.text(cantidad, 100, startY);
          doc.text(precioUnitario, 140, startY);
          doc.text(total, 180, startY);
    
          startY += 10; // Aumentar el espacio para la siguiente línea
        });
  
        // Agregar total del carrito
        const totalTexto = `Total del Carrito: ${(this.totalCarrito || 0).toFixed(2)}€`;
        startY += 10; // Espacio antes del total
        doc.setFontSize(14);
        doc.text(totalTexto, 20, startY); // Texto del total
      } else {
        // Si no hay productos, mostrar mensaje en PDF
        const mensaje = 'El carrito está vacío.';
        doc.text(mensaje, 20, startY);
      }
  
      // Guardar el PDF
      doc.save('factura.pdf');
    } catch (error) {
      console.error('Error al generar el PDF', error);
    }
  }
  

}
