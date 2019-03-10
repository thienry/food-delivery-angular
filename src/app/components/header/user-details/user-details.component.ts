import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/components/security/login/login.service';
import { User } from "../../security/login/user.model"
 
@Component({
  selector: 'mt-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  user(): User {
    return this.loginService.user
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

  login() {
    this.loginService.handleLogin()
  }

  logout() {
    this.loginService.logout()
  }

}
