import {Component, OnInit} from '@angular/core';
import {User} from "../../core/model/user";
import {AuthService} from "../../core/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loggedInUserData: User = new User('', '', '', '');
  isLoginError = false;

  constructor(private _auth: AuthService,
              private _router: Router) {
  }

  ngOnInit(): void {
  }

  /**
   * Triggers when user click sign-in button
   */
  onUserLoggedIn() {
    this.isLoginError = false;
    this._auth.loginUser(this.loggedInUserData).subscribe((res: any) => {
        if (res) {
          // once login navigate to home page
          this._router.navigate(['']);
        }
      },
      err => {
        this.isLoginError = true;
        console.log(err)
      });
  }

}
