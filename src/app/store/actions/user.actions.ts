import { createAction, props } from '@ngrx/store';
import { UserLogged, SignIn } from 'src/app/auth/models/auth.model';

export const signIn = createAction(
  '[User] Sign In',
  props<{ data: SignIn }>()
);

export const signInSuccess = createAction(
  '[User] Sign In Success',
  props<{ data: UserLogged }>()
);

export const signInFailure = createAction(
  '[User] Sign In Failure',
  props<{ error: any }>()
);

export const clearUserState = createAction(
  '[User] Clear User State'
);
