import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { AppConfig } from '../config';
import { AppConstants } from '../constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  uri = AppConfig.apiURL;

  constructor(private http: HttpClient) { }

  getProfile(): Observable<any> {
      const userinfo = localStorage.getItem(AppConstants.currentUser);
      if (userinfo != 'undefined' && typeof userinfo != 'undefined') {
          const currentUser = JSON.parse(localStorage.getItem(AppConstants.currentUser));
          // tslint:disable-next-line:max-line-length
          return this.http.post(this.uri + 'auth/profile',{uid:currentUser.id});
      }
      return;
  }

}
