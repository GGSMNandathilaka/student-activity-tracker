import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../core/model/api/user";
import {AuthService} from "../../core/service/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loggedInUserData: User = new User('', '', '', '');
  isLoginError = false;
  loginSubscription: Subscription = new Subscription();

  constructor(private _auth: AuthService,
              private _router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  /**
   * Triggers when user click sign-in button
   */
  onUserLoggedIn() {
    this.isLoginError = false;
    this.loginSubscription = this._auth.loginUser(this.loggedInUserData).subscribe((res: any) => {
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
