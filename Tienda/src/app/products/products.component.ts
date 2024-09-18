import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../compartido/producto/producto.service';
import { ProductoModel } from '../compartido/producto/producto.model';
import { CommonModule } from '@angular/common';
import { ProductosCarritoService } from '../compartido/productos_carrito/productos_carrito.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  producto: ProductoModel | undefined; 
  productos: ProductoModel[] = []; 

  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private productosCarritoService: ProductosCarritoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!isNaN(id)) {
      this.productoService.obtenerProductoId(id).subscribe(
        (data: ProductoModel) => {
          this.producto = data;
        },
        error => {
          console.error('Error al obtener el producto', error);
        }
      );
    } else {
      console.error('ID de producto inválido');
    }
  }

  agregarAlCarrito(): void {
    if (!this.producto) {
      console.error('No hay producto para agregar al carrito');
      return;
    }

   
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    const idCarrito = userInfo.id_carrito;


    if (!idCarrito) {
      console.error('No se encontró el id_carrito en el localStorage');
      return;
    }

   
    this.productosCarritoService.agregarProductoCarrito(this.producto.id_producto, 1).subscribe(
      response => {
        console.log('Producto agregado al carrito:', response);
        
      },
      error => {
        console.error('Error al agregar el producto al carrito', error);
      }
    );
  }
}




