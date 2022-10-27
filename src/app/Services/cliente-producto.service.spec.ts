import { TestBed } from '@angular/core/testing';

import { ClienteProductoService } from './cliente-producto.service';

describe('ClienteProductoService', () => {
  let service: ClienteProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClienteProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
