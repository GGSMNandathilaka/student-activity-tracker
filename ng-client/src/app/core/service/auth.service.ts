import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {catchError, map} from "rxjs/operators";
import {ErrorHandlerService} from "../util/error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // this should be keep as a configuration. Because back-end url can be change upon the environment.
  // Also we can define a proxy configuration for this.
  // Since this is a pilot project I've been keep endpoint url in the app environment file.
  private _signupEndpoint = environment.signupEndpoint;
  private _loginEndpoint = environment.loginEndpoint;

  constructor(private http: HttpClient,
              private errorHandler: ErrorHandlerService) {
  }

  /**
   * New user sign up
   * @param user
   */
  registerUser(user: User) {
    return this.http.post<any>(this._signupEndpoint, user)
      .pipe(
        map((res: any) => {
            if (res) {
              // Store JWT in the local storage
              localStorage.setItem('token', res.token);
              return res;
            }
          },
          catchError(this.errorHandler.handleError('registerUser', [])))
      );
  }

  /**
   * User login
   * @param user
   */
  loginUser(user: User) {
    return this.http.post<any>(this._loginEndpoint, user)
      .pipe(
        map((res: any) => {
            if (res) {
              // Store JWT in the local storage
              localStorage.setItem('token', res.token);
              return res;
            }
          },
          catchError(this.errorHandler.handleError('loginUser', [])))
      );
  }

  logOutUser() {
    if (this.loggedIn()) {
      localStorage.removeItem('token');
    }
  }

  /**
   * Check user logged in or not
   * Check availability of the JWT which is stores in the localStorage
   */
  loggedIn() {
    return !!localStorage.getItem('token');
  }

}
