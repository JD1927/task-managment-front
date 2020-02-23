import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { passwordPattern } from 'src/app/shared/constants/global.constants';
import { Error } from 'src/app/shared/constants/models/error.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  hide = true;
  maxDate: Date = new Date();
  errorModel: Error;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.createSignUpForm();
  }

  createSignUpForm(): void {
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(passwordPattern)
      ]],
      name: ['', Validators.required],
      birthDate: [this.maxDate, Validators.required]
    });
  }

  onSignUp(): void {
    const { name, birthDate, username, password } = this.signUpForm.value;
    const data = { name, birthDate: birthDate.toDateString(), username, password };
    this.authService.signUp(data).subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/auth/sign-in']);
      },
      (err) => {
        this.errorModel = err.error;
      }
    );
  }

}
