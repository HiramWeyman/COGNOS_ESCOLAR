import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaciondocenteComponent } from './asignaciondocente.component';

describe('AsignaciondocenteComponent', () => {
  let component: AsignaciondocenteComponent;
  let fixture: ComponentFixture<AsignaciondocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaciondocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaciondocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
