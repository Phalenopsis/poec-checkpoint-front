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
  if (token && token.role && token.role == "ROLE_ADMIN" && token.role == "ROLE_USER") {
    return true;
  } else {
    router.navigateByUrl('');
    return false;
  }
};
