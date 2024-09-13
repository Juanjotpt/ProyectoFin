import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductoModel } from '../compartido/producto/producto.model';
import { ProductoService } from '../compartido/producto/producto.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent {

  userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

  productos: ProductoModel[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe({
      next: (productos) => this.productos = productos,
      error: (err) => console.error('Error al obtener los productos', err)
    });
  }


}
