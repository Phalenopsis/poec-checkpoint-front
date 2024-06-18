import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

export function tokenInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const lsService = inject(LocalStorageService);
  const token = lsService.getToken()

  if (!token) {
    return next(request);
  }

  const cloned = request.clone({
    headers: request.headers.set('Authorization', 'Bearer ' + token),
  });

  return next(cloned);
}