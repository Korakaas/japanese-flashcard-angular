import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenService } from 'src/app/_services/token.service';
import { Credentials } from 'src/app/models/credentials.model';
import { Token } from 'src/app/models/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(180),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/),
  ]);
  credentials: Credentials = {};
  private destroy$!: Subject<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
    });
  }

  /**
   * Vérifie que le couple utilisateur/mot de passe est correct
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.credentials.username = this.loginForm.value.username;
      this.credentials.password = this.loginForm.value.password;

      this.authService
        .login(this.credentials)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: Token) => {
          this.tokenService.saveToken(data.token);
          this.router.navigate(['user/decks']);
        });
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
