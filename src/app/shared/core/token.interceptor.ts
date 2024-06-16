import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const lsService = inject(LocalStorageService);
  const token = lsService.getToken()

  if (!token) {
    return next(req);
  }

  const headers = new HttpHeaders({
    Authorization: token
  });

  const clonedRequest = req.clone({
    headers
  });

  return next(clonedRequest);
}