import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import "rxjs/add/operator/do";

import { FD_API } from "../../../app.api";
import { User } from "./user.model";

@Injectable()
export class LoginService {
  user: User;

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<User>(`${FD_API}/login`, { email, password })
      .do(user => (this.user = user));
  }
}
