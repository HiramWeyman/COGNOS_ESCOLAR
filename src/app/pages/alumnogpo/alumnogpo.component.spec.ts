import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnogpoComponent } from './alumnogpo.component';

describe('AlumnogpoComponent', () => {
  let component: AlumnogpoComponent;
  let fixture: ComponentFixture<AlumnogpoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnogpoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlumnogpoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
