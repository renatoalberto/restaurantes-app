import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Restaurante } from './restaurante.model';

// Aula 88 - incluir animação
@Component({
  selector: 'mt-restaurante',
  templateUrl: './restaurante.component.html',
  animations: [
    trigger('apareceuRestaurante', [
      state('pronto', style({opacity: 1})),
      transition('void => pronto', [
        style({opacity: 0, transform: 'translate(-5px, -5px)'}),
        animate('300ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestauranteComponent implements OnInit {

  estadoRestaurante: string = 'pronto'

  @Input() restaurante: Restaurante

  constructor() { }

  ngOnInit() {
  }

}
