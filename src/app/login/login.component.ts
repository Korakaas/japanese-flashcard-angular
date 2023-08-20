import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,Validators,FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any = FormGroup;

  constructor(
    private router:Router,
    private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', 
        [
          Validators.required, 
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/)
        ]
      ]
    });
  }

  onSubmit():void {
    console.log(this.loginForm);
    this.http.post('https://127.0.0.1:8000/api/login_check', this.loginForm.value).subscribe(
      data => console.log(data),
      err => console.log(err)
    )
  }
}
