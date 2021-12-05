import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../core/model/api/user";
import {AuthService} from "../../core/service/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  registeredUserData: User = new User('', '', '', '');
  registerSubscription: Subscription = new Subscription();

  constructor(private _auth: AuthService,
              private _router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

  onRegisterUser() {
    this.registerSubscription = this._auth.registerUser(this.registeredUserData).subscribe((res: any) => {
        if (res) {
          // once login navigate to home page
          this._router.navigate(['']);
        }
      },
      err => console.log(err));
  }

}
