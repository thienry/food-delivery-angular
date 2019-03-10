import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, NavigationEnd } from "@angular/router";

import { Observable } from "rxjs";
import "rxjs/add/operator/do";
import "rxjs/add/operator/filter";

import { FD_API } from "../../../app.api";
import { User } from "./user.model";

@Injectable()
export class LoginService {
  user: User;
  lastUrl: string;

  constructor(private http: HttpClient, private router: Router) {
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe((e: NavigationEnd) => this.lastUrl = e.url);
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<User>(`${FD_API}/login`, { email, password })
      .do(user => (this.user = user));
  }

  logout() {
    this.user = undefined;
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(["/login", path]);
  }
}
