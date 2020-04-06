import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/store/reducers/user/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  accessToken: string;
  userState$: Subscription = new Subscription();

  constructor(
    private router: Router,
    public store: Store<UserState>,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.getAccessToken();
    let request = req;
    if (this.accessToken) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${this.accessToken}`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err.status === 401) {
          this.router.navigate(['']);
        }
        return throwError(err);
      })
    );
  }

  getAccessToken(): void {
    this.userState$ = this.store.select(state => state.user).pipe(
      map(user => this.accessToken = user.accessToken)
    ).subscribe();
  }
}
