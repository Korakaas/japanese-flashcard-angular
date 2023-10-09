import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';

import { ApiSuccessService } from 'src/app/_subjects/api-success.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;
  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.maxLength(180),
  ]);
  pseudo = new FormControl('', Validators.maxLength(40));
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/),
  ]);
  user: User = {};
  private destroy$!: Subject<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private apiSuccessService: ApiSuccessService
  ) {}

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    this.registerForm = this.formBuilder.group({
      email: this.email,
      pseudo: this.pseudo,
      password: this.password,
    });
  }

  /**
   * Ajoute un nouvel utilisateur si le formulaire est valide
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.user.email = this.registerForm.value.email;
      this.user.pseudo = this.registerForm.value.pseudo;
      this.user.password = this.registerForm.value.password;

      this.authService
        .register(this.user)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: string) => {
          this.apiSuccessService.sendSuccess(data);
          this.router.navigate(['auth/login']);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
