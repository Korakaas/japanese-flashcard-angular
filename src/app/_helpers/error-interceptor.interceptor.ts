// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpResponse,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { CustomErrorHandler } from './custom-error-handler.service';

// @Injectable()
// export class ErrorInterceptorInterceptor implements HttpInterceptor {

//   constructor(private error: CustomErrorHandler) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     return new Observable((observer) => {
//       next.handle(request).subscribe(
//         (res:HttpResponse<unknown>) => {
//           if (res instanceof HttpResponse) {
//             observer.next(res);
//           },
//           (err: HttpErrorResponse) => {
//             this.error.handleError(err);
//           }
//         }
//       )
//     });
//   }
// }
