import { TestBed } from '@angular/core/testing';

import { TransformDtoService } from './transform-dto.service';

describe('TransformDtoService', () => {
  let service: TransformDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
