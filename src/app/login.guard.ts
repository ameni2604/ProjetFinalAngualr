import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router:Router=inject(Router)
  let stateConnexion=localStorage.getItem('etat de connexion')
  if(stateConnexion==="connected")
    return true;
  else {
    router.navigate(['/admin'])
    return false
  }
};
