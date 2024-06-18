import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes("psgc.gitlab.io") || request.url.includes("login") || request.url.includes("signup") || request.url.includes("forgot-password") || request.url.includes("/identity/reset-password"))
      return next.handle(request);

    // const token: string = sessionStorage.getItem('token');
    let token: string = sessionStorage.getItem('token');

    if (request.url.includes("api.reports.sidc.coop") && !request.url.includes("/identity")) {
      token = sessionStorage.getItem('report_token');
    } else if (request.url.includes("api.reports.sidc.coop") && request.url.includes("/identity")) {
      return next.handle(request);
    }

    if (request.url.includes("api.identity.sidc.coop") && request.url.includes("/identity")) {
      return next.handle(request);
    }
    if (token) {
      if (!this.authService.isAuthenticated) {
        this.authService.clearSession();
        this.router.navigate(["/"]);
      }
      request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }


    // return next.handle(request).pipe(
    //   map(null, error => {
    //     if (error.status === 401) {
    //       this.authService.clearSession();
    //       this.router.navigate(["/login"]);
    //     }
    //   })
    // );

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          if (event.status === 401) {
            this.authService.clearSession();
            this.router.navigate(["/"]);
          }
        }
        return event;
      }));
  }
}