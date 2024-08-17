import { TestBed } from '@angular/core/testing';

import { CarritoModel } from './carrito.model';

describe('CarritoModel', () => {
  let service: CarritoModel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoModel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
