import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ProductoModel } from '../../compartido/producto/producto.model'; // Asegúrate de que esta ruta sea correcta
import { ProductoService } from '../../compartido/producto/producto.service'; // Asegúrate de que esta ruta sea correcta

@Component({
  selector: 'app-editar-productos',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './editar-productos.component.html',
  styleUrls: ['./editar-productos.component.css'],
})
export class EditarProductosComponent implements OnInit {
  id: number = 0;
  producto = new ProductoModel(0,'',0, '', 0, ''); // Asegúrate de que el modelo se ajuste a tus necesidades

  formularioProducto = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio_unitario: new FormControl('', [Validators.required, Validators.minLength(0)]),
    descripcion: new FormControl('', Validators.required),
    stock: new FormControl('', [Validators.required, Validators.minLength(0)]),
    categoria: new FormControl('', Validators.required),

  });

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  submit() {
    if (this.formularioProducto.valid) {
      this.producto = new ProductoModel(
        this.producto.id_producto, 
        this.formularioProducto.get('nombre')?.value ?? '',
        Number(this.formularioProducto.get('precio_unitario')?.value ?? 0),
        this.formularioProducto.get('descripcion')?.value ?? '',
        Number(this.formularioProducto.get('stock')?.value ?? 0),
        this.formularioProducto.get('categoria')?.value ?? '',
      );
  
      if (this.producto.id_producto) {
        this.productoService
          .actualizarProducto(this.producto)
          .subscribe((result) => {
            alert(result);
            this.router.navigate(['/productos']);
          });
      } else {
        this.productoService.agregarProducto(this.producto).subscribe((result) => {
          alert(result);
          this.router.navigate(['/productos']);
        });
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.productoService.obtenerProductoId(this.id).subscribe((result: ProductoModel) => {
        this.producto = result;
        this.formularioProducto.patchValue({
          nombre: this.producto.nombre_producto,
          precio_unitario: this.producto.precio_unitario,
          descripcion: this.producto.descripcion,
          stock: this.producto.stock,
          categoria: this.producto.categoria
        });
      });
    }
  }
}
