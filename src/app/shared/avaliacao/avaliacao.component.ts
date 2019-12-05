import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-avaliacao',
  templateUrl: './avaliacao.component.html'
})
export class AvaliacaoComponent implements OnInit {

  @Output() avaliado = new EventEmitter<number>()

  avaliacoes: number[] = [1, 2, 3, 4, 5]
  avaliacao: number = 0
  avaliacaoTemporaria: number = 0

  constructor() { }

  ngOnInit() {
  }

  atribuirAvaliacao(a: number): void {
    this.avaliacao = a
    this.avaliacaoTemporaria = a
    this.avaliado.emit(a)
  }

  atribuirAvaliacaoTemporaria(a: number): void {
    this.avaliacaoTemporaria = this.avaliacao
    this.avaliacao           = a
  }

  zerarAvaliacaoTemporaria(): void {    
    this.avaliacao           = this.avaliacaoTemporaria
  }

}
