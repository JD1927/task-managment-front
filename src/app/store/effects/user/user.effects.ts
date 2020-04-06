import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { UserLogged } from 'src/app/auth/models/auth.model';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { signIn, signInFailure, signInSuccess } from '../../actions/user.actions';

@Injectable()
export class UserEffects {

  signIn$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signIn),
      mergeMap((action) => {
        const { username, password } = action.data;
        return this.auth.signIn({ username, password }).pipe(
          map(res => signInSuccess({ data: res })),
          tap(() => this.router.navigate(['/dashboard'])),
          catchError(err => of(signInFailure({ error: err.error })))
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private auth: AuthService,
    private router: Router,
  ) { }

}
