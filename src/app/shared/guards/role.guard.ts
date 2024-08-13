import {CanActivateChildFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const roleGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const roles = authService.getRoles();
  if (childRoute.data['role'] && roles.indexOf(childRoute.data['role']) === -1) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
