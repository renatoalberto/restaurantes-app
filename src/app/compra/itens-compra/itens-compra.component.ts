import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CarrinhoCompras } from 'app/restaurantes/restaurante-detalhe/carrinho-compras/carrinho-compras.model';

@Component({
  selector: 'mt-itens-compra',
  templateUrl: './itens-compra.component.html'
})
export class ItensCompraComponent implements OnInit { // aula 65 e 66

  @Input() itensCompra: CarrinhoCompras[]

  @Output() incrementaQuantidade = new EventEmitter<CarrinhoCompras>()
  @Output() decrementaQuantidade = new EventEmitter<CarrinhoCompras>()
  @Output() removeItem           = new EventEmitter<CarrinhoCompras>()

  constructor() { }

  ngOnInit() {
  }

  emitIncrementaQuantidade(itemCarrinho: CarrinhoCompras): void {
    this.incrementaQuantidade.emit(itemCarrinho)
  }

  emitDecrementaQuantidade(itemCarrinho: CarrinhoCompras): void {
    this.decrementaQuantidade.emit(itemCarrinho)
  }

  emitRemoveItem(itemCarrinho: CarrinhoCompras): void {
    this.removeItem.emit(itemCarrinho)
  }

}
