import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication-service.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router , private authservice:AuthenticationService) { }

    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
        if (this.authservice.isLoggedIn()) {
            return true ;
        }
      
         // If the user is not logged in, redirect to the login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
        /*this.router.navigate(['/admin/login']);
        return false ;*/
    }
   
    
    
}