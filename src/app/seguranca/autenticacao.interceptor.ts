import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import { LoginService } from './login/login.service';

// Aula 125 - Utilizando Http Interceptors
@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  // Aula 125 8:30 - Explicação do Injector
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService = this.injector.get(LoginService)

    if (loginService.usuarioEstaLogado()) {
      // request é imutável, é preciso clona para adicionar o header
      const requestAutenticado = request.clone({setHeaders: {'Authorization': `Bearer ${loginService.usuario.accessToken}`}})
      return next.handle(requestAutenticado)
    } else {
      return next.handle(request)
    }
  }
}
