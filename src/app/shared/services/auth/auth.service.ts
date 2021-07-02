import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/map';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';

import { AppConfig } from '../../config';
import { AppConstants } from '../../constants';
import {int} from 'aws-sdk/clients/datapipeline';
import getMAC, { isMAC } from 'getmac';


@Injectable()
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  uri = 'auth';
    // tslint:disable-next-line:typedef
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public setLoggedIn(bool) {
    this.loggedIn.next(bool);
  }

  constructor(
    private http: HttpClient,
    private _cookieService: CookieService
  ) 
  { 
    //var user = localStorage.getItem(AppConstants.currentUser);
    var cookie = this.getCookie(AppConstants.currentUser);
    var sess = sessionStorage.getItem(AppConstants.currentUser);
    if (cookie)
    {
      var cookieObj = JSON.parse(cookie);
      if (cookieObj && cookieObj.access_token && cookieObj.refreshToken && cookieObj.login_id)
      {
        this.updateLocalStorage(cookieObj);
        this.loggedIn.next(true);
      }
    }
    else if (sess)
    {
      var sessObj = JSON.parse(sess);
      if (sessObj && sessObj.access_token && sessObj.refreshToken && sessObj.login_id)
      {
        this.updateLocalStorage(sessObj);
        this.loggedIn.next(true);
      }
    }
  }

  updateLocalStorage(user: any) {
    localStorage.setItem(AppConstants.currentUser, JSON.stringify(user));
  }

  public getCurrentUser() :string {

    var cookie = this.getCookie(AppConstants.currentUser);
    if (cookie)
    {
      var cookieObj = JSON.parse(cookie);
      if (cookieObj && cookieObj.login_id && cookieObj.refreshToken && cookieObj.access_token)
      {
        return cookie;
      }
    }
    else
    {
      var sess = sessionStorage.getItem(AppConstants.currentUser);
      if (sess)
      {

        var sessObj = JSON.parse(sess);

        if (sessObj && sessObj.login_id && sessObj.refreshToken && sessObj.access_token)
        {
          return sess;
        }
      }
      return null;
    }
  }

  public setCurrentUer(user: any) {

    var cookie = this.getCookie(AppConstants.currentUser);
    var shouldSend = false;
    if (cookie)
    {
      var cookieObj = JSON.parse(cookie);
      if (cookieObj && cookieObj.login_id && cookieObj.refreshToken && cookieObj.access_token)
      {
        cookieObj.user = user;
        cookieObj.user['refreshToken'] = cookieObj.refreshToken;
        cookieObj.user['access_token'] = cookieObj.access_token;
        this.updateLocalStorage(cookieObj.user);
        this.setCookie(AppConstants.currentUser, cookieObj);
        shouldSend = true;
      }
    }
    //else
    //{
    var sess = sessionStorage.getItem(AppConstants.currentUser);
    if (sess)
    {
      var sessObj = JSON.parse(sess);
      if (sessObj && sessObj.login_id && sessObj.access_token && sessObj.refreshToken)
      {
        sessObj.user = user;
        sessObj.user['access_token'] = sessObj.access_token;
        sessObj.user['refreshToken'] = sessObj.refreshToken;
        this.updateLocalStorage(sessObj.user);

        sessionStorage.setItem(AppConstants.currentUser, JSON.stringify(sessObj));
        shouldSend = true;
      }
    }

    if (shouldSend)
      this.loggedIn.next(true);


    //}
  }

  /**
   * private
   */
  getCookie(key: string){
    return this._cookieService.get(key);
  }

  private setCookie(key: string, value: any, times?: int) {
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + 1);
    this._cookieService.putObject(key, value, {expires : expDate})
  }

    // tslint:disable-next-line:typedef
  private removeCookie(key: string) {
    this._cookieService.remove(key);
  }

  /**
   * public
   */

  public signIn(email: string, password: string, isRemember?: boolean) {

    const params = {
        userid: email,
        password: password,
        device_identifier: '163e3eewr',
        force_login: false
    };

    const url = AppConfig.apiURL + this.uri + '/login';
    return this.postData(url, params, 'login', isRemember);
  }

  public signUp(email: string, password: string, username?: string, fullName?: string) {
    const params = {
      email: email,
      password: password
    };
    if (username && username.length > 0) {
      params['username'] = username;
    }
    if (fullName && fullName.length > 0) {
      params['fullName'] = fullName;
    }

    const url = AppConfig.apiURL + this.uri + '/register';
    return this.postData(url, params);
  }



  public logout() {
    this.loggedIn.next(false);
    // remove user from local storage to log user out
    this._cookieService.remove(AppConstants.currentUser);
    sessionStorage.removeItem(AppConstants.currentUser);
    localStorage.removeItem(AppConstants.currentUser);
  }

  private postData(url, params, funcName?: string, isRemember?: boolean) {
    return this.http.post<any>(url, params).map(data => {

      if (data && data.success && data.access_token != 'undefined')
      {
        if (data.refreshToken) {
          if (isRemember) {
            this.setCookie(AppConstants.currentUser, { login_id: data.login_id, refreshToken: data.refreshToken, access_token: data.access_token,device:'163e3eewr',id:data.id
            });
          }
          else {
            this.removeCookie(AppConstants.currentUser);
          }
          data.device = "163e3eewr"
          sessionStorage.setItem(AppConstants.currentUser, JSON.stringify({ login_id: data.login_id, refreshToken: data.refreshToken, access_token: data.access_token,device:'163e3eewr',id:data.id}));

          this.updateLocalStorage(data);
          this.setLoggedIn(true);
        }
      }

      return data;
    });
  }
}
