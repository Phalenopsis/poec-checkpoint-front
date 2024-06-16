import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';



export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {

  const tokenService: TokenService = inject(TokenService);
  const router: Router = inject(Router);

  const token = tokenService.getTokenFromLocalStorageAndDecode();
  console.log(token);

  if (token) {
    return true;
  } else {
    router.navigateByUrl('');
    return false;
  }
};
