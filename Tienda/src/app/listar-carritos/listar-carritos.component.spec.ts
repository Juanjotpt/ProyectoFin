import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCarritosComponent } from './listar-carritos.component';

describe('ListarCarritosComponent', () => {
  let component: ListarCarritosComponent;
  let fixture: ComponentFixture<ListarCarritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarCarritosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarCarritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
