import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserModel} from "../models/userModel";
import {CookieService} from "ngx-cookie-service";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {NoteModel} from "../models/noteModel";
import {userLoginModel} from "../models/userLoginModel";
import {observeTriggers} from "@ng-bootstrap/ng-bootstrap/util/triggers";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  // @ts-ignore
  private userInfoSubject ?: BehaviorSubject<UserModel>;
  public currentUser$ : Observable<UserModel>;
  static USER_INFO = 'USER_INFO';
  userDataModel = new UserModel()


  constructor(private cookieService: CookieService, private router: Router, private httpClient: HttpClient) {
    const jsonString = this.cookieService.get(UserService.USER_INFO);
    if (jsonString === '') {
      // @ts-ignore
      this.userInfoSubject = new BehaviorSubject<UserModel>(null);
    } else {
      this.userInfoSubject = new BehaviorSubject<UserModel>(JSON.parse(this.cookieService.get(UserService.USER_INFO)));
    }
    this.currentUser$ = this.userInfoSubject.asObservable();
  }

  /**
   * =====================================================
   * This canActivate method is overriden and will work
   * for handling the logic of checking if a user is
   * logged in or not, and will perform necessary actions.
   * Only implementing this method is not enough. We will
   * also have to add canActivate: attribute in our routes
   * definition.
   * =====================================================
   * */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.checkAuthentication();
    if (this.currentUserValue != null) {
      return true;
    } else {
      location.href
         = '/login'
      return false;
    }
  }

  public get currentUserValue() {
    // @ts-ignore
    return this.userInfoSubject.value;
  }

  private checkAuthentication() {
    const jsonString = this.cookieService.get(UserService.USER_INFO);
    if (jsonString === '') {
      // @ts-ignore
      this.userInfoSubject.next(null);
      // @ts-ignore
      this.userInfoSubject = new BehaviorSubject<UserModel>(null);
      this.currentUser$ = this.userInfoSubject.asObservable();
    } else {
      this.userInfoSubject = new BehaviorSubject<UserModel>(JSON.parse(this.cookieService.get(UserService.USER_INFO)));
    }
  }

  logout() {
    // Delete the cookie
    this.cookieService.delete(UserService.USER_INFO);
    // @ts-ignore
    this.userInfoSubject.next(null);

  }

  login(username : string, password : string) : Observable<HttpResponse<UserModel>>{
    const userLoginData = new userLoginModel();
    userLoginData.username = username
    userLoginData.password = password

    let observableUser = this.httpClient.post<userLoginModel>(environment.BASE_URL + '/login', userLoginData,{observe : 'response'});

     observableUser.subscribe(data =>{
      this.userDataModel = data.body ? data.body : new UserModel()
      // @ts-ignore
      this.userInfoSubject.next(this.userDataModel);
      this.cookieService.set(UserService.USER_INFO, JSON.stringify(this.userDataModel));
      return observableUser;
    }, error => {
      return null;
    });
    return observableUser;
  }

/*

  login(email: string, password: string): Observable<UserModel> | null {
    const url = '/user/login';
    if (email === 'rony@gmail.com' && password === 'secret') {
      const userModel = new UserModel()
      userModel.username = 'rony'
      userModel.email = 'rony@gmail.com'
      userModel.token = 'test-token'
      const userObservable = new Observable<UserModel>(observer => {
        observer.next( userModel )
        observer.complete()
      });
      this.cookieService.set(UserService.USER_INFO, JSON.stringify(userModel));
      // @ts-ignore
      this.userInfoSubject.next(userModel);
      return userObservable;
    } else {
      throw new Error("Failed to log in")
    }
    /!*return this.httpClient.post<UserModel>(environment.AUTH_SERVER + url, {username, password})
      .pipe(
        map(userModel => {
          this.cookieService.set(UserService.USER_INFO, JSON.stringify(userModel));
          this.userInfoSubject.next(userModel);
          return userModel;
        })
      );*!/
  }
*/




  // @ts-ignore
  registerUser(userDataModel : userModel): Observable<HttpResponse<UserModel>> {
    // Todo work for registration here

    return this.httpClient.post<UserModel>(environment.BASE_URL + '/register', userDataModel,{observe : 'response'});


    /*const url = '/user/create';
      return this.httpClient.post<UserModel>(environment.AUTH_SERVER + url, formData)
        .pipe(
          map(userModel => {
            this.cookieService.set(AuthenticationService.USER_INFO, JSON.stringify(userModel));
            this.userInfoSubject.next(userModel);
            return userModel;
          })
        );*/
  }
}
