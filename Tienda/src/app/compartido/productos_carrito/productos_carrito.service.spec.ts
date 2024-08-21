import { TestBed } from '@angular/core/testing';
import { ProductosCarritoService } from './productos_carrito.service'; // Ajusta la ruta según sea necesario

describe('ProductosCarritoService', () => {
  let service: ProductosCarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosCarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
