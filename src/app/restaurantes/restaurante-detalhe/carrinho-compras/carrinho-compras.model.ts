import { ItemMenu } from './../item-menu/item-menu.model';

export class CarrinhoCompras { // aula 52 - nesse caso será uma class pois terá função

  constructor(
    public itemMenu: ItemMenu,
    public quantidade: number = 1
  ) { }

  valorTotal(): number {
    return this.itemMenu.price * this.quantidade
  }
  
}