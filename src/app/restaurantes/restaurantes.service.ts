import { Injectable } from '@angular/core';
// import { Http } from '@angular/http'; //Aula 108 - refactory para Angula 4.3
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'   // aula 43
import 'rxjs/add/operator/catch' // aula 44

import { MEAT_API } from './../app.api';

import { Restaurante } from './restaurante/restaurante.model';
import { ItemMenu } from './restaurante-detalhe/item-menu/item-menu.model';
// import { ErrorHandler } from 'app/app.error-handler'; // Aula 108 - refactory para Angular 4.3

@Injectable()
export class RestaurantesService {

  constructor(private http: HttpClient) {}

  // implementação de pesquisa - Aula 104 5:00
  consultaRestaurantes(pesquisa?: string): Observable<Restaurante[]> {
    /*Aula 108 - refactory para Angula 4.3
    //aula 43
    return this.http.get(`${MEAT_API}/restaurants`, {params: {q: pesquisa}})
              .map( response => response.json() )
              .catch( error => ErrorHandler.handleErro(error) ) // aula 44
    */

    let params: HttpParams = undefined

    if (pesquisa) {
      params = new HttpParams().set('q', pesquisa) // também é possível utilizar o método append em vez de set - Aula 108 9:15
    }

    return this.http.get<Restaurante[]>(`${MEAT_API}/restaurants`, {params: params})

  }

  consultaRestaurante(id: string): Observable<Restaurante> { // aula 47
    return this.http.get<Restaurante>(`${MEAT_API}/restaurants/${id}`)
              // .map( response => response.json() ) // Aula 108 - refactory para Angula 4.3 
              // .catch( ErrorHandler.handleErro ) // outra forma //Aula 108 - refactory para Angula 4.3

  }

  consultaAvaliacoes(id: string): Observable<any> { // aula 50
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
              // .map( response => response.json() ) // Aula 108 - refactory para Angula 4.3
              // .catch( ErrorHandler.handleErro )   // Aula 108 - refactory para Angula 4.3
  }

  consultaMenuRestaurante(id: string): Observable<ItemMenu> { // aula 51
    return this.http.get<ItemMenu>(`${MEAT_API}/restaurants/${id}/menu`)
              // .map( response => response.json() ) // Aula 108 - refactory para Angula 4.3
              // .catch( ErrorHandler.handleErro )   // Aula 108 - refactory para Angula 4.3
  }
}