import { NgModule } from "@angular/core";

import { CarrinhoComprasService } from "../restaurantes/restaurante-detalhe/carrinho-compras/carrinho-compras.service";
import { RestaurantesService } from "../restaurantes/restaurantes.service";
import { CompraService } from "../compra/compra.service";

// aula 79 - A importancia do core module é manter uma instância na aplicação mesmo utilizando o Lazi Load
// aula 79 1:50 - relação providers x module - contexto global sempre que carregado junto com módulo raiz
@NgModule({
  providers: [
    CarrinhoComprasService,
    RestaurantesService,
    CompraService
  ]
})
export class CoreModule {

}