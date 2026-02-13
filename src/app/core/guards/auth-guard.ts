import { CanActivateFn, Router } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { HttpAuth } from '../services/http-auth';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const httpAuth = inject(HttpAuth)
  const router = inject(Router)

  return httpAuth.checkAuthStatus().pipe(
    tap((isAuthenticated)=>{
      if(!isAuthenticated){
        router.navigate(["/home"])
      }
    })
  );
};
