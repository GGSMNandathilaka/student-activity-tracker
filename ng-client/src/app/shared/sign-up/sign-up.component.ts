import {Component, OnInit} from '@angular/core';
import {User} from "../../core/model/user";
import {AuthService} from "../../core/service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registeredUserData: User = new User('', '', '', '');

  constructor(private _auth: AuthService,
              private _router: Router) {
  }

  ngOnInit(): void {
  }

  onRegisterUser() {
    this._auth.registerUser(this.registeredUserData).subscribe((res: any) => {
        if (res) {
          // once login navigate to home page
          this._router.navigate(['']);
        }
      },
      err => console.log(err));
  }

}
