import { ResolveFn } from '@angular/router';
import { DbUserService } from '../services/db-user.service';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { TokenService } from '../services/token.service';
import { tap } from 'rxjs';

export const userResolver: ResolveFn<boolean> = (route, state) => {
  const tokenService = inject(TokenService);
  const userService = inject(DbUserService);
  const token = tokenService.getTokenFromLocalStorageAndDecode();
  if (token) {
    userService.getOneUser(token.sub).pipe(
      tap(qqch => console.log(qqch))
    )
  }

  return true;
};
