import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {

  constructor(private _router:Router){}
  canActivate(){
    if(localStorage.getItem('login_id')){
        return true;
    }
    else{
      this._router.navigate(['/login'])
      return false;
    }
  }
}
