import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (token) {
    const expectedRole = route.data['role'] as string;

    if (role === expectedRole) {
      return true;
    } else {
      // Redirect to unauthorized page or landing page
      router.navigate(['/']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
};