import { TestBed } from '@angular/core/testing';

import { GeneracionesService } from './generaciones.service';

describe('GeneracionesService', () => {
  let service: GeneracionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneracionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
