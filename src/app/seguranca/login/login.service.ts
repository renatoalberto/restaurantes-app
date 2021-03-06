import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';

// import { Observable } from 'rxjs/Observable'; // Aula 132 - mudou para rxjs no angula 6
// import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/filter'
import { Observable  } from 'rxjs';              // Aula 132 - mudou para rxjs no angula 6
import { tap, filter } from 'rxjs/operators'

import { MEAT_API } from 'app/app.api';
import { Usuario } from './usuario.model';


// Aula 118 - Criando o serveiço de login
@Injectable()
export class LoginService {

  usuario: Usuario
  ultimaUrl: string

  constructor(private http: HttpClient, private router: Router) {
    // Aula 122 10:10 - Capturar url
    /* Aula 132 - mudou para rxjs no angula 6
    this.router.events
      .filter(e => e instanceof NavigationEnd)
      .subscribe( (e: NavigationEnd) => this.ultimaUrl = e.url )
    */

    // Aula 132 - mudou para rxjs no angula 6
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe( (e: NavigationEnd) => this.ultimaUrl = e.url )
  }

  login(email: string, password: string): Observable<Usuario> {
    /* Aula 132 - mudou para rxjs no angula 6
    return this.http.post<Usuario>(`${MEAT_API}/login`, {email: email, senha: password})
      .do( usuario => this.usuario = usuario ) // Aula 118 8:10
    */

    // Aula 132 - refatorando rxjs para angula 6
    return this.http.post<Usuario>(`${MEAT_API}/login`, {email: email, senha: password})
      .pipe(tap( usuario => this.usuario = usuario )) // Aula 118 8:10
  }

  usuarioEstaLogado(): boolean {
    return this.usuario !== undefined
  }

  // Aula 120 - 10:25
  solicitarLog(rota: string = this.ultimaUrl): void {  // Caso ninguém envie a rota, será usado a url em que estamos
    this.router.navigate(['/login', btoa(rota)]) // Aula 121 8:20, codificar rota no path do navegador
  }

  // Aula 122
  solicitarLogout(): void {
    this.usuario = undefined
    this.router.navigate(['/'])
  }

}
