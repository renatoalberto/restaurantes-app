import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions } from '@angular/http'; //Aula 108 - refactory para Angula 4.3
import {HttpClient, HttpHeaders } from '@angular/common/http'

import { Observable } from 'rxjs/Observable';

import { MEAT_API } from './../app.api';
import { CarrinhoComprasService } from 'app/restaurantes/restaurante-detalhe/carrinho-compras/carrinho-compras.service';
import { CarrinhoCompras } from 'app/restaurantes/restaurante-detalhe/carrinho-compras/carrinho-compras.model';
import { Compra } from './compra.model';

// import { LoginService } from 'app/seguranca/login/login.service'; // Aula 125 - Será tratado no Interceptor

@Injectable()
export class CompraService {

  constructor(
    private carrinhoCompras: CarrinhoComprasService,
    private http: HttpClient
    // private loginService: LoginService // Aula 125 - Será tratado no Interceptor
  ) {}

  itensCarrinho(): CarrinhoCompras[] {
    return this.carrinhoCompras.carrinhoCompras
  }

  incrementaQuantidadeItens(item: CarrinhoCompras): void {
    this.carrinhoCompras.incrementItemCarrinho(item)
  }

  decrementaQuantidadeItens(item: CarrinhoCompras): void {
    this.carrinhoCompras.decrementaItemCarrinho(item)
  }

  removeItemCarrinho(item: CarrinhoCompras): void {
    this.carrinhoCompras.removeItemCarrinho(item)
  }

  valorTotalCompra(): number {
    return this.carrinhoCompras.totalCarrinho()
  }

  finalizaCompra(compra: Compra): Observable<string> { // aula 68
    /*Aula 108 - refactory para Angula 4.3
    let headers = new Headers()

    headers.append('Content-Type', 'application/json')

    return this.http.post(`${MEAT_API}/orders`, JSON.stringify(compra), new RequestOptions({headers: headers}))
                    .map( response => response.json() )
                    .map( order => order.id )  //aula 69 2:10
    */

    /* Aula 125 10:30 - Tratando header com Interceptor
    let headers = new HttpHeaders()  // Aula 119 - 6:15 - tratamento do headers

    if (this.loginService.usuarioEstaLogado()) {
      headers = headers.set('Authorization', `Bearer ${this.loginService.usuario.accessToken}`)
    }

    return this.http.post<Compra>(`${MEAT_API}/orders`, compra, {headers: headers})
      .map( order => order.id )  // aula 69 2:10
    */

    // Aula 125 10:30 - Tratando header com Interceptor
    return this.http.post<Compra>(`${MEAT_API}/orders`, compra)
      .map( order => order.id )  // aula 69 2:10
  }

  limparCompra(): void {
    this.carrinhoCompras.limparCarrinho()
  }

}
