import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoClienteDialogComponent } from './nuevo-cliente-dialog.component';

describe('NuevoClienteDialogComponent', () => {
  let component: NuevoClienteDialogComponent;
  let fixture: ComponentFixture<NuevoClienteDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoClienteDialogComponent]
    });
    fixture = TestBed.createComponent(NuevoClienteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
