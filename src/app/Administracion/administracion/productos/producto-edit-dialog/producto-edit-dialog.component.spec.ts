import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEditDialogComponent } from './producto-edit-dialog.component';

describe('ProductoEditDialogComponent', () => {
  let component: ProductoEditDialogComponent;
  let fixture: ComponentFixture<ProductoEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoEditDialogComponent]
    });
    fixture = TestBed.createComponent(ProductoEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
