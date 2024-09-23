import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const user = this.authService.getUserInfo(); // Decodifica el token y obtiene la info del usuario

    if (!user) {
      // Si no hay usuario autenticado, redirige al login
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = route.data['requiredRole']; // Obtiene el rol necesario para esta ruta

    if (user.rol_tipo !== requiredRole) {
      // Si el rol no coincide, redirige al login o a la página de acceso denegado
      this.router.navigate(['/login']); 
      return false;
    }

    return true; // Si el rol coincide, permite el acceso a la ruta
  }
}
