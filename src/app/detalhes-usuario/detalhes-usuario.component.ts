import { Component, OnInit } from '@angular/core';

import { LoginService } from 'app/seguranca/login/login.service';
import { Usuario } from 'app/seguranca/login/usuario.model';

// Aula 122 - Criação do componente para efetivar login
@Component({
  selector: 'mt-detalhes-usuario',
  templateUrl: './detalhes-usuario.component.html',
  styleUrls: ['./detalhes-usuario.component.css']
})
export class DetalhesUsuarioComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  recuperaUsuario(): Usuario {
    return this.loginService.usuario
  }

  estaLogado(): boolean {
    return this.loginService.usuarioEstaLogado()
  }

  realizarLogin(): void {
    this.loginService.solicitarLog()
  }

  realizarLogout(): void {
    this.loginService.solicitarLogout()
  }

}
