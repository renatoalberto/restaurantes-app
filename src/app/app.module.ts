import { ApplicationErrorHandler } from 'app/app.error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core';
// import { HttpModule } from '@angular/http'; //Aula 108 - refactory para Angula 4.3
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, PreloadAllModules } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, registerLocaleData } from '@angular/common' // Aula 95 - Estratégia de Hash #

import localePt from '@angular/common/locales/pt' // Aula 128 7:00 - refactory para Angula 6
registerLocaleData(localePt, 'pt') // Aula 128 7:00 - refactory para Angula 6

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { RestauranteComponent } from './restaurantes/restaurante/restaurante.component';
import { RestauranteDetalheComponent } from './restaurantes/restaurante-detalhe/restaurante-detalhe.component';
import { MenuComponent } from './restaurantes/restaurante-detalhe/menu/menu.component';
import { CarrinhoComprasComponent } from './restaurantes/restaurante-detalhe/carrinho-compras/carrinho-compras.component';
import { ItemMenuComponent } from './restaurantes/restaurante-detalhe/item-menu/item-menu.component';
import { AvaliacoesComponent } from './restaurantes/restaurante-detalhe/avaliacoes/avaliacoes.component';
import { CompraConcluidaComponent } from './compra-concluida/compra-concluida.component';

import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './seguranca/login/login.component';
import { DetalhesUsuarioComponent } from './detalhes-usuario/detalhes-usuario.component';
// import { CoreModule } from './core/core.module'; // Aula 80 - Obsoleto com forRoot() em SharedModule


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantesComponent,
    RestauranteComponent,
    RestauranteDetalheComponent,
    MenuComponent,
    CarrinhoComprasComponent,
    ItemMenuComponent,
    AvaliacoesComponent,
    CompraConcluidaComponent,
    NotFoundComponent,
    LoginComponent,
    DetalhesUsuarioComponent
  ],
  imports: [
    BrowserModule,
    // HttpModule, //Aula 108 - refactory para Angula 4.3
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),  // Aula 77 4:50    //"Aula 80 2:30 - forRoot() = importa SharedModule + Providers"
    // CoreModule,    // Aula 79 - aula importante - instância do serviço // Aula 80 - Ficou obsoleto com SharedModule.forRoot
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}) // Aula 81 - Estratégia de carregamento em background
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy },  // Aula 95 - Estratégia de Hash #
    // { provide: LOCALE_ID       , useValue: 'pt-BR'              },  // aula 54
    { provide: LOCALE_ID       , useValue: 'pt'                    },  // Aula 128 7:00 - refactory para Angula 6
    { provide: ErrorHandler    , useClass: ApplicationErrorHandler } // Aula 126
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


// Pergunta da Aula 81 - Dúvida! Se eu quiser utilizar "Preloading" apenas no módulo Order, como seria?​
/* Resposta Professor Tarso

Você deve implementar a interface PreloadingStrategy e chamar a função "load".
Como você pode associar dados com as rotas, é possível criar uma estratégia que verifique
a presença de um atributo qualquer, como por exemplo "preload"

[
 { path: 'moduleA', loadChildren: './moduleA.module', data: {preload: true}},
 { path: 'moduleB', loadChildren: './moduleB.module'}
]


Então aqueles que tem "data: preload true" serão carregados, ou seja,
se tiver o atributo "preload" chama-se a função load.

import { Observable } from 'rxjs/Observable'
import 'rxjs/observable/of'

export class CustomPreloadingStrategy implements PreloadingStrategy {
    preload(route: Route, load: Function): Observable<any> {
        //Se tiver o atributo, chama-se a função load
        return route.data && route.data.preload ? load() : Observable.of(null);
    }
}


E por fim, registrar no app.module:

@NgModule({
  bootstrap: [...],
  providers: [CustomPreloadingStrategy],
  imports: [RouterModule.forRoot(ROUTES, {preloadingStrategy: CustomPreloadingStrategy})]
})
class AppModule {}


Artigo para apeofundar - https://coryrylan.com/blog/custom-preloading-and-lazy-loading-strategies-with-angular

*/
