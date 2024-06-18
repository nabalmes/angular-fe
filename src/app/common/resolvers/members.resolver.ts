import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MembersService } from 'app/api';
import { catchError } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersResolver implements Resolve<boolean> {
  constructor(
    private membersService: MembersService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  return this.membersService.apiVversionMembersMembersByIdGet(environment.apiVersion, route.params.id).pipe(
    catchError(error => {
      this.router.navigate(['/error/not-found']);
      return of(null);
    })
  );
}
}