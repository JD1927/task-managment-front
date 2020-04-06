import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserLogged } from 'src/app/auth/models/auth.model';
import { cleaTaskState } from 'src/app/store/actions/task.actions';
import { clearUserState } from 'src/app/store/actions/user.actions';
import { AppState } from 'src/app/store/reducers/appReducer.reducer';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  userState$: Subscription = new Subscription();
  user: UserLogged;
  age: number;
  name: string;

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUserLogged();
  }

  ngOnDestroy(): void {
    this.userState$.unsubscribe();
  }

  getUserLogged(): void {
    this.userState$ = this.store.select(state => state.user).pipe(
      tap((user: UserLogged) => {
        this.user = user;
        this.age = this.getUserAge(user.birthDate);
        this.name = this.getName(user.name);
      })
    ).subscribe();
  }

  getUserAge(date: string): number {
    const birthday = new Date(date);
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getName(name: string): string {
    return name ? name.split(' ')[0] : '';
  }

  logOut(): void {
    this.store.dispatch(clearUserState());
    this.store.dispatch(cleaTaskState());
    this.router.navigate(['']);
  }

}
