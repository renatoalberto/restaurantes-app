import { Injectable } from '@angular/core';

import { CarrinhoCompras } from './carrinho-compras.model';
import { ItemMenu } from '../item-menu/item-menu.model';
import { MensagemService } from 'app/shared/mensagens/mensagens.service';

@Injectable()
export class CarrinhoComprasService {

  constructor(private menssagemService: MensagemService) {}

  carrinhoCompras: CarrinhoCompras[] = []

  limparCarrinho(): void {
    this.carrinhoCompras = []
  }

  totalCarrinho(): number { // aula 52 10:30
    return this.carrinhoCompras
              .map( itemCarrinhoCompras => itemCarrinhoCompras.valorTotal() ) 
              .reduce( (prev, valor) => prev + valor, 0 )
  }

  adicionaItemCarrinho(item: ItemMenu): void {
    let pesquisaItemMenu: CarrinhoCompras = this.carrinhoCompras.find( itemCarrinhoCompras => itemCarrinhoCompras.itemMenu.id == item.id ) // aula 52 7:20

    if (pesquisaItemMenu) {
      this.incrementItemCarrinho(pesquisaItemMenu)
    } else {
      this.carrinhoCompras.push(new CarrinhoCompras(item))
      this.menssagemService.notifica(`Você adicionou o item ${item.name}`)
    }
  }

  incrementItemCarrinho(item: CarrinhoCompras): void {
    item.quantidade++
  }

  decrementaItemCarrinho(item: CarrinhoCompras): void {
    item.quantidade--

    if (item.quantidade === 0) {
      this.removeItemCarrinho(item)
    }
  }

  removeItemCarrinho(item: CarrinhoCompras): void {
    let indexItem = this.carrinhoCompras.indexOf(item) // aula 52 09:00
    this.carrinhoCompras.splice(indexItem, 1)
    this.menssagemService.notifica(`Você removeu o item ${item.itemMenu.name}`)
  }
}