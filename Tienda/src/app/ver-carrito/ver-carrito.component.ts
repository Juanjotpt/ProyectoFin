import { Component } from '@angular/core';
import { ProductosCarritoModel } from '../compartido/productos_carrito/productos_carrito.model';
import { ProductosCarritoService } from '../compartido/productos_carrito/productos_carrito.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  carritoVacio: boolean = true; 
  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  nombre: string = this.userInfo.nombre;

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
           
            this.productosCarrito = Array.isArray(productos) ? productos : [];
            this.carritoVacio = this.productosCarrito.length === 0; 
            this.calcularTotal();
          },
          (error) => {
            console.error('Error al obtener los productos del carrito', error);
            this.productosCarrito = []; 
            this.carritoVacio = true; 
          }
        );
    } else {
      console.error('No se encontró el id_carrito en localStorage');
      this.productosCarrito = [];  
      this.carritoVacio = true; 
    }
  }

  calcularTotal() {
    this.totalCarrito = this.productosCarrito.reduce((total, producto) => {
      return total + producto.cantidad * producto.precio_unitario;
    }, 0);
  }

  cambiarCantidad(producto: ProductosCarritoModel, increment: boolean) {
    if (increment) {
      if (producto.cantidad < producto.stock) {
        producto.cantidad += 1;
      } else {
       this.showErrorModal();
      }
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
          this.carritoVacio = true; 
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
   
      doc.setFontSize(18);
      doc.text('Factura de Compra', 20, 20);
  
      const nombreCliente = this.userInfo.nombre;
      const emailCliente = this.userInfo.email;
      const direccionCliente = this.userInfo.direccion;
  
      doc.setFontSize(12);
      doc.text(`Cliente: ${nombreCliente}`, 20, 30);
      doc.text(`Email: ${emailCliente}`, 20, 40);
      doc.text(`Dirección: ${direccionCliente}`, 20, 50);
  
    
      if (this.productosCarrito.length > 0) {
        const productos = this.productosCarrito.map(producto => {
          const nombre = producto.nombre_producto || 'Sin nombre';
          const cantidad = producto.cantidad;
          const precioUnitario = producto.precio_unitario;
          const total = (producto.cantidad * producto.precio_unitario).toFixed(2);
          return [nombre, cantidad, precioUnitario, total];
        });
  
   
        autoTable(doc, {
          head: [['Producto', 'Cantidad', 'Precio Unitario (€)', 'Total (€)']],
          body: productos,
          startY: 70
        });
  
      
        const subtotal = this.totalCarrito || 0;  
        const iva = subtotal * 0.21;             
        const totalConIva = subtotal + iva;       
     
        const finalY = (doc as any).lastAutoTable.finalY || 70;
        doc.setFontSize(14);
        doc.text(`Subtotal: ${subtotal} €`, 20, finalY + 10);
        doc.text(`IVA (21%): ${iva.toFixed(2)} €`, 20, finalY + 20);
        doc.text(`Total con IVA: ${totalConIva} €`, 20, finalY + 30);
  
      } else {
        doc.text('El carrito está vacío.', 20, 70);
      }
  
      doc.save(`factura_${this.userInfo.nombre}.pdf`);
    } catch (error) {
      console.error('Error al generar el PDF', error);
    }
  }
  
  showErrorModal(): void {
    const modalElement = document.getElementById('errorModal'); 
    if (modalElement) {
      const bootstrapModal = new (window as any).bootstrap.Modal(modalElement); 
      bootstrapModal.show(); 
    }
  }
}
