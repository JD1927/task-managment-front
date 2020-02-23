import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { signInRoute, signUpRoute } from 'src/app/shared/constants/global.constants';
import { JwtPayload, SignIn, SignUp, UserLogged } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  signIn(signIn: SignIn): Observable<UserLogged> {
    return this.http.post<any>(signInRoute, { ...signIn });
  }

  signUp(signUp: SignUp): Observable<any> {
    return this.http.post(signUpRoute, { ...signUp });
  }

  setUser(userInfo: JwtPayload, expiresAt: number): void {
    this.setUserInfo(userInfo);
    this.setExpiresAt(expiresAt);
  }

  private setUserInfo(userInfo: JwtPayload): void {
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  /**
   * When we compare the current time against the expiresAt time
   * Later, we do so using a Javascript Date Object. The Date object
   * deals with timestamps differently than how we have them
   * in the token, so we need to multiple by 1000
   */
  private setExpiresAt(expiresAt: number): void {
    sessionStorage.setItem('expiresAt', JSON.stringify(expiresAt * 1000));
  }

  /**
   * Get the time the token expires
   * If there's no expiresAt value, make the user login
   * Our indication as to whether the user is authenticated or not is
   *
   * if they have an unexpired token. Return a boolean that compares the current time with the
   * token expiry time. The expiresAt value needs to be parsed because it is stored as a string
   *
   */
  isAuthenticated(): boolean {
    const expiresAt = sessionStorage.getItem('expiresAt');
    if (!expiresAt) {
      return false;
    }
    return new Date().getTime() < parseInt(expiresAt);
  }

  logOut(): void {
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('expiresAt');
    this.router.navigate(['']);
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  getToken(): string {
    return sessionStorage.getItem('token');
  }

  getUserInfo(): JwtPayload {
    return JSON.parse(sessionStorage.getItem('userInfo'));
  }
}
