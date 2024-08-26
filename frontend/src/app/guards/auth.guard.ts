import { CanActivateFn,Router } from '@angular/router';
import { map } from 'rxjs';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router)
  const login=inject(LoginService)

  

  return login._login.pipe(
  map(user=>
  {
    if(user.token!=="" && user.token!=null && user.token!=undefined){
      return true
    }else{
      router.navigate(['/login'])
      return false
    }
  })
);

};
