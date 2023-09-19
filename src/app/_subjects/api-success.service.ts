import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiSuccessService {
  constructor() {}
  apiSuccess = new Subject<string>();

  sendSuccess(message: string): void {
    this.apiSuccess.next(message);
  }
}
