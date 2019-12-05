import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-compra-concluida',
  templateUrl: './compra-concluida.component.html'
})
export class CompraConcluidaComponent implements OnInit {

  avaliacaoRealizada: boolean = false

  constructor() { }

  ngOnInit() {
  }

  avaliado() {
    this.avaliacaoRealizada = true
  }

}
