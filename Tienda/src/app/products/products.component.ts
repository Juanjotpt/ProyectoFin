import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductoService } from '../compartido/producto/producto.service';
import { ProductoModel } from '../compartido/producto/producto.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  producto: ProductoModel | undefined; 

  productos: ProductoModel[] = []; 

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    if (!isNaN(id)) {
      // Si el ID es un número válido, se busca el producto
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
}
