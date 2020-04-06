import { Action, createReducer, on } from '@ngrx/store';
import { UserLogged } from 'src/app/auth/models/auth.model';
import { signIn, signInSuccess, signInFailure, clearUserState } from './../../actions/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  user: UserLogged;
  error?: any;
}

export const initialState: UserState = {
  user: undefined,
  error: undefined,
};

const userReducer = createReducer(initialState,
  on(signIn, (state) => {
    return { ...state };
  }),
  on(signInSuccess, (state, action) => {
    return {
      ...state,
      ...action.data,
      expiresAt: action.data.expiresAt * 1000
    };
  }),
  on(signInFailure, (state, action) => {
    return {
      ...state,
      error: { ...action.error }
    };
  }),
  on(clearUserState, (state, action) => {
    return { ...initialState };
  }),
);

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
