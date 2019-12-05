import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-custo-entrega',
  templateUrl: './custo-entrega.component.html'
})
export class CustoEntregaComponent implements OnInit {

  @Input() entrega: number
  @Input() valorItens: number

  constructor() { }

  ngOnInit() {
  }

  valorTotalCompra(): number {
    return this.entrega + this.valorItens
  }

}
