import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CarritoModel } from '../../compartido/carrito/carrito.model';
import { CarritoService } from '../../compartido/carrito/carrito.service';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listar-carritos',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet],
  templateUrl: './listar-carritos.component.html',
  styleUrls: ['./listar-carritos.component.css']
})
export class ListarCarritosComponent implements OnInit {

  carritos: CarritoModel[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.cargarCarritos();
  }

  cargarCarritos(): void {
    this.carritoService.obtenerCarritos().subscribe(result => {
      this.carritos = result;
    });
  }

  borrarCarrito(id: number): void {
    this.carritoService.borrarCarrito(id).subscribe({
      next: (result) => {
        console.log(result);
        this.cargarCarritos(); 
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 500) { 
       
        } else {
          console.error("Error inesperado:", error.message);
        }
      }
    });
  }

}
