import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, of, tap } from 'rxjs';
import { HttpRequestService } from '../services/http-request.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const httpRequestService: HttpRequestService = inject(HttpRequestService);
  const router: Router = inject(Router);
  const lsService = inject(LocalStorageService);

  return next(request).pipe(
    tap((incomingRequest) => {
      if (incomingRequest instanceof HttpResponse) {
        httpRequestService.setHttpSuccessSubject$(incomingRequest);
      }
    }),
    catchError((err: HttpErrorResponse) => {
      console.log(err);
      httpRequestService.setHttpErrorSubject$(err);
      lsService.clearToken();
      router.navigate(['/error-connection'])

      return of();
    })
  );
};
