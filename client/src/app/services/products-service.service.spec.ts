import { TestBed } from '@angular/core/testing';

import { ProductsServiceService } from './products-service.service';

describe('ProductsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsServiceService = TestBed.get(ProductsServiceService);
    expect(service).toBeTruthy();
  });
});
