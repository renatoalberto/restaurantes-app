import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LoginService } from './login.service';
import { MensagemService } from 'app/shared/mensagens/mensagens.service';


// Aula 116 - Criando componente Login
@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navegarPara: string

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private mensagem: MensagemService,
    private activateRouter: ActivatedRoute,    // Aula 120 12:50
    private router: Router
  ) { }

  ngOnInit() {

    // Aula 117 - Implementando Retive Form no formulário de login
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      password: this.formBuilder.control('', [Validators.required])
    })

    // Aula 120 13:10 - pegar rota "para" com activateRouter
    this.navegarPara = this.activateRouter.snapshot.params['to'] || btoa('/') // Aula 121 8:20 - Decodificar path "btoa()"
  }

  // Aula 117 5:00
  login(): void {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        usuario  => {  // Aula 119
          this.mensagem.notifica(`Bem vindo, ${usuario.nome}!`)
        },
        response => {  // Aula 119 - response do tipo HttpErrorResponse
          this.mensagem.notifica( response.error.mensagem )
        },
        ()       => { // Aula 120 14:15 - Callback executa quando Observable terminar
          this.router.navigate([ atob(this.navegarPara)]) // Aula 121 8:20 - Decodificar path
        }
      )
  }

}
