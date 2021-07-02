import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AppConstants } from '../constants';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available

        let userinfo = localStorage.getItem(AppConstants.currentUser);
        if(userinfo != "undefined" && typeof userinfo != 'undefined' && userinfo !=null)
        {

            let currentUser = JSON.parse(localStorage.getItem(AppConstants.currentUser));
            if (currentUser && currentUser.access_token) {
                request = request.clone({
                    setHeaders: { 
                        Authorization :`${currentUser.access_token}`,
                        xToken :`${currentUser.refreshToken}`,
                        xDevice :`${currentUser.device}`
                    }
                });
            }
        }
        
 
        return next.handle(request);
    }
}