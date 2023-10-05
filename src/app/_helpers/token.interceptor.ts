import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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
      request = this.addAuthorizationHeader(request, token);
    }

    return next.handle(request).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return throwError(() => error);
      })
    );
  }

  private addAuthorizationHeader(
    request: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handleHttpError(error: HttpErrorResponse): void {
    let errorMessage:string = error.error.message.replace(/[\[\]"]/g, '');
    let errorStatus:number = error.status;
    const statusToRoute: { [key: number]: string } = {
      [HttpStatusCode.Unauthorized]: 'auth',
      [HttpStatusCode.InternalServerError]: 'serverError',
      [HttpStatusCode.NotFound]: 'notFound',
      [HttpStatusCode.Forbidden]: 'forbidden',
      [HttpStatusCode.TooManyRequests]: 'manyRequests',
      [HttpStatusCode.ServiceUnavailable]: 'unavailable',
      [HttpStatusCode.GatewayTimeout]: 'timeOut',
    };

    if (statusToRoute[errorStatus]) {
      this.tokenService.clearToken();
      this.router.navigate([statusToRoute[errorStatus]]);
    }

    if (
      errorStatus === HttpStatusCode.Unauthorized &&
      errorMessage === 'Invalid credentials.'
    ) {
      errorMessage = "Le mot de passe ou l'adresse email est incorrect(e)";
      this.apiErrorService.sendError(errorMessage);

    }

    if (!(errorStatus in statusToRoute)) {
      this.apiErrorService.sendError(errorMessage);
    }
  }
}
