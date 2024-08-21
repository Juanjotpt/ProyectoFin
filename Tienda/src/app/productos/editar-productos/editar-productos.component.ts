import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ProductoModel } from '../../compartido/producto/producto.model';
import { ProductoService } from '../../compartido/producto/producto.service';

@Component({
  selector: 'app-editar-productos',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css'],
})
export class EditarProductosComponent implements OnInit {
  id: number = 0;
  producto = new ProductoModel(0, '', 0, '', 0, '');

  formularioProducto = new FormGroup({
    nombre_producto: new FormControl('', Validators.required),
    precio_unitario: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
    descripcion: new FormControl('', Validators.required),
    stock: new FormControl(0, [Validators.required, Validators.min(0)]),
    categoria: new FormControl('', Validators.required),
  });

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    if (this.id) {
      this.productoService.obtenerProductoId(this.id).subscribe({
        next: (result) => {
          if (Array.isArray(result) && result.length > 0) {
            this.producto = result[0];
          } else {
            this.producto = result;
          }

          this.formularioProducto.patchValue({
            nombre_producto: this.producto.nombre_producto,
            precio_unitario: this.producto.precio_unitario,
            descripcion: this.producto.descripcion,
            stock: this.producto.stock,
            categoria: this.producto.categoria,
          });
        },
        error: (error) => {
          console.error('Error al obtener el producto:', error);
          alert(
            'No se pudo obtener el producto. Inténtalo de nuevo más tarde.'
          );
        },
      });
    }
  }

  submit() {
    if (this.formularioProducto.valid) {
      this.producto = new ProductoModel(
        this.id, 
        this.formularioProducto.get('nombre_producto')?.value ?? '',
        Number(this.formularioProducto.get('precio_unitario')?.value ?? 0),
        this.formularioProducto.get('descripcion')?.value ?? '',
        Number(this.formularioProducto.get('stock')?.value ?? 0),
        this.formularioProducto.get('categoria')?.value ?? ''
      );

      if (this.id) {
        this.productoService.actualizarProducto(this.producto).subscribe({
          next: (result) => {
            alert(result);
            this.router.navigate(['/productos']);
          },
          error: (error) => {
            console.error('Error al actualizar el producto:', error);
            alert(
              'No se pudo actualizar el producto. Inténtalo de nuevo más tarde.'
            );
          },
        });
      } else {
        this.productoService.agregarProducto(this.producto).subscribe({
          next: (result) => {
            alert(result);
            this.router.navigate(['/productos']);
          },
          error: (error) => {
            console.error('Error al agregar el producto:', error);
            alert(
              'No se pudo agregar el producto. Inténtalo de nuevo más tarde.'
            );
          },
        });
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}
