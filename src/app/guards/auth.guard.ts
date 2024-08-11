import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const roles = authService.getRoles();
  if (route.data['role'] && roles.indexOf(route.data['role']) === -1) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
