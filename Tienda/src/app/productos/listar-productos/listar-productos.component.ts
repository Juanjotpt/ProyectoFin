import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProductoModel } from '../../compartido/producto/producto.model';
import { ProductoService } from '../../compartido/producto/producto.service';

@Component({
  selector: 'app-listar-productos',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css'],
})
export class ListarProductosComponent implements OnInit {
  productos: ProductoModel[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.obtenerProductos().subscribe((result) => {
      this.productos = result;
    });
  }

  borrarProducto(id: number): void {
    this.productoService.borrarProducto(id).subscribe((result) => {
      console.log(result);
      this.cargarProductos();
    });
  }
}
