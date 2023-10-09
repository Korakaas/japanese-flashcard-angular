import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { Credentials } from '../models/credentials.model';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, public router: Router) {}

   /*
    Vérifie le couple email/mot de passe
    @route POST ['/user/login_check']
  */
  login(credentials: Credentials): Observable<Token> {
    return this.http.post<Token>(environment.api + 'login_check', credentials);
  }

   /*
    Enregistre un nouvel utilisateur
    @route POST ['/user/register']
  */
  register(user: User): Observable<string> {
    return this.http.post<string>(environment.api + 'register', user);
  }
}
