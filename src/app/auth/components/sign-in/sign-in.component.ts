import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserState } from 'src/app/store/reducers/user/user.reducer';
import { signIn, clearUserState } from './../../../store/actions/user.actions';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  userState$: Subscription = new Subscription();
  error: Error;
  signInForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<UserState>,
  ) { }

  ngOnInit(): void {
    this.createSignInForm();
    this.getSignInError();
  }

  ngOnDestroy(): void {
    this.userState$.unsubscribe();
  }

  createSignInForm(): void {
    this.error = undefined;
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignIn(): void {
    if (this.signInForm.valid) {
      const { username, password } = this.signInForm.value;
      this.store.dispatch(signIn({ data: { username, password } }));
    }
  }

  getSignInError(): void {
    this.userState$ = this.store.select(state => state.user.error).pipe(
      tap((error: Error) => {
        this.error = error;
      })
    ).subscribe();
  }

}
