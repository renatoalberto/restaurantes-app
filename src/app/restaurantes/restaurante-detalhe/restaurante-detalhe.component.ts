import { RestaurantesService } from './../restaurantes.service';
import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../restaurante/restaurante.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-restaurante-detalhe',
  templateUrl: './restaurante-detalhe.component.html'
})
export class RestauranteDetalheComponent implements OnInit {

  restaurante: Restaurante

  constructor(
    private rs: RestaurantesService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit() {
    let id: string = this.ar.snapshot.params['id']
    this.rs.consultaRestaurante(id)
      .subscribe( restaurante => this.restaurante = restaurante )
  }

}
