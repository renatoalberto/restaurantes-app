import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

// Aula 132 - refatorando rxjs para angula 6
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/switchMap'
// import 'rxjs/add/operator/debounceTime'
// import 'rxjs/add/operator/distinctUntilChanged'
// import 'rxjs/add/operator/catch'
// import 'rxjs/add/observable/from'
import { Observable, from } from 'rxjs';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

import { RestaurantesService } from './restaurantes.service';

import { Restaurante } from './restaurante/restaurante.model';


// Animação da barra de pesquisa de restaurantes - Aula 103
@Component({
  selector: 'mt-restaurantes',
  templateUrl: './restaurantes.component.html',
  animations: [
    trigger('togglePesquisa', [
      state('invisivel', style({
        opacity: 0,
        'max-height': '0px'
      })),
      state('visivel'  , style({
        opacity: 1,
        'max-height': '70px',
        'margin-top': '20px'
      })),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ])
  ]
})
export class RestaurantesComponent implements OnInit {

  estadoBarraPesquisa = 'invisivel'

  restaurantes: Restaurante[] = []

  // Aula 104 - Inclusão de Reactive Forms no campo de pesquisa
  pesquisaForm: FormGroup
  pesquisaControl: FormControl

  constructor(
      private restaurantesService: RestaurantesService,
      private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.pesquisaControl = this.formBuilder.control('')

    this.pesquisaForm = this.formBuilder.group({
      pesquisaControl: this.pesquisaControl
    })

    // Aula 104 3:25
    /* Aula 132 - refatorando rxjs para angula 6
    this.pesquisaControl.valueChanges       // quando valor mudar
      .debounceTime(500)                    // Aula 105 2:15 - deixa emitir quando a diferença entre dois eventos maior que tempo informado
      .distinctUntilChanged()               // Aula 105 4:45 - não emite caso termo pesquisado seja igual ao anteior
      .switchMap( termoPesquisado =>        // troca termo pesquisado pela pesquisa no serveice
         this.restaurantesService
          .consultaRestaurantes(termoPesquisado)
          .catch( error => Observable.from([])))  // Aula 106 4:10 - Evitar que o valueChanges quebre caso consulta retorne erro
      .subscribe( restaurantes    => this.restaurantes = restaurantes ) // incrição na pesquisa no service - atribuir lista de restaurantes
    */

    // Aula 132 - refatorando rxjs para angula 6
    this.pesquisaControl.valueChanges       // quando valor mudar
      .pipe(
        debounceTime(500),                // Aula 105 2:15 - deixa emitir quando a diferença entre dois eventos maior que tempo informado
        distinctUntilChanged(),            // Aula 105 4:45 - não emite caso termo pesquisado seja igual ao anteior
        switchMap( termoPesquisado =>     // troca termo pesquisado pela pesquisa no serveice
            this.restaurantesService
            .consultaRestaurantes(termoPesquisado)
            .pipe(catchError( error => from([])))) // Aula 106 4:10 - Evitar que o valueChanges quebre caso consulta retorne erro
      )
      .subscribe( restaurantes    => this.restaurantes = restaurantes ) // incrição na pesquisa no service - atribuir lista de restaurantes

    this.restaurantesService.consultaRestaurantes()
      .subscribe( restaurantes    => this.restaurantes = restaurantes )
  }

  togglePesquisa(): void {
    this.estadoBarraPesquisa = this.estadoBarraPesquisa === 'invisivel' ? 'visivel' : 'invisivel'
  }

}
