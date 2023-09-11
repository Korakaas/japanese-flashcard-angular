import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Credentials } from '../models/credentials.model';
import { Token } from '../models/token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public router: Router) {}

  login(credentials:Credentials):Observable<Token>{
    return this.http.post<Token>(environment.api + 'login_check', credentials)
  }
}
