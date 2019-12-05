import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

// Aula 120 - Protegendo o módulo de compra com "CanLoad"
@Injectable()
export class RegistradoGuard implements CanLoad, CanActivate {

  constructor(private loginService: LoginService) {}

  // Aula 120
  canLoad(route: Route): boolean {
    return this.VerificaAutenticacao(route.path)
  }

  // Aula 121
  canActivate(activateRoute: ActivatedRouteSnapshot, routeState: RouterStateSnapshot): boolean {
    return this.VerificaAutenticacao(activateRoute.routeConfig.path)
  }

  VerificaAutenticacao(path: string): boolean {
    const logado: boolean = this.loginService.usuarioEstaLogado()

    if (!logado) {
      this.loginService.solicitarLog(`/${path}`)
    }

    return logado
  }
}
