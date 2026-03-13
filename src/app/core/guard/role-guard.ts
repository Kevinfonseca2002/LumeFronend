import { CanActivateFn, Router } from '@angular/router';
import { HttpAuth } from '../services/http-auth';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const roleGuard: CanActivateFn = async (route, state) => {
  const httpAuth = inject(HttpAuth);
  const router = inject(Router);
  const allowedRoles = route.data['roles'];
  const user = await firstValueFrom(httpAuth.currentUser$);
  const role = user?.role;

  //Verificamos si no hay usuarios
  // if (!httpAuth.currentUser$) {
  //   router.navigate(['/login']);
  //   return false;
  // }

  //Verificamos si la ruta no tiene definidos lo roles

  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  if (role && allowedRoles.includes(role)) {
    // if (user?.role == 'store') {
    //   router.navigate(['/admin/dashboard']);
    // } else if (user?.role == 'user') {
    //   router.navigate(['/feed/main']);
    // } else {
    //   httpAuth.clearLocalStorageData();
    //   router.navigate(['home']);
    //   return false;
    // }
    return true;
  }

  router.navigate(['home']);
  return false;
};
