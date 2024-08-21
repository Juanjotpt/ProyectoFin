import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductosCarritoComponent } from './editar-productos-carrito.component';

describe('EditarProductosCarritoComponent', () => {
  let component: EditarProductosCarritoComponent;
  let fixture: ComponentFixture<EditarProductosCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarProductosCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProductosCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
