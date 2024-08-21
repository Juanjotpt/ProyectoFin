import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProductosCarritoComponent } from './listar-productos-carrito.component';

describe('ListarProductosCarritoComponent', () => {
  let component: ListarProductosCarritoComponent;
  let fixture: ComponentFixture<ListarProductosCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarProductosCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarProductosCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
