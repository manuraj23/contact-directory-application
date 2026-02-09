import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hrAuthGuard } from './hr-auth-guard';

describe('hrAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hrAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
