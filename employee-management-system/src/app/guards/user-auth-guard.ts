import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login-service';

export const userAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const loginService = inject(LoginService);

  if(loginService.loggedIn() && loginService.logInTypeUser()){
    return true;
  }

  router.navigate(['/login']);
  return false;
};
