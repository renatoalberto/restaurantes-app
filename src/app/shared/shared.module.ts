import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarrinhoComprasService } from 'app/restaurantes/restaurante-detalhe/carrinho-compras/carrinho-compras.service';
import { RestaurantesService } from 'app/restaurantes/restaurantes.service';
import { CompraService } from 'app/compra/compra.service';

import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { AvaliacaoComponent } from './avaliacao/avaliacao.component';
import { SnackbarComponent } from './mensagens/snackbar/snackbar.component';
import { MensagemService } from './mensagens/mensagens.service';
import { LoginService } from 'app/seguranca/login/login.service';
import { RegistradoGuard } from 'app/seguranca/registrado.guard';
import { SairCompraGuard } from 'app/compra/sair-compra.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacaoInterceptor } from 'app/seguranca/autenticacao.interceptor';

// Aula 77 - Módulo compartilhado

@NgModule({
  declarations: [
    InputComponent,
    RadioComponent,
    AvaliacaoComponent,
    SnackbarComponent
  ],
  imports: [
    CommonModule,   // aula 77 2:55 - possui as diretivas básicas (ngIf, ngFor, ... )
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    RadioComponent,
    AvaliacaoComponent,
    SnackbarComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {

  static  forRoot(): ModuleWithProviders { // ModuleWithProviders - Aula 80

    return {
      ngModule: SharedModule,     // Aula 80 2:10
      providers: [                // Declarando os seviço no providers de SharedModule
        CarrinhoComprasService,   // torna meu CoreModule obsoleto
        RestaurantesService,
        CompraService,
        MensagemService,
        LoginService,             // Aula 117 6:00
        RegistradoGuard,          // Aula 120 5:10
        SairCompraGuard,          // Aula 123 8:10
        { provide: HTTP_INTERCEPTORS, useClass: AutenticacaoInterceptor, multi: true } // Aula 125 5:35
      ]
    }
  }

}
