import { TestBed } from '@angular/core/testing';

import { CountryCode } from './country-code';

describe('CountryCode', () => {
  let service: CountryCode;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryCode);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
