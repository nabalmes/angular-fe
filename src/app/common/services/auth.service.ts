import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../models/role';
import { User } from '../models/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { helpers } from 'chart.js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //public
  public currentUser: Observable<User>;

  //private
  private currentUserSubject: BehaviorSubject<User>;

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private jwtHelper: JwtHelperService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // getter: currentUserValue
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  setApplicantInfo(applicantData: any, profilePicValue: string) {
    let userInfo: User = {...this.currentUserValue};
    this.currentUserSubject.next(userInfo);
  }

  /**
   *  Confirms if user is admin
   */
  get isAdmin() {
    return this.currentUser &&  Object.values(Role).find(r => r === this.currentUserSubject.value.roles[0]);
  }

  /**
   *  Confirms if user is client
   */
  get isClient() {
    return this.currentUser && this.currentUserSubject.value.roles[0] === Role.Basic;
  }

  get isAuthenticated(): boolean {
    const helper = new JwtHelperService();
    return !helper.isTokenExpired(this.currentUserValue.jwToken)
  }

  set user(user: User) {
    this.currentUserSubject.next(user);
  }

  get tokenDetails() {
    const helper = new JwtHelperService();
    return helper.decodeToken(this.currentUserValue.jwToken);
  }

  clearSession() {
    sessionStorage.clear();
    this.currentUserSubject.next(null);
  }
}
