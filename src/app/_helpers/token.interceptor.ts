import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { TokenService } from '../_services/token.service';
import { Router } from '@angular/router';
import { ApiErrorService } from '../_subjects/api-error.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    private apiErrorService: ApiErrorService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getToken();
    if (token !== null) {
      let clone = request.clone({
        headers: request.headers.set('Authorization', 'bearer ' + token),
      });
      console.log(clone);

      return next.handle(clone).pipe(
        catchError((error) => {
          this.apiErrorService.sendError(error.error.message);

          if (error.status === 401) {
            this.tokenService.clearToken();
            this.router.navigate(['auth']);
            return throwError(() => error);
          }
          return throwError(() => error);
        })
      );
    }
    return next.handle(request);
  }
}
