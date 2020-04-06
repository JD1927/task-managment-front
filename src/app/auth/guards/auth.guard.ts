import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { UserState } from './../../store/reducers/user/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  userState$: Subscription = new Subscription();
  expiresAt: number;

  constructor(
    private router: Router,
    public store: Store<UserState>
  ) { }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  isAuthenticated(): boolean {
    this.getExpiresAt();
    if (!this.expiresAt) {
      return false;
    }
    return new Date().getTime() < this.expiresAt;
  }

  getExpiresAt(): void {
    this.userState$ = this.store.select(state => state.user).pipe(
      map(user => this.expiresAt = user.expiresAt)
    ).subscribe();
  }
}
