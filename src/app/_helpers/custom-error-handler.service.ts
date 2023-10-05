import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CustomErrorHandler implements ErrorHandler{

  constructor(private toaster: ToastrService) { }

  handleError(error: HttpErrorResponse){
    let errorMessage:string;
    if(error.error instanceof ErrorEvent) {
      errorMessage = `IL y a eu une erreur: ${error.error.message}`
    }
    else {
      errorMessage = 'IL y a eu une erreur'
    }
    this.toaster.error(errorMessage);
  }
}
