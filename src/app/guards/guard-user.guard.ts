import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from '../services/auth-user.service';
@Injectable({
  providedIn: 'root'
})
export class GuardUserGuard implements CanActivateChild {
  constructor(private aus:AuthUserService,private router:Router){

  }

  canActivateChild(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return new Promise((resolve,reject)=>{
      if(this.aus.isUserLoggedIn()==true){
      resolve(true)
    }
    else{
      resolve(false)
      this.router.navigate(['/user/login'])

    }
    })


  }
}
