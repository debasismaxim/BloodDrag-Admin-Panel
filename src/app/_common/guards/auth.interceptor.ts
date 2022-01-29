import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add header with bearer auth credentials if user is logged in and request is to the api url
        const auth = this.authService.authValue;
        const accessToken = localStorage.getItem('accessToken');
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (accessToken && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        } else {
            
            
        }

        return next.handle(request);
    }
}