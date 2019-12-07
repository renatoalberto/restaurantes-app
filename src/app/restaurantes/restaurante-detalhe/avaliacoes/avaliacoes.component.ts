import { Component, OnInit } from '@angular/core';

// Aula 132 - refatorando rxjs para angula 6
// import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs';

import { RestaurantesService } from 'app/restaurantes/restaurantes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-avaliacoes',
  templateUrl: './avaliacoes.component.html'
})
export class AvaliacoesComponent implements OnInit {

  avaliacoes: Observable<any>

  constructor(
    private rs: RestaurantesService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit() {
    let id: string = this.ar.parent.snapshot.params['id'] // aula 50 3:00

    this.avaliacoes = this.rs.consultaAvaliacoes(id)
  }

}
