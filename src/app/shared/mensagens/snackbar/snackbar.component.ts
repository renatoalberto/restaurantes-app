import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, state, style } from '@angular/animations';

// import { Observable } from 'rxjs/Observable';   // Aula 132 - mudou para rxjs no angula 6
// import 'rxjs/add/observable/timer'
// import 'rxjs/add/operator/do'
// import 'rxjs/add/operator/switchMap'
import { timer } from 'rxjs';          // Aula 132 - mudou para rxjs no angula 6
import { tap, switchMap }    from 'rxjs/operators' // Aula 132 - mudou para rxjs no angula 6 (do virou tap)

import { MensagemService } from '../mensagens.service';

// Aula 84 - Criando Sanckbar
// aula 85 - Aplicando animação
@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('apresentacao-snack', [
      state('invisivel', style({
        opacity: 0,
        bottom: '0%'
      })),
      state('visivel', style({
        opacity: 1,
        bottom: '10%'
      })),
      transition('invisivel => visivel', animate('500ms 0s ease-in')),
      transition('visivel => invisivel', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  mensagem    = 'Teste Snackbar'
  estadoSnack = 'invisivel'

  constructor(private mensagemService: MensagemService) { }

  ngOnInit() {

    /*versão 1 - Notificação do Snackbar - Aula 86 (timer para tornar invisível concorre com o visível)
    this.mensagemService.notificar.subscribe(mensagem => {
      this.menssagem   = mensagem
      this.estadoSnack = 'visivel'
      Observable.timer(3000).subscribe(timer => this.estadoSnack = 'invisivel') // aula 86 8:20
    })
    */

    // versão 2 - Notificação do Snackbar - Aula 87
    /* atualização para angular 6 - Aula 132
    this.mensagemService.notificar
      .do( mensagem => {
        this.mensagem   = mensagem
        this.estadoSnack = 'visivel'
      })
      .switchMap(menssagem => Observable.timer(3000))
      .subscribe(timer => this.estadoSnack = 'invisivel')
    */

    // versão 3 - atualização para angular 6 - Aula 132
    this.mensagemService.notificar
      .pipe(
        tap( mensagem => {
          this.mensagem   = mensagem
          this.estadoSnack = 'visivel'
        }),
        switchMap(menssagem => timer(3000))
      )
      .subscribe( () => this.estadoSnack = 'invisivel')
  }

}
