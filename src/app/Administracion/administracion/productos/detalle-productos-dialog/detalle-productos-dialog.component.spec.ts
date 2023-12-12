import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleProductosDialogComponent } from './detalle-productos-dialog.component';

describe('DetalleProductosDialogComponent', () => {
  let component: DetalleProductosDialogComponent;
  let fixture: ComponentFixture<DetalleProductosDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleProductosDialogComponent]
    });
    fixture = TestBed.createComponent(DetalleProductosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
