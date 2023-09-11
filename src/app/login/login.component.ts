import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Credentials } from '../models/credentials.model';
import { Token } from '../models/token.model';
import { TokenService } from '../_services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  credentials: Credentials = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/),
        ],
      ],
    });
  }

  onSubmit(): void {
    this.credentials.username = this.loginForm.value.username;
    this.credentials.password = this.loginForm.value.password;

    this.authService.login(this.credentials).subscribe(
      (data: Token) => {
        console.log(data.token);
        this.tokenService.saveToken(data.token);
        this.router.navigate(['user/decks'])
      },
      (err) => console.log(err)
    );
  }
}
