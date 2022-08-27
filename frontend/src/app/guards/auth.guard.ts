import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable,tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router){}

  /**
   * Si el usuario no ha iniciado sesión, rediríjalo a la página de inicio de sesión
   * @param {ActivatedRouteSnapshot} route - ActivatedRouteSnapshot: la ruta actual
   * @param {RouterStateSnapshot} state - Instantánea del estado del enrutador
   * @returns Observable<booleano>
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.validarToken().pipe(
      tap((valid) => {
        if(!valid){
          this.router.navigateByUrl('auth');
        }
      })
    )
  }
/* Un método que se llama antes de que se cargue el módulo. */
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
      return this.authService.validarToken().pipe(
        tap((valid) => {
          if(!valid){
            this.router.navigateByUrl('auth');
          }
        })
      )
  }
}
