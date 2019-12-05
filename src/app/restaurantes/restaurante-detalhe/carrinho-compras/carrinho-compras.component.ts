import { ItemMenu } from './../item-menu/item-menu.model';
import { CarrinhoComprasService } from './carrinho-compras.service';
import { Component, OnInit } from '@angular/core';
import { CarrinhoCompras } from './carrinho-compras.model';
import { trigger, state, style, transition, keyframes, animate } from '@angular/animations';

// Aula 91 - animação
@Component({
  selector: 'mt-carrinho-compras',
  templateUrl: './carrinho-compras.component.html',
  preserveWhitespaces: true,  // Aula 131 - para compilador angula 5/6 mantendo espaços em branco, mantendo separado os botões
  animations: [
    trigger('selecionouItem', [
      state('selecionado', style({opacity: 1})),
      transition('void => selecionado', 
        animate('600ms 0s ease-in',
          keyframes([
            style({opacity: 0  , transform: 'translateX(-30px)', offset: 0.0}),
            style({opacity: 0.7, transform: 'translateX(10px)' , offset: 0.4}),
            style({opacity: 0.8, transform: 'translateX(-10px)', offset: 0.7}),
            style({opacity: 0.9, transform: 'translateX(10px)' , offset: 0.9}),
            style({opacity: 1  , transform: 'translateX(0px)'  , offset: 1.0}),
      ]))),
      transition('selecionado => void', 
        animate('400ms 0s ease-out',
          keyframes([
            style({opacity: 1  , transform: 'translateX(0px)'  , offset: 0.0}),
            style({opacity: 0.6, transform: 'translateX(-10px)' , offset: 0.4}),
            style({opacity: 0  , transform: 'translateX(30px)'  , offset: 1.0}),
      ])))
    ])
  ]
})
export class CarrinhoComprasComponent implements OnInit {

  estadoItemSelecionado = 'selecionado'
  contador = 0

  constructor(private carrinhoComprasService: CarrinhoComprasService) { }

  ngOnInit() {
  }

  recuperaItensCarrinhoCompras(): CarrinhoCompras[] { //aula 52 11:20
    return this.carrinhoComprasService.carrinhoCompras //gerou excesso de chamadas desnecessárias
  }

  recuperaValorTotalCompra(): number { // aula 52 11:30
    return this.carrinhoComprasService.totalCarrinho()
  }

  limparCarrinhoCompras(): void { // aula 53 00:20
    this.carrinhoComprasService.limparCarrinho()
  }

  removerItemCarrinho(itemCarrinhoCompras: CarrinhoCompras): void {
    this.carrinhoComprasService.removeItemCarrinho(itemCarrinhoCompras)
  }

  adicionaItemCarrinho(itemCarrinhoCompras: ItemMenu): void {
    this.carrinhoComprasService.adicionaItemCarrinho(itemCarrinhoCompras)
  }

}
