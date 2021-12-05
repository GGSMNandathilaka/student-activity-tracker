import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {User} from "../model/user";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // this should be keep as a configuration. Because back-end url can be change upon the environment.
  // Also we can define a proxy configuration for this.
  // Since this is a pilot project I've been keep endpoint url in the app environment file.
  private _signupEndpoint = environment.signupEndpoint;
  private _loginEndpoint = environment.loginEndpoint;

  constructor(private http: HttpClient) {
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
          catchError(this.handleError('registerUser', [])))
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
          catchError(this.handleError('loginUser', [])))
      );
  }

  /**
   * Check user logged in or not
   * Check availability of the JWT which is stores in the localStorage
   */
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation
   * @param result
   * @private
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead send the error to remote logging infrastructure
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
