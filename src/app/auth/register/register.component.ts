import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!:FormGroup;
  user: User = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pseudo:[''],
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
    this.user.email = this.registerForm.value.email;
    this.user.pseudo = this.registerForm.value.pseudo;
    this.user.password = this.registerForm.value.password;

    this.authService.register(this.user).subscribe(
      (data: string) => {
        console.log(data);
        this.router.navigate(['auth/login']);
      },
      (err) => console.log(err)
    );
  }
}
